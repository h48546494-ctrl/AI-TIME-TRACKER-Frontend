import { useState }    from "react";
import { useToast }    from "./hooks/useToast";
import { useEmails }   from "./hooks/useEmails";
import Header          from "./components/Header";
import EmailTable      from "./components/EmailTable";
import EmailModal      from "./components/EmailModal";
import CronBanner      from "./components/CronBanner";
import Toast           from "./components/Toast";

export default function App() {
  const { toasts, toast } = useToast();
  const {
    emails, fetching,
    saving, handleSave,
    deleting, handleDelete,
    cronLoading, cronResult, setCronResult, handleCron,
  } = useEmails(toast);

  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', data? }

  const onSave = async (payload) => {
    const ok = await handleSave(payload);
    if (ok) setModal(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0F1117; }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
          50%       { opacity: 0.5; box-shadow: 0 0 2px currentColor; }
        }
        @keyframes slideIn {
          from { transform: translateX(30px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0F1117; }
        ::-webkit-scrollbar-thumb { background: #2D3148; border-radius: 3px; }
        tr:hover td { background: #1e2235 !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0F1117", padding: "32px 40px" }}>
        <Header
          count={emails.length}
          onAdd={() => setModal({ mode: "add" })}
          onCron={handleCron}
          cronLoading={cronLoading}
        />

        <CronBanner result={cronResult} onDismiss={() => setCronResult(null)} />

        <div style={{
          background: "#1C1F2E", borderRadius: 12,
          border: "1px solid #2D3148", overflow: "hidden",
        }}>
          <EmailTable
            emails={emails}
            fetching={fetching}
            deleting={deleting}
            onEdit={(data) => setModal({ mode: "edit", data })}
            onDelete={handleDelete}
            onAdd={() => setModal({ mode: "add" })}
          />
        </div>

        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: "#374151", marginTop: 20, textAlign: "center",
        }}>
          Cron runs every minute on Vercel · {new Date().toLocaleTimeString()}
        </p>
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
    </>
  );
}