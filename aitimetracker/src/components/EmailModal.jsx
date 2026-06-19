import { useState } from "react";
import { toDatetimeLocal } from "../utils/format";

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
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "var(--panel-raised)", borderRadius: 12, padding: 28, width: 420,
        maxWidth: "100%", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)",
        animation: "modalIn 0.15s ease",
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 22 }}>
          {isEdit ? "Edit schedule" : "Add email"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Email address</label>
            <input
              style={{ ...inputStyle, opacity: isEdit ? 0.55 : 1 }}
              value={id} onChange={(e) => setId(e.target.value)}
              placeholder="user@example.com" disabled={isEdit}
            />
          </div>

          <div>
            <label style={labelStyle}>Claude scheduled time</label>
            <input type="datetime-local" style={inputStyle}
              value={claudeTime} onChange={(e) => setClaudeTime(e.target.value)} />
            {claudeTime && (
              <button onClick={() => setClaudeTime("")} style={clearBtnStyle}>✕ Clear (set to null)</button>
            )}
          </div>

          <div>
            <label style={labelStyle}>Gemini scheduled time</label>
            <input type="datetime-local" style={inputStyle}
              value={geminiTime} onChange={(e) => setGeminiTime(e.target.value)} />
            {geminiTime && (
              <button onClick={() => setGeminiTime("")} style={clearBtnStyle}>✕ Clear (set to null)</button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 26, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <button onClick={handleSave} disabled={loading || !id.trim()} style={{
            ...saveBtnStyle,
            cursor: loading || !id.trim() ? "not-allowed" : "pointer",
            opacity: loading || !id.trim() ? 0.5 : 1,
          }}>
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 7,
  color: "var(--text)", padding: "9px 12px", width: "100%", boxSizing: "border-box",
  fontFamily: "var(--font-mono)", fontSize: 13, outline: "none",
};

const labelStyle = {
  fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
  textTransform: "uppercase", letterSpacing: "0.06em",
  display: "block", marginBottom: 6,
};

const clearBtnStyle = {
  marginTop: 6, background: "none", border: "none",
  color: "var(--text-faint)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-ui)",
};

const cancelBtnStyle = {
  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 7,
  color: "var(--text-muted)", padding: "9px 18px", cursor: "pointer",
  fontSize: 13, fontWeight: 600,
};

const saveBtnStyle = {
  background: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 7,
  color: "var(--accent-fg)", padding: "9px 18px",
  fontSize: 13, fontWeight: 600,
};