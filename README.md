# StudyStreak — Daily Learning Streak Tracker

A **full-stack** Daily Learning Streak Tracker built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Live Demo
Deploy to Vercel — see Deployment section below.

---

## Features

- ✅ Mark "I Studied Today" (once per day)
- 🔥 Current streak counter
- 📊 Total days studied
- 📅 Last study date
- 📋 Full study history (newest first)
- 💾 Data persists in browser localStorage — works on Vercel with zero config

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes (POST /api/study, GET /api/streak, GET /api/history) |
| Storage | Browser localStorage (Option 3 from task spec) |
| Deployment | Vercel |

---

## How Streak Logic Works

1. Click **"I Studied Today"** → date saved to localStorage → `POST /api/study` validates it
2. Dashboard reads dates from localStorage → sends to `GET /api/streak` → server calculates streak
3. If already marked today → shows "You have already marked today."
4. Consecutive days → streak grows. Miss a day → streak resets to 1.
5. History page sends dates to `GET /api/history` → server returns sorted list

**Example:**
```
10 March → Studied ✅
11 March → Studied ✅
12 March → Studied ✅  → Streak = 3

13 March → Missed  ❌
14 March → Studied ✅  → Streak resets = 1
```

---

## API Endpoints

### `POST /api/study`
Validates today's study date.
```json
{ "success": true, "message": "Study session recorded!", "date": "2026-03-13" }
```

### `GET /api/streak?dates=2026-03-13,2026-03-12`
Returns streak stats calculated server-side.
```json
{ "currentStreak": 2, "totalDays": 2, "lastStudyDate": "13 March 2026" }
```

### `GET /api/history?dates=2026-03-13,2026-03-12`
Returns all dates sorted newest first.
```json
{ "history": [{ "raw": "2026-03-13", "display": "13 March 2026" }] }
```

---

## Project Structure

```
app/
  page.tsx              # Dashboard
  layout.tsx            # Root layout + navbar
  dashboard/page.tsx    # Redirects to /
  history/page.tsx      # Study history
  api/
    study/route.ts      # POST /api/study
    streak/route.ts     # GET /api/streak
    history/route.ts    # GET /api/history

components/
  StreakCard.tsx         # Stats display
  StudyButton.tsx       # Mark study button
  HistoryList.tsx       # History list

lib/
  streakLogic.ts        # Streak calculation logic
  store.ts              # localStorage helpers
```

---

## Setup & Run Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

No environment variables needed.

---

## Deployment to Vercel

1. Push code to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Click Deploy (auto-detects Next.js)
4. Share your live link ✅

No environment variables or database setup required.
