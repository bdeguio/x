import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { supabaseService} from '@/lib/supabase';


export async function GET(req: NextRequest) {
  const supabase = supabaseService();

  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("holdings")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Supabase fetch error" }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = supabaseService();

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newHolding = await req.json();

  const { error } = await supabase.from("holdings").insert([
    {
      user_id: userId,
      ticker: newHolding.ticker,
    },
  ]);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
