const baseUrl = process.env.REACT_APP_API_URL || "https://ai-time-tracker-backend-i285.vercel.app";
const API = `${baseUrl.replace(/\/$/, "")}/tracker/v1`;

export const fetchAllEmails = async () => {
  const res = await fetch(`${API}/emails`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch emails");
  return data.data || [];
};

export const saveEmail = async ({ id, claudeTime, geminiTime }) => {
  const res = await fetch(`${API}/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, claudeTime, geminiTime }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to save email");
  return data;
};

export const removeEmail = async (emailId) => {
  const res = await fetch(`${API}/emails/${encodeURIComponent(emailId)}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete email");
  return data;
};

export const triggerExpiryCheck = async () => {
  const res = await fetch(`${API}/cron/check-expiry`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cron check failed");
  return data;
};