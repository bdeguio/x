import { getAuth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { nanoid } from 'nanoid';

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('short_id')
    .eq('id', userId)
    .single();

  if (!profile && error?.code === 'PGRST116') {
    const short_id = nanoid(6).toUpperCase();
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId, short_id })
      .select('short_id')
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ id: newProfile.short_id });
  }

  if (!profile || error) {
    return NextResponse.json({ error: 'Could not load profile' }, { status: 500 });
  }

  return NextResponse.json({ id: profile.short_id });
}
