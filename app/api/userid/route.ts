import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { nanoid } from 'nanoid';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    // 🔍 Try to fetch existing profile
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('short_id')
      .eq('id', user?.id)
      .single();

    // 🔨 If not found, create it
    if (!profile && error?.code === 'PGRST116') {
      const short_id = nanoid(6).toUpperCase();
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({ short_id })
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
  } catch (err) {
    console.error("❌ Profile GET error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
