export default function CronBanner({ result, onDismiss }) {
  if (!result?.activated?.length) return null;

  return (
    <div style={{
      background: "var(--warn-bg)", border: "1px solid var(--warn)",
      borderRadius: 10, padding: "14px 18px", marginBottom: 20,
      animation: "fadeSlide 0.15s ease",
    }}>
      <p style={{ fontSize: 13, color: "var(--warn)", fontWeight: 600, marginBottom: 8 }}>
        {result.message}
      </p>
      {result.activated.map((a) => (
        <div key={a.id} style={{ marginBottom: 4 }}>
          {a.activatedServices.map((s, i) => (
            <p key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>
              → {s.message}
            </p>
          ))}
        </div>
      ))}
      <button onClick={onDismiss} style={{
        marginTop: 8, background: "none", border: "none",
        color: "var(--text-faint)", fontSize: 11, cursor: "pointer",
      }}>
        Dismiss
      </button>
    </div>
  );
}