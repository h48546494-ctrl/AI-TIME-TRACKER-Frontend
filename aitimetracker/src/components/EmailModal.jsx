import { useState } from "react";
import { toDatetimeLocal } from "../utils/format";

const inputStyle = {
  background: "#0F1117", border: "1px solid #2D3148", borderRadius: 8,
  color: "#E8EAF0", padding: "9px 12px", width: "100%", boxSizing: "border-box",
  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: "none",
};

const labelStyle = {
  fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
  color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.07em",
  display: "block", marginBottom: 6,
};

export default function EmailModal({ initial, onClose, onSave, loading }) {
  const isEdit = !!initial;
  const [id, setId]                 = useState(initial?.id || initial?._id || "");
  const [claudeTime, setClaudeTime] = useState(toDatetimeLocal(initial?.claudeTime));
  const [geminiTime, setGeminiTime] = useState(toDatetimeLocal(initial?.geminiTime));

  const handleSave = () => onSave({
    id: id.trim(),
    claudeTime: claudeTime ? new Date(claudeTime).toISOString() : null,
    geminiTime: geminiTime ? new Date(geminiTime).toISOString() : null,
  });

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#1C1F2E", borderRadius: 14, padding: 32, width: 420,
        border: "1px solid #2D3148", boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        <h2 style={{
          fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700,
          color: "#E8EAF0", margin: "0 0 24px",
        }}>
          {isEdit ? "Edit schedule" : "Add email"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={labelStyle}>Email address</label>
            <input
              style={{ ...inputStyle, opacity: isEdit ? 0.5 : 1 }}
              value={id} onChange={(e) => setId(e.target.value)}
              placeholder="user@example.com" disabled={isEdit}
            />
          </div>

          <div>
            <label style={{ ...labelStyle, color: "#8B5CF6" }}>Claude scheduled time</label>
            <input type="datetime-local" style={inputStyle}
              value={claudeTime} onChange={(e) => setClaudeTime(e.target.value)} />
            {claudeTime && (
              <button onClick={() => setClaudeTime("")} style={{
                marginTop: 6, background: "none", border: "none",
                color: "#6B7280", fontSize: 11, cursor: "pointer", fontFamily: "Inter, sans-serif",
              }}>✕ Clear (set to null)</button>
            )}
          </div>

          <div>
            <label style={{ ...labelStyle, color: "#3B82F6" }}>Gemini scheduled time</label>
            <input type="datetime-local" style={inputStyle}
              value={geminiTime} onChange={(e) => setGeminiTime(e.target.value)} />
            {geminiTime && (
              <button onClick={() => setGeminiTime("")} style={{
                marginTop: 6, background: "none", border: "none",
                color: "#6B7280", fontSize: 11, cursor: "pointer", fontFamily: "Inter, sans-serif",
              }}>✕ Clear (set to null)</button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 28, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #2D3148", borderRadius: 8,
            color: "#9CA3AF", padding: "9px 20px", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
          }}>Cancel</button>
          <button onClick={handleSave} disabled={loading || !id.trim()} style={{
            background: "#8B5CF6", border: "none", borderRadius: 8,
            color: "#fff", padding: "9px 20px",
            cursor: loading || !id.trim() ? "not-allowed" : "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
            opacity: loading || !id.trim() ? 0.6 : 1,
          }}>
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}