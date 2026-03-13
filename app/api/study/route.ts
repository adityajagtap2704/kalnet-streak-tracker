// app/api/study/route.ts
// POST /api/study
// Receives the full dates array from client, checks for duplicates,
// validates the date, and returns updated streak + confirmation.
// Storage lives in browser localStorage; all business logic runs server-side.

import { NextRequest, NextResponse } from "next/server";
import { calculateStreak, formatDisplayDate, getTodayDate } from "@/lib/streakLogic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dates }: { dates: string[] } = body;

    // Validate input
    if (!Array.isArray(dates)) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const today = getTodayDate();

    // Business Rule 1: Prevent duplicate entries for the same day
    if (dates.includes(today)) {
      return NextResponse.json(
        { success: false, message: "You have already marked today." },
        { status: 409 }
      );
    }

    // Add today and recalculate everything server-side
    const updatedDates = [...dates, today];
    const currentStreak = calculateStreak(updatedDates);
    const totalDays = updatedDates.length;
    const sorted = [...updatedDates].sort((a, b) => (a > b ? -1 : 1));
    const lastStudyDate = formatDisplayDate(sorted[0]);

    return NextResponse.json(
      {
        success: true,
        message: "Study session recorded!",
        date: today,
        updatedDates,
        currentStreak,
        totalDays,
        lastStudyDate,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
