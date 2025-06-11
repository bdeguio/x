import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient(); // ✅ await it
    const { account_id } = await req.json();

    if (!account_id) {
      return NextResponse.json({ error: "Missing account_id" }, { status: 400 });
    }

    // 🔍 Step 1: Look up access_token — RLS ensures user only sees their own
    const { data: accountRow, error: lookupError } = await supabase
      .from("connected_accounts")
      .select("access_token")
      .eq("account_id", account_id)
      .single();

    if (lookupError || !accountRow?.access_token) {
      console.error("⚠️ Access token not found for account:", account_id);
    }

    const access_token = accountRow?.access_token;

    // 🧹 Step 2: Delete holdings for this account
    const { error: holdingsError } = await supabase
      .from("holdings")
      .delete()
      .eq("account_id", account_id);

    if (holdingsError) {
      console.error("❌ Failed to delete holdings:", holdingsError);
    }

    // 🔐 Step 3: Delete plaid_token if access token found
    if (access_token) {
      const { error: tokenError } = await supabase
        .from("plaid_tokens")
        .delete()
        .eq("access_token", access_token);

      if (tokenError) {
        console.error("❌ Failed to delete token:", tokenError);
      }
    }

    // ❌ Step 4: Delete from connected_accounts
    const { error: accountDeleteError } = await supabase
      .from("connected_accounts")
      .delete()
      .eq("account_id", account_id);

    if (accountDeleteError) {
      console.error("❌ Failed to delete connected account:", accountDeleteError);
      return NextResponse.json({ error: "Failed to remove connected account" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Error in remove-account handler:", err.message);
    } else {
      console.error("❌ Unknown error in remove-account handler:", err);
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
