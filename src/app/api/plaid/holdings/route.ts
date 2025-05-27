import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { plaidClient } from "@/lib/plaid";
import { createSupabaseClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    // 🔐 Get access token
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

    // 📥 Sync accounts into connected_accounts
    const accountsResponse = await plaidClient.accountsGet({ access_token });
    const accounts = accountsResponse.data.accounts;

    for (const account of accounts) {
      const insertPayload = {
        user_id: userId,
        account_id: account.account_id,
        account_name: account.name,
        institution_name: account.official_name || account.name || "UNKNOWN",
        mask: account.mask || null,
        access_token,
      };

      const { error } = await supabase
        .from("connected_accounts")
        .upsert(insertPayload, { onConflict: 'account_id' });

      if (error) console.error("❌ connected_accounts insert error:", error);
    }

    // 📊 Fetch investment holdings from Plaid
    const holdingsResponse = await plaidClient.investmentsHoldingsGet({ access_token });
    const holdings = holdingsResponse.data.holdings;
    const securities = holdingsResponse.data.securities;

    console.log("✅ Holdings count:", holdings.length);
    console.log("✅ Securities count:", securities.length);

    // 🔁 Map securities info
    const securityIdToInfo: { [id: string]: { ticker: string; name: string; type: string; cusip: string } } = {};
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

    // 🧼 Clear user's previous holdings
    await supabase.from("holdings").delete().eq("user_id", userId);

    // 📤 Build and insert each row
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

      console.log("📦 Attempting to insert:", row);

        const { error: rowError } = await supabase.from("holdings").insert(row);

        if (rowError) {
          console.error("❌ Failed to insert row:", row);
          console.error("⛔ Supabase error:", rowError.message);
        } else {
          insertedCount++;
          console.log("✅ Inserted holding:", row.ticker, "for", row.value);
        }
    }

    return NextResponse.json({ message: `Inserted ${insertedCount} holdings` });
  } catch (err) {
    console.error("❌ Server error in holdings POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
