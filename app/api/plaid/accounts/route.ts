import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient(); // ✅ Await it

    const { data, error } = await supabase
      .from('connected_accounts')
      .select('*'); // ✅ RLS will ensure user only sees their own

    if (error) {
      console.error("❌ Failed to fetch connected_accounts:", error);
      return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
    }

    return NextResponse.json({ accounts: data });
  } catch (err) {
    console.error("❌ Error fetching accounts:", err);
    return NextResponse.json({ error: "Unauthorized or server error" }, { status: 401 });
  }
}
