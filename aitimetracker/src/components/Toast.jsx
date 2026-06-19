export default function Toast({ toasts }) {
  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 100,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: t.type === "error" ? "var(--danger)" : t.type === "warn" ? "var(--warn)" : "var(--success)",
          color: "#fff", padding: "10px 16px", borderRadius: 8,
          fontSize: 13, fontWeight: 500,
          boxShadow: "var(--shadow-lg)",
          animation: "toastIn 0.18s ease",
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}