import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { plaidClient } from "@/lib/plaid";
import { createSupabaseClient } from '@/lib/supabase';

// --- POST: Fetch new holdings from Plaid and store into Supabase ---
export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    // Get access token
    const { data: tokenRow, error: tokenError } = await supabase
      .from("plaid_tokens")
      .select("access_token")
      .eq("user_id", userId)
      .single();

    if (tokenError || !tokenRow) {
      console.error("No access token found for user");
      return NextResponse.json({ error: "No Plaid connection found" }, { status: 400 });
    }

    const access_token = tokenRow.access_token;

    // Fetch holdings from Plaid
    const holdingsResponse = await plaidClient.investmentsHoldingsGet({ access_token });
    const holdings = holdingsResponse.data.holdings;
    const securities = holdingsResponse.data.securities;

    // Build the securityIdToTicker map:
    const securityIdToInfo: { [securityId: string]: { ticker: string; name: string } } = {};
    securities.forEach((security) => {
      if (security.security_id && security.ticker_symbol) {
        securityIdToInfo[security.security_id] = {
          ticker: security.ticker_symbol,
          name: security.name || "Unknown Company",
        };
      }
    });

    // Clear old holdings
    await supabase
      .from("holdings")
      .delete()
      .eq("user_id", userId);

    // Insert new holdings
    const inserts = holdings.map((holding) => ({
      user_id: userId,
      security_id: holding.security_id,
      ticker_symbol: securityIdToInfo[holding.security_id]?.ticker || "UNKNOWN",
      company_name: securityIdToInfo[holding.security_id]?.name || "Unknown Company",
    }));    

    const { error: insertError } = await supabase.from("holdings").insert(inserts);

    if (insertError) {
      console.error("Failed to insert holdings");
      return NextResponse.json({ error: "Failed to store holdings" }, { status: 500 });
    }

    return NextResponse.json({ message: "Holdings updated successfully" });
  } catch (err: unknown) {
    console.error("Error fetching holdings");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// --- GET: Fetch stored holdings from Supabase to display ---
export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from("holdings")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Failed to fetch holdings");
      return NextResponse.json({ error: "Failed to fetch holdings" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("Error fetching holdings");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
