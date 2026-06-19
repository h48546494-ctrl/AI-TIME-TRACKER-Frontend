import ServiceBadge from "./ServiceBadge";
import { formatDate } from "../utils/format";

const thStyle = {
  fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
  color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.07em",
  padding: "14px 20px", textAlign: "left",
};

export default function EmailTable({ emails, fetching, deleting, onEdit, onDelete, onAdd }) {
  if (fetching) {
    return (
      <div style={{ padding: 48, textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
        Loading…
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div style={{ padding: 48, textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280" }}>No accounts yet.</p>
        <button onClick={onAdd} style={{
          marginTop: 12, background: "none", border: "1px solid #2D3148",
          borderRadius: 8, color: "#8B5CF6", padding: "8px 16px", cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 13,
        }}>Add the first one →</button>
      </div>
    );
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #2D3148" }}>
          {["Email address", "Claude", "Gemini", "Added", "Actions"].map((h) => (
            <th key={h} style={thStyle}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {emails.map((email) => {
          const id = email._id || email.id;
          return (
            <tr key={id} style={{ borderBottom: "1px solid #2D314860" }}>
              <td style={{ padding: "16px 20px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#E8EAF0", fontWeight: 500 }}>
                  {id}
                </span>
              </td>
              <td style={{ padding: "16px 20px" }}>
                <ServiceBadge label="Claude" time={email.claudeTime} color="#8B5CF6" />
              </td>
              <td style={{ padding: "16px 20px" }}>
                <ServiceBadge label="Gemini" time={email.geminiTime} color="#3B82F6" />
              </td>
              <td style={{ padding: "16px 20px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#6B7280" }}>
                  {formatDate(email.createdAt)}
                </span>
              </td>
              <td style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => onEdit({ ...email, id })} style={{
                    background: "#2D3148", border: "none", borderRadius: 6,
                    color: "#9CA3AF", padding: "6px 12px", cursor: "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                  }}>Edit</button>
                  <button onClick={() => onDelete(id)} disabled={deleting === id} style={{
                    background: "#EF444418", border: "1px solid #EF444433",
                    borderRadius: 6, color: "#EF4444", padding: "6px 12px",
                    cursor: deleting === id ? "not-allowed" : "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                    opacity: deleting === id ? 0.5 : 1,
                  }}>
                    {deleting === id ? "…" : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}