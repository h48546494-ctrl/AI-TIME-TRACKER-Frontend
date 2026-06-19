import { formatDate, isPast } from "../utils/format";

export default function ServiceBadge({ label, time, color }) {
  const active = !time;
  const past   = isPast(time);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 140 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: active ? `${color}22` : "#1C1F2E",
        border: `1px solid ${active ? color : "#2D3148"}`,
        borderRadius: 20, padding: "4px 12px", width: "fit-content",
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%",
          background: active ? color : past ? "#EF4444" : "#6B7280",
          boxShadow: active ? `0 0 6px ${color}` : "none",
          display: "inline-block",
          animation: active ? "pulse 2s infinite" : "none",
        }} />
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
          color: active ? color : "#9CA3AF",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {label}
        </span>
        <span style={{
          fontSize: 10, fontFamily: "Inter, sans-serif", fontWeight: 500,
          color: active ? color : past ? "#EF4444" : "#6B7280",
        }}>
          {active ? "active" : past ? "expired" : "scheduled"}
        </span>
      </div>
      {!active && (
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: past ? "#EF444488" : "#6B7280", paddingLeft: 6,
        }}>
          {formatDate(time)}
        </span>
      )}
    </div>
  );
}