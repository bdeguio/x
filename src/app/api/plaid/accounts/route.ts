import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";


export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from('connected_accounts') // ✅ Correct table
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error("❌ Failed to fetch connected_accounts:", error);
      return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
    }

    return NextResponse.json({ accounts: data }); // ✅ Matches frontend expectations
  } catch (err) {
    console.error("❌ Error fetching accounts:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
