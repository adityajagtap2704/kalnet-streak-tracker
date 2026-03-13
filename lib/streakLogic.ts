// lib/streakLogic.ts
// Pure functions for streak calculation — used by API routes

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function calculateStreak(studyDates: string[]): number {
  if (studyDates.length === 0) return 0;

  // Sort descending
  const sorted = [...studyDates].sort((a, b) => (a > b ? -1 : 1));
  const today = getTodayDate();

  // Streak must start from today or yesterday
  if (sorted[0] !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    if (sorted[0] !== yesterdayStr) return 0;
  }

  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const next = new Date(sorted[i + 1]);
    const diffMs = current.getTime() - next.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
