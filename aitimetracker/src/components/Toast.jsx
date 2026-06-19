export default function Toast({ toasts }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 100,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: t.type === "error" ? "#EF4444" : t.type === "warn" ? "#F59E0B" : "#10B981",
          color: "#fff", padding: "10px 18px", borderRadius: 8,
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          animation: "slideIn 0.2s ease",
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}