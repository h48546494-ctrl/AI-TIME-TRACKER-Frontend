import { formatDate, isPast } from "../utils/format";

export default function ServiceBadge({ label, time, dotColor }) {
  const active = !time;
  const past = isPast(time);

  const statusColor = active ? "var(--success)" : past ? "var(--danger)" : "var(--text-muted)";
  const statusBg = active ? "var(--success-bg)" : past ? "var(--danger-bg)" : "var(--bg)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 132 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: statusBg, border: `1px solid ${active ? "var(--success)" : past ? "var(--danger)" : "var(--border)"}`,
        borderRadius: 6, padding: "3px 9px", width: "fit-content",
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: dotColor, display: "inline-block",
        }} />
        <span style={{
          fontSize: 10.5, fontWeight: 600, color: "var(--text)",
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {label}
        </span>
        <span style={{ fontSize: 10, fontWeight: 600, color: statusColor }}>
          {active ? "active" : past ? "expired" : "scheduled"}
        </span>
      </div>
      {!active && (
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10.5,
          color: "var(--text-faint)", paddingLeft: 2,
        }}>
          {formatDate(time)}
        </span>
      )}
    </div>
  );
}