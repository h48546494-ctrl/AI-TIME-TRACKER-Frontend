export default function CronBanner({ result, onDismiss }) {
  if (!result?.activated?.length) return null;

  return (
    <div style={{
      background: "#F59E0B18", border: "1px solid #F59E0B44",
      borderRadius: 10, padding: "14px 18px", marginBottom: 24,
    }}>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 13,
        color: "#F59E0B", fontWeight: 600, marginBottom: 8,
      }}>
        {result.message}
      </p>
      {result.activated.map((a) => (
        <div key={a.id} style={{ marginBottom: 4 }}>
          {a.activatedServices.map((s, i) => (
            <p key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, color: "#9CA3AF",
            }}>
              → {s.message}
            </p>
          ))}
        </div>
      ))}
      <button onClick={onDismiss} style={{
        marginTop: 8, background: "none", border: "none",
        color: "#6B7280", fontSize: 11, cursor: "pointer",
        fontFamily: "Inter, sans-serif",
      }}>Dismiss</button>
    </div>
  );
}