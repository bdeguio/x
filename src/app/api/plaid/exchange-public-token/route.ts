import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { plaidClient, CountryCode } from "@/lib/plaid";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { public_token } = await req.json();

    const tokenResponse = await plaidClient.itemPublicTokenExchange({ public_token });
    const access_token = tokenResponse.data.access_token;
    const item_id = tokenResponse.data.item_id;

    console.log("✅ Access Token:", access_token);
    console.log("✅ Item ID:", item_id);

    // 🔍 Step 1: Get institution_id from Plaid
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

    // 1️⃣ Save access token to plaid_tokens table
    const { error: tokenError } = await supabase.from("plaid_tokens").insert([
      {
        user_id: userId,
        access_token,
        item_id,
        institution_name,
      },
    ]);

    if (tokenError) {
      console.error("❌ Supabase Token Insert Error:", tokenError);
      return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
    }

    // 2️⃣ Fetch accounts from Plaid
    const accountsResponse = await plaidClient.accountsGet({ access_token });
    const accounts = accountsResponse.data.accounts;

    // 3️⃣ Insert into connected_accounts
    const inserts = accounts.map((acct) => ({
      user_id: userId,
      account_id: acct.account_id,
      account_name: acct.name,
      institution_name,
      mask: acct.mask || null,
      access_token,
    }));

    const { error: insertError } = await supabase.from("connected_accounts").insert(inserts);
    if (insertError) {
      console.error("❌ Connected Accounts Insert Error:", insertError);
      return NextResponse.json({ error: "Failed to save connected accounts" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Exchange Token Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
