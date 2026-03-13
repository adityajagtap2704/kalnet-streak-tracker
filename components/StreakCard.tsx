"use client";

interface StreakCardProps {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

export default function StreakCard({ currentStreak, totalDays, lastStudyDate }: StreakCardProps) {
  const getMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today! 🚀";
    if (streak === 1) return "Getting started — keep going!";
    if (streak < 7) return "Building momentum! 🔥";
    if (streak < 30) return "On a roll — don't stop now! ⚡";
    return "Legendary streak! 🏆";
  };

  return (
    <div className="animate-fade-up-1" style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Main streak hero card */}
      <div style={{
        background: "linear-gradient(135deg, #1A0A3D 0%, #0D1A3D 50%, #0D2A1A 100%)",
        border: "1px solid #2A2A4A",
        borderRadius: 20,
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(107,33,255,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: -20,
          width: 150, height: 150,
          background: "radial-gradient(circle, rgba(200,241,53,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#C8F135", marginBottom: 12, textTransform: "uppercase" }}>
          Current Streak
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }} className="animate-count">
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            color: "#F0F0F0",
            letterSpacing: "-0.04em",
          }}>{currentStreak}</span>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#888", fontFamily: "var(--font-display)" }}>
            {currentStreak === 1 ? "day" : "days"}
          </span>
        </div>

        <p style={{ marginTop: 12, fontSize: 15, color: "#888", fontStyle: "italic" }}>
          {getMessage(currentStreak)}
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{
          background: "#161616",
          border: "1px solid #2A2A2A",
          borderRadius: 16,
          padding: "24px 24px",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 8 }}>
            Total Days Studied
          </p>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 700,
            color: "#C8F135",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }} className="animate-count">{totalDays}</p>
        </div>

        <div style={{
          background: "#161616",
          border: "1px solid #2A2A2A",
          borderRadius: 16,
          padding: "24px 24px",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 8 }}>
            Last Studied
          </p>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: lastStudyDate ? 20 : 40,
            fontWeight: 700,
            color: lastStudyDate ? "#F0F0F0" : "#2A2A2A",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginTop: lastStudyDate ? 8 : 0,
          }}>
            {lastStudyDate ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
