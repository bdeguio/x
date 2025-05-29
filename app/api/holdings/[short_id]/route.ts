import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  context: { params: any } // ✅ Vercel-safe
) {
  const { short_id } = context.params as { short_id: string };

  const supabase = createSupabaseClient(true);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("short_id", short_id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { data: holdings, error } = await supabase
    .from("holdings")
    .select("ticker, name, value")
    .eq("user_id", profile.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ holdings });
}
