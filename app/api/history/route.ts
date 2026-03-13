// app/api/history/route.ts
// GET /api/history — Returns sorted study history from dates sent by client.

import { NextRequest, NextResponse } from "next/server";
import { formatDisplayDate } from "@/lib/streakLogic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const datesParam = searchParams.get("dates");

    const dates: string[] = datesParam
      ? datesParam.split(",").filter(Boolean)
      : [];

    const history = [...dates]
      .sort((a, b) => (a > b ? -1 : 1))
      .map((dateStr) => ({
        raw: dateStr,
        display: formatDisplayDate(dateStr),
      }));

    return NextResponse.json({ history });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
