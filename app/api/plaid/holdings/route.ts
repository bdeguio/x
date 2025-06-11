import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient(); // ✅ await it

    // ✅ Use RLS to limit access to the user's token
    const { data: tokenRow, error: tokenError } = await supabase
      .from("plaid_tokens")
      .select("access_token")
      .single();

    if (tokenError || !tokenRow) {
      console.error("❌ No access token found for user");
      return NextResponse.json({ error: "No Plaid connection found" }, { status: 400 });
    }

    const access_token = tokenRow.access_token;
    console.log("✅ Access token retrieved");

    // 📊 Fetch investment holdings
    const holdingsResponse = await plaidClient.investmentsHoldingsGet({ access_token });
    const holdings = holdingsResponse.data.holdings;
    const securities = holdingsResponse.data.securities;

    console.log("✅ Holdings count:", holdings.length);
    console.log("✅ Securities count:", securities.length);

    const securityIdToInfo: Record<string, { ticker: string; name: string; type: string; cusip: string }> = {};
    securities.forEach((s) => {
      if (s.security_id) {
        securityIdToInfo[s.security_id] = {
          ticker: s.ticker_symbol || "UNKNOWN",
          name: s.name || "UNKNOWN",
          type: s.type || "UNKNOWN",
          cusip: s.cusip || "UNKNOWN",
        };
      }
    });

    // 🧼 Clear previous holdings for this user
    const { error: deleteError } = await supabase.from("holdings").delete();
    if (deleteError) {
      console.error("❌ Error clearing previous holdings:", deleteError.message);
      return NextResponse.json({ error: "Failed to clear holdings" }, { status: 500 });
    }

    // 💾 Insert new holdings
    const holdingInserts = holdings.map((h) => {
      const sec = securityIdToInfo[h.security_id] || {
        ticker: "UNKNOWN",
