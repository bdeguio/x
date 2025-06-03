import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { plaidClient, CountryCode } from "@/lib/plaid";
import { supabaseService} from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const supabase = supabaseService();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { public_token } = await req.json();

    const tokenResponse = await plaidClient.itemPublicTokenExchange({ public_token });
    const access_token = tokenResponse.data.access_token;
    const item_id = tokenResponse.data.item_id;

    console.log("✅ Access Token:", access_token);
    console.log("✅ Item ID:", item_id);

    // 🔍 Get institution name
    const itemResponse = await plaidClient.itemGet({ access_token });
    const institutionId = itemResponse.data.item.institution_id;

    let institution_name = "UNKNOWN";
    if (institutionId) {
      try {
        const instResponse = await plaidClient.institutionsGetById({
          institution_id: institutionId,
          country_codes: [CountryCode.Us],
        });
        institution_name = instResponse.data.institution.name;
      } catch (e) {
        console.warn("⚠️ Failed to fetch institution name:", e);
      }
    }

    // 🪪 Insert into plaid_tokens
    const { error: tokenError } = await supabase.from("plaid_tokens").insert([
      { user_id: userId, access_token, item_id, institution_name },
    ]);
    if (tokenError) {
      console.error("❌ Token Insert Error:", tokenError);
      return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
    }

    // 🏦 Insert connected accounts
    const accountsResponse = await plaidClient.accountsGet({ access_token });
    const accounts = accountsResponse.data.accounts;
    const accountInserts = accounts.map((acct) => ({
      user_id: userId,
      account_id: acct.account_id,
      account_name: acct.name,
      institution_name,
      mask: acct.mask || null,
      access_token,
    }));

    const { error: insertError } = await supabase.from("connected_accounts").insert(accountInserts);
    if (insertError) {
      console.error("❌ Connected Accounts Insert Error:", insertError);
      return NextResponse.json({ error: "Failed to save connected accounts" }, { status: 500 });
    }

    // 📈 Fetch holdings and insert into 'holdings'
    const holdingsResponse = await plaidClient.investmentsHoldingsGet({ access_token });
    const holdings = holdingsResponse.data.holdings;
    const securities = holdingsResponse.data.securities;

    const securityMap = Object.fromEntries(
      securities.map((sec) => [sec.security_id, sec])
    );

    const holdingInserts = holdings.map((h) => {
      const sec = securityMap[h.security_id] || {};
      return {
        user_id: userId,
        security_id: h.security_id,
        account_id: h.account_id,
        name: sec.name || null,
        ticker: sec.ticker_symbol || null,
        cusip: sec.cusip || null,
        type: sec.type || null,
        quantity: h.quantity,
        value: h.institution_value,
        iso_currency_code: h.iso_currency_code || null,
      };
    });

    const { error: holdingInsertError } = await supabase
      .from("holdings")
      .insert(holdingInserts);

    if (holdingInsertError) {
      console.error("❌ Holdings Insert Error:", holdingInsertError);
      return NextResponse.json({ error: "Failed to save holdings" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Exchange Token Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
