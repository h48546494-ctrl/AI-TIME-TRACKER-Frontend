// Local YYYY-MM-DD key, avoids UTC-shift bugs from toISOString()
export const dateKey = (d) => {
  const dt = d instanceof Date ? d : new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const sameDay = (a, b) => dateKey(a) === dateKey(b);

export const isToday = (d) => sameDay(d, new Date());

export const monthLabel = (d) =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
export const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

/**
 * Builds a 6-row x 7-col grid of dates covering the full month,
 * padded with leading/trailing days from adjacent months.
 */
export const buildCalendarGrid = (anchorDate) => {
  const first = startOfMonth(anchorDate);
  const startOffset = first.getDay(); // 0=Sun
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startOffset);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
};

/**
 * For a given day, classify each email:
 * - A single service (claude/gemini) is BLOCKED on a day only if its scheduled
 *   time falls exactly on that day. Any other day (before or after), that
 *   service is usable.
 * - An account is USABLE that day if at least one of its two services is
 *   usable (not blocked) that day.
 * - "active" (for badges elsewhere) still means a service's time lands on
 *   this exact day.
 */
export const getDayStats = (emails, day) => {
  const activeAccounts = [];
  let usableCount = 0;

  for (const email of emails) {
    const claudeBlocked = email.claudeTime && sameDay(email.claudeTime, day);
    const geminiBlocked = email.geminiTime && sameDay(email.geminiTime, day);

    if (claudeBlocked || geminiBlocked) {
      activeAccounts.push({
        ...email,
        claudeActiveToday: !!claudeBlocked,
        geminiActiveToday: !!geminiBlocked,
      });
    }

    const usable = !claudeBlocked || !geminiBlocked;
    if (usable) usableCount++;
  }

  return {
    activeAccounts,
    activeCount: activeAccounts.length,
    availableCount: usableCount,
    total: emails.length,
  };
};

/**
 * Precompute stats for every day in a grid in one pass (avoids O(days*emails) re-filtering
 * inside render — still fine at small scale, but keeps things tidy).
 *
 * Days strictly before today get no stats (null) since there's no historical
 * data to base a count on — the tracker only started recording today.
 */
export const buildMonthStats = (emails, gridDays) => {
  const map = new Map();
  const todayKey = dateKey(new Date());
  for (const day of gridDays) {
    const key = dateKey(day);
    map.set(key, key < todayKey ? null : getDayStats(emails, day));
  }
  return map;
};