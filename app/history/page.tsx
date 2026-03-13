"use client";

import { useEffect, useState } from "react";
import HistoryList from "@/components/HistoryList";
import { getDatesFromStorage } from "@/lib/store";

interface HistoryEntry {
  raw: string;
  display: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const dates = getDatesFromStorage();
        const query = dates.length > 0 ? `?dates=${dates.join(",")}` : "";
        const res = await fetch(`/api/history${query}`);
        const json = await res.json();
        setHistory(json.history ?? []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div className="animate-fade-up">
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#6B21FF", textTransform: "uppercase", marginBottom: 8 }}>
          History
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "#F0F0F0", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
          Study Sessions
        </h1>
        <p style={{ marginTop: 10, fontSize: 16, color: "#666" }}>
          All your study sessions — newest first.
        </p>
      </div>

      <div className="animate-fade-up-2" style={{
        background: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: 20,
        padding: "28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#F0F0F0", letterSpacing: "-0.02em", margin: 0 }}>
            All Sessions
          </h2>
          <span style={{
            background: "rgba(200,241,53,0.1)",
            border: "1px solid rgba(200,241,53,0.2)",
            color: "#C8F135",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            padding: "4px 14px",
            borderRadius: 20,
          }}>
            {history.length} {history.length === 1 ? "day" : "days"}
          </span>
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: 56, borderRadius: 12, background: "#1E1E1E" }} />
            ))}
          </div>
        ) : (
          <HistoryList history={history} />
        )}
      </div>
    </div>
  );
}
