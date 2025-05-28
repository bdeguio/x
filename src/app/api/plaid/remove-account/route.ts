import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { account_id } = await req.json();
    if (!account_id) {
      return NextResponse.json({ error: "Missing account_id" }, { status: 400 });
    }

    // 🔍 Step 1: Look up access_token for this account
    const { data: accountRow, error: lookupError } = await supabase
      .from("connected_accounts")
      .select("access_token")
      .eq("account_id", account_id)
      .eq("user_id", userId)
      .single();

    if (lookupError || !accountRow?.access_token) {
      console.error("⚠️ Access token not found for account:", account_id);
    }

    const access_token = accountRow?.access_token;

    // 🧹 Step 2: Delete holdings tied to this account
    const { error: holdingsError } = await supabase
      .from("holdings")
      .delete()
      .eq("account_id", account_id)
      .eq("user_id", userId);

    if (holdingsError) {
      console.error("❌ Failed to delete holdings:", holdingsError);
    }

    // 🔐 Step 3: Delete access token if available
    if (access_token) {
      const { error: tokenError } = await supabase
        .from("plaid_tokens")
        .delete()
        .eq("access_token", access_token)
        .eq("user_id", userId);

      if (tokenError) {
        console.error("❌ Failed to delete token:", tokenError);
      }
    }

    // ❌ Step 4: Delete from connected_accounts
    const { error: accountDeleteError } = await supabase
      .from("connected_accounts")
      .delete()
      .eq("account_id", account_id)
      .eq("user_id", userId);

    if (accountDeleteError) {
      console.error("❌ Failed to delete connected account:", accountDeleteError);
      return NextResponse.json({ error: "Failed to remove connected account" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("❌ Error in remove-account handler:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
