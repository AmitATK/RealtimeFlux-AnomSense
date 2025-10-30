import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function HistoryChart({ data }) {
  return (
    <div className="glass-card p-5 rounded-2xl mt-6">
      <h2 className="font-semibold mb-3">History Trend</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="#4D96FF" strokeWidth={2} />
          <Line type="monotone" dataKey="memory" stroke="#FF6B6B" strokeWidth={2} />
          <Line type="monotone" dataKey="disk" stroke="#6BCB77" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
