"use client";

interface HistoryEntry {
  raw: string;
  display: string;
}

interface HistoryListProps {
  history: HistoryEntry[];
}

export default function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#444" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
        <p style={{ fontWeight: 700, fontSize: 16, color: "#666", fontFamily: "var(--font-display)" }}>No sessions yet</p>
        <p style={{ fontSize: 14, marginTop: 6, color: "#444" }}>Head to the Dashboard and mark your first day!</p>
      </div>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {history.map((entry, idx) => (
        <li key={entry.raw}
          className="animate-fade-up"
          style={{
            animationDelay: `${idx * 0.05}s`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 20px",
            background: idx === 0 ? "rgba(200,241,53,0.06)" : "#161616",
            border: `1px solid ${idx === 0 ? "rgba(200,241,53,0.2)" : "#2A2A2A"}`,
            borderRadius: 12,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = idx === 0 ? "rgba(200,241,53,0.4)" : "#3A3A3A")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = idx === 0 ? "rgba(200,241,53,0.2)" : "#2A2A2A")}
        >
          <span style={{
            minWidth: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8,
            background: idx === 0 ? "rgba(200,241,53,0.15)" : "#2A2A2A",
            color: idx === 0 ? "#C8F135" : "#666",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 13,
          }}>
            {idx + 1}
          </span>

          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 16,
            color: idx === 0 ? "#F0F0F0" : "#AAAAAA",
            letterSpacing: "-0.01em",
            flex: 1,
          }}>
            {entry.display}
          </span>

          {idx === 0 && (
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#C8F135",
              background: "rgba(200,241,53,0.1)",
              border: "1px solid rgba(200,241,53,0.2)",
              padding: "3px 10px",
              borderRadius: 20,
            }}>
              Latest
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
