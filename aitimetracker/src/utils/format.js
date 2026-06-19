export const formatDate = (iso) => {
  if (!iso) return null;
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

export const isPast = (iso) => iso && new Date(iso) <= new Date();

export const toDatetimeLocal = (iso) =>
  iso ? new Date(iso).toISOString().slice(0, 16) : "";