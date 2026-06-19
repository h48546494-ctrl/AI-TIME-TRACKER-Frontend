export default function Header({ counts, theme, onToggleTheme, onAdd, onRemoveDuplicates, removingDuplicates }) {
  const total = counts?.total ?? 0;

  const handleRemoveDuplicates = () => {
    if (!onRemoveDuplicates) return;
    const confirmed = window.confirm(
      "This will permanently remove duplicate email records (keeping the most recently updated copy of each). Continue?"
    );
    if (confirmed) onRemoveDuplicates();
  };

  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "24px 32px",
      borderBottom: "1px solid var(--border)",
    }}>
      <div>
        <h1 style={{
          fontFamily: "var(--font-ui)", fontSize: 22, fontWeight: 700,
          color: "var(--text)", letterSpacing: "-0.02em", margin: 0,
        }}>
          AI Schedule Tracker
        </h1>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          Track scheduled email activations
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-end",
          padding: "8px 18px", borderRadius: 10,
          background: "var(--panel-raised)", border: "1px solid var(--border)",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700,
            color: "var(--text)", lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            {total}
          </span>
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600,
            color: "var(--text-faint)", textTransform: "uppercase",
            letterSpacing: "0.06em", marginTop: 2,
          }}>
            account{total !== 1 ? "s" : ""} registered
          </span>
        </div>

        {onRemoveDuplicates && (
          <button
            onClick={handleRemoveDuplicates}
            disabled={removingDuplicates}
            title="Remove duplicate email records"
            style={{
              background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 8,
              color: "var(--text-muted)", padding: "9px 14px", cursor: removingDuplicates ? "not-allowed" : "pointer",
              fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 7,
              opacity: removingDuplicates ? 0.6 : 1,
            }}
          >
            <span style={{ fontSize: 14 }}>⧉</span>
            {removingDuplicates ? "Removing…" : "Remove duplicates"}
          </button>
        )}

        {onToggleTheme && (
          <button onClick={onToggleTheme} style={iconBtnStyle} aria-label="Toggle theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
        )}

        {onAdd && (
          <button onClick={onAdd} style={{
            background: "var(--accent)", border: "none", borderRadius: 8,
            color: "var(--accent-fg)", padding: "9px 18px", cursor: "pointer",
            fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600,
          }}>+ Add email</button>
        )}
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 8,
  color: "var(--text)", width: 36, height: 36, cursor: "pointer",
  fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
};