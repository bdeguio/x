import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { nanoid } from 'nanoid';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    // 🔍 Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // 🔍 Try to fetch existing profile
    const { data: profile, error: profileError } = await supabase
      .from('profile')
      .select('short_id')
      .eq('id', user.id)
      .single();

    if (profile) {
      return NextResponse.json({ id: profile.short_id });
    }

    if (profileError && profileError.code !== 'PGRST116') {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    // 🔨 Create profile if not found
    const short_id = nanoid(6).toUpperCase();
    const { data: newProfile, error: insertError } = await supabase
      .from('profile')
      .insert({ id: user.id, short_id })
      .select('short_id')
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ id: newProfile.short_id });

  } catch (err) {
    console.error("❌ Profile GET error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
