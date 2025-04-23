import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

type Holding = {
  symbol: string;
  ticker: string;
  percent: number;
};

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new NextResponse(null, { status: 401 });
  }

  const { data } = await supabase
    .from("holdings")
    .select("ticker")
    .eq("user_id", userId);

  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new NextResponse(null, { status: 401 });
  }

  const newHolding = await req.json();

  await supabase.from("holdings").insert([
    {
      user_id: userId,
      ticker: newHolding.ticker,
    },
  ]);

  return new NextResponse(null, { status: 200 });
}
