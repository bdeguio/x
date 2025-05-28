import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { plaidClient } from "@/lib/plaid";
import { createSupabaseClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { data: tokenRow, error: tokenError } = await supabase
      .from("plaid_tokens")
      .select("access_token")
      .eq("user_id", userId)
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

    const securityIdToInfo: Record<string, any> = {};
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

    // 🧼 Clear previous holdings
    await supabase.from("holdings").delete().eq("user_id", userId);

    // 💾 Insert new holdings
    let insertedCount = 0;
    for (const h of holdings) {
      const sec = securityIdToInfo[h.security_id] || {
        ticker: "UNKNOWN",
        name: "UNKNOWN",
        type: "UNKNOWN",
        cusip: "UNKNOWN",
      };

      const row = {
        user_id: userId,
        account_id: h.account_id ?? "UNKNOWN",
        security_id: h.security_id ?? "UNKNOWN",
        name: sec.name,
        ticker: sec.ticker,
        type: sec.type,
        cusip: sec.cusip,
        quantity: h.quantity ?? null,
        value: h.institution_value ?? null,
        iso_currency_code: h.iso_currency_code ?? "UNKNOWN",
      };

      const { error: rowError } = await supabase.from("holdings").insert(row);
      if (!rowError) insertedCount++;
      else console.error("❌ Holding insert error:", rowError.message, row);
    }

    return NextResponse.json({ message: `Inserted ${insertedCount} holdings` });
  } catch (err) {
    console.error("❌ Server error in holdings POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
