import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "StudyStreak — Daily Learning Tracker",
  description: "Track your daily study streak and stay consistent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0D0D0D", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 80px" }}>
          {children}
        </main>
        <footer style={{
          textAlign: "center",
          padding: "24px",
          fontSize: 12,
          color: "#444",
          borderTop: "1px solid #1A1A1A",
        }}>
          StudyStreak · Next.js 15 · TypeScript · Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
