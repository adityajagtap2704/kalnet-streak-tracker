"use client";

import { useState } from "react";
import { getDatesFromStorage } from "@/lib/store";

const STORAGE_KEY = "studystreak_dates";

interface StudyButtonProps {
  onSuccess: () => void;
}

export default function StudyButton({ onSuccess }: StudyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  async function handleClick() {
    setLoading(true);
    setMessage(null);
    try {
      const existingDates = getDatesFromStorage();
      const res = await fetch("/api/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates: existingDates }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setMessage({ text: data.message, type: "info" });
        return;
      }
      if (res.status === 201 && data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.updatedDates));
        setMessage({
          text: `Study session recorded! 🔥 Streak: ${data.currentStreak} day${data.currentStreak !== 1 ? "s" : ""}`,
          type: "success",
        });
        onSuccess();
      } else {
        setMessage({ text: data.message || "Something went wrong.", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const msgColor: Record<string, string> = {
    success: "#C8F135",
    error: "#FF6B6B",
    info: "#A78BFA",
  };
  const msgBg: Record<string, string> = {
    success: "rgba(200,241,53,0.08)",
    error: "rgba(255,80,80,0.08)",
    info: "rgba(107,33,255,0.08)",
  };
  const msgBorder: Record<string, string> = {
    success: "rgba(200,241,53,0.3)",
    error: "rgba(255,80,80,0.3)",
    info: "rgba(107,33,255,0.3)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          width: "100%",
          padding: "18px 32px",
          borderRadius: 14,
          background: loading
            ? "#2A2A2A"
            : "linear-gradient(135deg, #C8F135 0%, #A8D420 100%)",
          color: loading ? "#666" : "#0D0D0D",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.01em",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Saving..." : "⚡ I Studied Today"}
      </button>

      {message && (
        <div style={{
          background: msgBg[message.type],
          border: `1px solid ${msgBorder[message.type]}`,
          color: msgColor[message.type],
          borderRadius: 12,
          padding: "14px 20px",
          fontSize: 14,
          fontWeight: 600,
          textAlign: "center",
        }}>
          {message.text}
        </div>
      )}
    </div>
  );
}
