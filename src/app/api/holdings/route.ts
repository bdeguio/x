import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// In-memory store (resets on every restart)
const userHoldingsMap = new Map<string, any[]>();

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    console.log("🔐 userId:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Seed mock data if it's the first time
    if (!userHoldingsMap.has(userId)) {
      userHoldingsMap.set(userId, [
        { symbol: "Tesla Inc.", ticker: "TSLA", percent: 45 },
        { symbol: "Apple Inc.", ticker: "AAPL", percent: 35 },
        { symbol: "Amazon", ticker: "AMZN", percent: 20 },
      ]);
    }

    const holdings = userHoldingsMap.get(userId) || [];
    console.log("📊 Returning holdings:", holdings);

    return NextResponse.json(holdings);
  } catch (error: any) {
    console.error("❌ GET /api/holdings error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    console.log("🔐 userId:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newHolding = await req.json();
    console.log("➕ Adding new holding:", newHolding);

    const existing = userHoldingsMap.get(userId) || [];
    userHoldingsMap.set(userId, [...existing, newHolding]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ POST /api/holdings error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
