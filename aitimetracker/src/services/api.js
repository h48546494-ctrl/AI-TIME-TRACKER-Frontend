const baseUrl = process.env.REACT_APP_API_URL || "https://ai-time-tracker-backend-i285.vercel.app";
const API = `${baseUrl.replace(/\/$/, "")}/tracker/v1`;

const handle = async (res, fallbackMsg) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || fallbackMsg);
  return data;
};

export const fetchAllEmails = async () => {
  const res = await fetch(`${API}/emails`);
  const data = await handle(res, "Failed to fetch emails");
  return data.data || [];
};

export const fetchActiveEmails = async () => {
  const res = await fetch(`${API}/emails/active`);
  const data = await handle(res, "Failed to fetch active emails");
  return data.data || [];
};

export const fetchInactiveEmails = async () => {
  const res = await fetch(`${API}/emails/inactive`);
  const data = await handle(res, "Failed to fetch inactive emails");
  return data.data || [];
};

export const searchEmails = async (query) => {
  const res = await fetch(`${API}/emails/search?q=${encodeURIComponent(query)}`);
  const data = await handle(res, "Search failed");
  return data.data || [];
};

export const saveEmail = async ({ id, claudeTime, geminiTime }) => {
  const res = await fetch(`${API}/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, claudeTime, geminiTime }),
  });
  return handle(res, "Failed to save email");
};

export const removeEmail = async (emailId) => {
  const res = await fetch(`${API}/emails/${encodeURIComponent(emailId)}`, {
    method: "DELETE",
  });
  return handle(res, "Failed to delete email");
};

export const triggerExpiryCheck = async () => {
  const res = await fetch(`${API}/cron/check-expiry`);
  return handle(res, "Cron check failed");
};

export const removeDuplicateEmails = async () => {
  const res = await fetch(`${API}/emails/duplicates`, {
    method: "DELETE",
  });
  return handle(res, "Failed to remove duplicates");
};