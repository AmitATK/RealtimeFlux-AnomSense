import { useEffect, useState } from "react";
import io from "socket.io-client";
import MetricsChart from "./components/LineChart";
import AlertsPanel from "./components/AlertsPanel";

import HistoryChart from "./components/HistoryChart";


const socket = io("http://localhost:5001");

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("metrics_update", (data) => {
      setMetrics((prev) => [...prev.slice(-50), data]);

      if (data.anomaly === true) {
        setAlerts((prev) => [...prev, data]);
      }
    });
  }, []);

useEffect(() => {
  fetch("http://localhost:5001/api/metrics/history?limit=200")
    .then((res) => res.json())
    .then((data) => setHistory(data));
}, []);
  return (
    <div className="p-8 grid grid-cols-4 gap-6">
      <div className="col-span-3 space-y-6">
        <MetricsChart data={metrics} dataKey="cpu" color="#ff6b6b" />
        <MetricsChart data={metrics} dataKey="memory" color="#4D96FF" />
        <MetricsChart data={metrics} dataKey="disk" color="#6BCB77" />
        <HistoryChart data={history} />
      </div>

      <div className="col-span-1">
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
}
