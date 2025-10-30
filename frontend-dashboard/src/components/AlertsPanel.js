export default function AlertsPanel({ alerts }) {
  return (
    <div className="glass-card p-4 rounded-2xl h-full overflow-y-auto">
      <h2 className="font-semibold mb-2">⚠️ Alerts</h2>
      {alerts.map((item, i) => (
        <div key={i} className={`p-2 mb-2 rounded-lg ${item.score > 0.3 ? "bg-red-300" : "bg-yellow-100"} text-black`}>
  Anomaly (Severity: {item.score.toFixed(2)}) — {new Date(item.timestamp).toLocaleTimeString()}
</div>

      ))}
    </div>
  );
}
