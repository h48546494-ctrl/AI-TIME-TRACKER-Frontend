export default function Header({ count, onAdd, onCron, cronLoading }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between", marginBottom: 32,
    }}>
      <div>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 700,
          color: "#E8EAF0", letterSpacing: "-0.02em",
        }}>
          AI Schedule Tracker
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", marginTop: 4 }}>
          {count} account{count !== 1 ? "s" : ""} registered
        </p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onCron} disabled={cronLoading} style={{
          background: "#1C1F2E", border: "1px solid #2D3148", borderRadius: 8,
          color: "#9CA3AF", padding: "9px 16px", cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 7,
        }}>
          <span style={{ fontSize: 14 }}>⟳</span>
          {cronLoading ? "Checking…" : "Run expiry check"}
        </button>
        <button onClick={onAdd} style={{
          background: "#8B5CF6", border: "none", borderRadius: 8,
          color: "#fff", padding: "9px 18px", cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
        }}>+ Add email</button>
      </div>
    </div>
  );
}