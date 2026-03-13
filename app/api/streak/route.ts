// app/api/streak/route.ts
// GET /api/streak — Calculates streak from dates sent by client.

import { NextRequest, NextResponse } from "next/server";
import { calculateStreak, formatDisplayDate } from "@/lib/streakLogic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const datesParam = searchParams.get("dates");

    const dates: string[] = datesParam
      ? datesParam.split(",").filter(Boolean)
      : [];

    const currentStreak = calculateStreak(dates);
    const totalDays = dates.length;
    const sorted = [...dates].sort((a, b) => (a > b ? -1 : 1));
    const lastStudyDate = sorted.length > 0 ? formatDisplayDate(sorted[0]) : null;

    return NextResponse.json({ currentStreak, totalDays, lastStudyDate });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
