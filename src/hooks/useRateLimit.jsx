import { useState, useEffect } from 'react';

const COOLDOWN_MS = 60_000;      // 1 min between submits
const MAX_PER_DAY = 3;           // max submits per day per browser
const STORAGE_KEY = 'contact_form_limit';

export function useRateLimit() {
  const [remainingCooldown, setRemainingCooldown] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = getData();
      const wait = COOLDOWN_MS - (Date.now() - data.lastSubmit);
      setRemainingCooldown(wait > 0 ? Math.ceil(wait / 1000) : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lastSubmit: 0, count: 0, day: today() };
    const parsed = JSON.parse(raw);
    // reset count if it's a new day
    if (parsed.day !== today()) return { lastSubmit: parsed.lastSubmit, count: 0, day: today() };
    return parsed;
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function canSubmit() {
    const data = getData();
    if (Date.now() - data.lastSubmit < COOLDOWN_MS) {
      return { ok: false, reason: `Please wait ${Math.ceil((COOLDOWN_MS - (Date.now() - data.lastSubmit)) / 1000)}s before sending again.` };
    }
    if (data.count >= MAX_PER_DAY) {
      return { ok: false, reason: "You've reached today's message limit. Try again tomorrow." };
    }
    return { ok: true };
  }

  function recordSubmit() {
    const data = getData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      lastSubmit: Date.now(),
      count: data.count + 1,
      day: today(),
    }));
  }

  return { canSubmit, recordSubmit, remainingCooldown };
}