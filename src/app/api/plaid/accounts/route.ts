import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from('plaid_accounts')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error("Failed to fetch Plaid accounts");
      return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching accounts", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
