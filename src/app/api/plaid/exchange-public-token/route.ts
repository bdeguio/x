import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { plaidClient } from "@/lib/plaid";
import { createSupabaseClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");

    const { public_token, institution_name } = await req.json();

    const tokenResponse = await plaidClient.itemPublicTokenExchange({ public_token });

    const access_token = tokenResponse.data.access_token;
    const item_id = tokenResponse.data.item_id;

    console.log("✅ Access Token:", access_token);
    console.log("✅ Item ID:", item_id);

    // 2️⃣ Save Access Token and Institution Info into Supabase
    const { error } = await supabase.from('plaid_tokens').insert([
      {
        user_id: userId,
        access_token,
        item_id,
        institution_name,
      }
    ]);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("❌ Exchange Token Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
