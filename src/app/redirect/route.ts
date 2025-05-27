import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  console.log("👉 Clerk userId:", userId);

  if (!userId) {
    console.warn("⚠️ No Clerk userId found. Redirecting to /sign-in");
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('short_id')
    .eq('id', userId)
    .single();

  console.log("👉 Supabase short_id lookup:", data, error);

  if (error || !data?.short_id) {
    console.warn("⚠️ No short_id found in profiles. Redirecting to /");
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.redirect(new URL(`/u/${data.short_id}`, req.url));
}
