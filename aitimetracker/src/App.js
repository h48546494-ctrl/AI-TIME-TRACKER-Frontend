import { useState } from "react";
import { useTheme }    from "./hooks/useTheme";
import { useToast }    from "./hooks/useToast";
import { useEmails }   from "./hooks/useEmails";
import Header          from "./components/Header";
import EmailList       from "./components/EmailList";
import Calendar        from "./components/Calendar";
import EmailModal      from "./components/EmailModal";
import CronBanner      from "./components/CronBanner";
import Toast           from "./components/Toast";
import "./styles/theme.css";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { toasts, toast } = useToast();
  const {
    emails, fetching, loadEmails,
    filterMode, changeFilter,
    saving, handleSave,
    deleting, handleDelete,
    cronLoading, cronResult, setCronResult, handleCron,
    removingDuplicates, handleRemoveDuplicates,
    counts,
  } = useEmails(toast);

  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', data? }
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSave = async (payload) => {
    const ok = await handleSave(payload);
    if (ok) setModal(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Header
          counts={counts}
          filterMode={filterMode}
          onFilterChange={changeFilter}
          onAdd={() => setModal({ mode: "add" })}
          onReload={() => loadEmails()}
          reloading={fetching}
          theme={theme}
          onToggleTheme={toggleTheme}
          onRemoveDuplicates={handleRemoveDuplicates}
          removingDuplicates={removingDuplicates}
        />

        <div style={{ padding: "24px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <CronBanner result={cronResult} onDismiss={() => setCronResult(null)} />

          <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <button onClick={handleCron} disabled={cronLoading} style={cronBtnStyle(cronLoading)}>
              <span>⟳</span> {cronLoading ? "Checking…" : "Run expiry check"}
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 380px) 1fr",
            gap: 20,
            alignItems: "start",
          }}
          className="tracker-grid"
          >
            <div style={{ height: "calc(100vh - 220px)", minHeight: 420 }}>
              <EmailList
                emails={emails}
                selectedDate={selectedDate}
                fetching={fetching}
                deleting={deleting}
                onEdit={(data) => setModal({ mode: "edit", data })}
                onDelete={handleDelete}
                onAdd={() => setModal({ mode: "add" })}
                showingAllDates={filterMode !== "all"}
              />
            </div>

            <Calendar
              emails={emails}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--text-faint)", marginTop: 20, textAlign: "center",
          }}>
            Cron runs every minute on Vercel
          </p>
        </div>
      </div>

      {modal && (
        <EmailModal
          initial={modal.mode === "edit" ? modal.data : null}
          onClose={() => setModal(null)}
          onSave={onSave}
          loading={saving}
        />
      )}

      <Toast toasts={toasts} />

      <style>{`
        @media (max-width: 860px) {
          .tracker-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

const cronBtnStyle = (loading) => ({
  background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 8,
  color: "var(--text-muted)", padding: "8px 14px", cursor: loading ? "not-allowed" : "pointer",
  fontSize: 12.5, fontWeight: 500, display: "flex", alignItems: "center", gap: 6,
  opacity: loading ? 0.6 : 1,
});