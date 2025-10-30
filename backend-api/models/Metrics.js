const mongoose = require("mongoose");

const MetricsSchema = new mongoose.Schema({
  cpu: Number,
  memory: Number,
  disk: Number,
  network_sent: Number,
  network_recv: Number,
  anomaly: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Metrics", MetricsSchema);
