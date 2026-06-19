import { useState, useMemo } from "react";
import {
  buildCalendarGrid, buildMonthStats, dateKey,
  monthLabel, isToday, sameDay,
} from "../utils/calendar";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar({ emails, selectedDate, onSelectDate }) {
  const [anchor, setAnchor] = useState(new Date(selectedDate));

  const gridDays = useMemo(() => buildCalendarGrid(anchor), [anchor]);
  const statsMap = useMemo(() => buildMonthStats(emails, gridDays), [emails, gridDays]);
  const currentMonth = anchor.getMonth();

  const goPrevMonth = () => setAnchor((a) => new Date(a.getFullYear(), a.getMonth() - 1, 1));
  const goNextMonth = () => setAnchor((a) => new Date(a.getFullYear(), a.getMonth() + 1, 1));
  const goToday = () => {
    const t = new Date();
    setAnchor(t);
    onSelectDate(t);
  };

  return (
    <div style={{
      background: "var(--panel-raised)", border: "1px solid var(--border)",
      borderRadius: 12, padding: 24, boxShadow: "var(--shadow)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
          {monthLabel(anchor)}
        </h2>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={goPrevMonth} style={navBtnStyle} aria-label="Previous month">‹</button>
          <button onClick={goToday} style={{ ...navBtnStyle, width: "auto", padding: "0 12px", fontSize: 12, fontWeight: 600 }}>
            Today
          </button>
          <button onClick={goNextMonth} style={navBtnStyle} aria-label="Next month">›</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
        {WEEKDAYS.map((d, i) => (
          <div key={i} style={{
            textAlign: "center", fontSize: 11, fontWeight: 600,
            color: "var(--text-faint)", textTransform: "uppercase",
            letterSpacing: "0.06em", padding: "4px 0",
          }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {gridDays.map((day) => {
          const key = dateKey(day);
          const stats = statsMap.get(key);
          const inMonth = day.getMonth() === currentMonth;
          const selected = sameDay(day, selectedDate);
          const today = isToday(day);

          return (
            <button
              key={key}
              onClick={() => onSelectDate(day)}
              style={{
                position: "relative",
                aspectRatio: "1",
                minHeight: 58,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 2,
                background: selected ? "var(--accent)" : "var(--bg)",
                border: today && !selected ? "1px solid var(--text)" : "1px solid var(--border)",
                borderRadius: 8,
                cursor: "pointer",
                opacity: inMonth ? 1 : 0.35,
                transition: "all 0.12s ease",
              }}
            >
              <span style={{
                fontSize: 12.5, fontWeight: today ? 700 : 500,
                color: selected ? "var(--accent-fg)" : "var(--text)",
              }}>
                {day.getDate()}
              </span>
              {stats && stats.activeCount > 0 && (
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: selected ? "var(--accent-fg)" : "var(--success)",
                  background: selected ? "rgba(255,255,255,0.18)" : "var(--success-bg)",
                  borderRadius: 4, padding: "1px 6px",
                }}>
                  {stats.activeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
        <Legend swatchColor="var(--success)" swatchBg="var(--success-bg)" label="Emails scheduled that day" />
      </div>
    </div>
  );
}

function Legend({ swatchColor, swatchBg, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{
        width: 8, height: 8, borderRadius: 3, background: swatchBg,
        border: `1.5px solid ${swatchColor}`,
      }} />
      <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

const navBtnStyle = {
  background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6,
  color: "var(--text)", width: 28, height: 28, cursor: "pointer",
  fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
};