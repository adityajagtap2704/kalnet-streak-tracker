"use client";

import { useEffect, useState, useCallback } from "react";
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";
import { getDatesFromStorage } from "@/lib/store";

interface StreakData {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

export default function DashboardPage() {
  const [data, setData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStreak = useCallback(async () => {
    try {
      const dates = getDatesFromStorage();
      const query = dates.length > 0 ? `?dates=${dates.join(",")}` : "";
      const res = await fetch(`/api/streak${query}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch streak:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStreak(); }, [fetchStreak]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Page header */}
      <div className="animate-fade-up">
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#6B21FF", textTransform: "uppercase", marginBottom: 8 }}>
          Dashboard
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "#F0F0F0", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
          Daily Learning<br />Tracker
        </h1>
        <p style={{ marginTop: 10, fontSize: 16, color: "#666" }}>
          Mark your session each day to build your streak.
        </p>
      </div>

      {/* Streak stats */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[180, 100].map((h, i) => (
            <div key={i} style={{
              height: h, borderRadius: 20, background: "#161616",
              animation: "pulse-lime 2s infinite",
            }} />
          ))}
        </div>
      ) : data ? (
        <StreakCard currentStreak={data.currentStreak} totalDays={data.totalDays} lastStudyDate={data.lastStudyDate} />
      ) : null}

      {/* Study button section */}
      <div className="animate-fade-up-3" style={{
        background: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: 20,
        padding: "28px 28px",
      }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#F0F0F0", letterSpacing: "-0.02em", marginBottom: 6 }}>
          Mark Today&apos;s Study
        </h2>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>
          Click once you&apos;ve completed your study session today.
        </p>
        <StudyButton onSuccess={fetchStreak} />
      </div>

      {/* Streak rules */}
      <div className="animate-fade-up-4" style={{
        background: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: 20,
        padding: "24px 28px",
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 16 }}>
          Streak Rules
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "✅", text: "Study today — streak continues", color: "#C8F135" },
            { icon: "🚫", text: "Miss a day — streak resets to 1", color: "#FF6B6B" },
            { icon: "⚡", text: "One entry per day maximum", color: "#A78BFA" },
          ].map(({ icon, text, color }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ fontSize: 14, color: "#AAAAAA" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
