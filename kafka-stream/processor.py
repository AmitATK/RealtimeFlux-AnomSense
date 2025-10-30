from kafka import KafkaConsumer, KafkaProducer
import json
import numpy as np
from anomaly_detector import AnomalyDetector

# Kafka setup
consumer = KafkaConsumer(
    'system_metrics',
    bootstrap_servers='localhost:9092',
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

detector = AnomalyDetector()

data_buffer = []

print("Streaming & Anomaly Detection Started...")

for message in consumer:
    metrics = message.value
    values = np.array([metrics["cpu"], metrics["memory"], metrics["disk"]])

    data_buffer.append(values)

    # Train model once i have enough data
    if len(data_buffer) > 30:
        detector.fit(np.array(data_buffer))

        is_anomaly = detector.predict(values)
        score = detector.anomaly_score(values)   # <-- Added line

        # Include both anomaly label + score
        output = {
            **metrics,
            "anomaly": bool(is_anomaly),
            "score": float(score)
        }

        producer.send("processed_metrics", output)
        print("Processed:", output)
