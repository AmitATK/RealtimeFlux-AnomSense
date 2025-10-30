require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const kafka = require("kafka-node");
const connectDB = require("./config/db");
const Metrics = require("./models/Metrics");
const metricsRoute = require("./routes/metrics");
const sendEmail = require("./utils/emailAlert");

// APP INITIALIZATION BE CAREFUL WITH THIS ORDER
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/metrics", metricsRoute);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// DATABASE CONNECTION I USED MONGODB ATLAS
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully enjoy");
  } catch (err) {
    console.error(" MongoDB connection failed khatam :", err.message);
    process.exit(1);
  }
})();

//  KAFKA CONNECTION  CHECK THE PORT FOR THIS ITS VERY COMPLICATED SO BE CAREFUL
function connectKafkaWithRetry() {
  try {
    const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
    const consumer = new kafka.Consumer(
      client,
      [{ topic: "processed_metrics" }],
      { autoCommit: true }
    );

    console.log("Connected to Kafka broker: localhost:9092");

    consumer.on("message", async (msg) => {
      try {
        const data = JSON.parse(msg.value);
        console.log("📩 New metric received from Kafka:", data);

        // Save metric to MongoDB
        await Metrics.create(data);

        // Emit to frontend dashboard
        io.emit("metrics_update", data);

        // EMAIL ALERTS FOR ANOMALIES AND PREDICTIONS
        if (data.anomaly === true) {
          await sendEmail(
            "System Anomaly Detected",
            `High system anomaly detected:\nCPU: ${data.cpu}%\nMemory: ${data.memory}%\nDisk: ${data.disk}%`
          );
          console.log("Anomaly email alert sent");
        }

        if (data.predicted_cpu && data.predicted_cpu > 85) {
          await sendEmail(
            "Critical CPU Spike Predicted",
            `System likely to overload soon. Predicted CPU: ${data.predicted_cpu.toFixed(
              1
            )}%`
          );
          console.log("Predicted CPU alert sent");
        }
      } catch (err) {
        console.error(" Error processing Kafka message:", err.message);
      }
    });

    consumer.on("error", (err) => {
      console.error("⚠️ Kafka consumer error:", err.message);
    });
  } catch (error) {
    console.error("Kafka connection failed:", error.message);
    console.log("🔁 Retrying Kafka connection in 5 seconds...");
    setTimeout(connectKafkaWithRetry, 5001);
  }
}

connectKafkaWithRetry();

//START THE SERVER 5000 WAS ALREADY TAKEN FOR ME SO USING 5001
const PORT = process.env.PORT || 5001;
server.listen(PORT, () =>
  console.log(`Backend API running on http://localhost:${PORT}`)
);
