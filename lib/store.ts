// lib/store.ts
// Browser localStorage helpers — runs only on the client side.
// This is the persistent storage layer: data survives page refreshes and
// browser restarts. Works perfectly on Vercel with zero configuration.

const STORAGE_KEY = "studystreak_dates";

export function getDatesFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveDateToStorage(date: string): { success: boolean; message: string } {
  const dates = getDatesFromStorage();
  if (dates.includes(date)) {
    return { success: false, message: "You have already marked today." };
  }
  dates.push(date);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  return { success: true, message: "Study session recorded!" };
}
