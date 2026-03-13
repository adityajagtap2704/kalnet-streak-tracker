"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "History", href: "/history" },
  ];

  return (
    <nav style={{
      background: "rgba(13,13,13,0.95)",
      borderBottom: "1px solid #2A2A2A",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{
            background: "linear-gradient(135deg, #C8F135, #6B21FF)",
            borderRadius: 10,
            width: 34, height: 34,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>⚡</span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 20,
            color: "#F0F0F0",
            letterSpacing: "-0.02em",
          }}>
            StudyStreak
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4 }}>
          {links.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? "#C8F135" : "#888",
                  textDecoration: "none",
                  border: isActive ? "1px solid #2A2A2A" : "1px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
