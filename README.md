# Real-Time System Monitoring with Anomaly Detection

This project is a complete, end-to-end system that tracks real-time system metrics, detects anomalies, and visualizes everything on a live dashboard.  
It’s built to simulate what production-grade monitoring tools like Grafana or Datadog do — but from scratch, using modern open-source technologies.

---

## ⚙️ What This Project Does

- Collects CPU, memory, disk, and network metrics from agents
- Streams those metrics in real-time using Kafka
- Stores data in both MongoDB (Node.js backend) and PostgreSQL
- Caches live updates with Redis for faster reads
- Displays interactive charts and system health status on a React dashboard
- Detects unusual spikes using a simple statistical anomaly check

The goal is to show **real-time data flow**, **distributed architecture**, and **scalable backend design** — all in one project.

---

## 🧩 Architecture at a Glance



---

[ React Dashboard (Live) ]

## 🧱 Tech Stack

**Frontend:** React, Tailwind CSS, Recharts, Socket.IO  
**Backend 1:** Node.js (Express), MongoDB, Redis, Kafka  
**Messaging:** Apache Kafka  
**Cache:** Redis  
**Anomaly Logic:** Simple moving average threshold (CPU spikes)

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/<yourusername>/real-time-system-monitoring.git
cd real-time-system-monitoring


Start Kafka & Redis
# Kafka
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties

# Redis
redis-server


#Run Node.js Backend

cd backend-node
npm install
npm run dev


#Run React Dashboard
cd dashboard-frontend
npm install
npm run dev
