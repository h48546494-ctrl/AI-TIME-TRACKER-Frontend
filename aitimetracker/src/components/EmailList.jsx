import ServiceBadge from "./ServiceBadge";
import { sameDay } from "../utils/calendar";

export default function EmailList({ emails, selectedDate, fetching, deleting, onEdit, onDelete, onAdd, showingAllDates }) {
  // The service time that actually matches the selected date (used for sorting)
  const matchingTime = (e) => {
    const claudeMatches = e.claudeTime && sameDay(e.claudeTime, selectedDate);
    const geminiMatches = e.geminiTime && sameDay(e.geminiTime, selectedDate);
    const times = [];
    if (claudeMatches) times.push(new Date(e.claudeTime).getTime());
    if (geminiMatches) times.push(new Date(e.geminiTime).getTime());
    return times.length ? Math.min(...times) : Infinity;
  };

  const dayEmails = showingAllDates
    ? emails
    : emails
        .filter((e) =>
          (e.claudeTime && sameDay(e.claudeTime, selectedDate)) ||
          (e.geminiTime && sameDay(e.geminiTime, selectedDate))
        )
        .sort((a, b) => matchingTime(a) - matchingTime(b));

  const dateLabel = selectedDate.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div style={{
      background: "var(--panel-raised)", border: "1px solid var(--border)",
      borderRadius: 12, boxShadow: "var(--shadow)", display: "flex",
      flexDirection: "column", height: "100%", overflow: "hidden",
    }}>
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
          {showingAllDates ? "All accounts" : "Scheduled"}
        </h2>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          {showingAllDates ? `${dayEmails.length} total` : dateLabel}
        </p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
        {fetching ? (
          <EmptyState text="Loading…" />
        ) : dayEmails.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
              {showingAllDates ? "No accounts yet." : "Nothing scheduled on this date."}
            </p>
            <button onClick={onAdd} style={addLinkStyle}>+ Add an email</button>
          </div>
        ) : (
          dayEmails.map((email) => {
            const id = email._id || email.id;
            return (
              <div
                key={id}
                style={{
                  padding: "12px 12px", borderRadius: 8, marginBottom: 4,
                  border: "1px solid transparent",
                  animation: "fadeSlide 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12.5,
                    color: "var(--text)", fontWeight: 500, wordBreak: "break-all",
                  }}>
                    {id}
                  </span>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => onEdit({ ...email, id })} style={smallBtnStyle} title="Edit">
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      disabled={deleting === id}
                      style={{ ...smallBtnStyle, color: "var(--danger)", cursor: deleting === id ? "not-allowed" : "pointer" }}
                      title="Delete"
                    >
                      {deleting === id ? "…" : "Del"}
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                  <ServiceBadge label="Claude" time={email.claudeTime} dotColor="var(--claude-dot)" />
                  <ServiceBadge label="Gemini" time={email.geminiTime} dotColor="var(--gemini-dot)" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div style={{ padding: 32, textAlign: "center", fontSize: 13, color: "var(--text-muted)" }}>
      {text}
    </div>
  );
}

const smallBtnStyle = {
  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 5,
  color: "var(--text-muted)", padding: "3px 9px", cursor: "pointer",
  fontSize: 11, fontWeight: 600,
};

const addLinkStyle = {
  background: "none", border: "1px solid var(--border)", borderRadius: 7,
  color: "var(--text)", padding: "7px 14px", cursor: "pointer", fontSize: 12.5, fontWeight: 600,
};