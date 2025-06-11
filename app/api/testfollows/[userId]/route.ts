import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(
  req: NextRequest,
) {
  try {
    const supabase = await createSupabaseServerClient();
    const { searchParams } = new URL(req.url);
    const short_id = searchParams.get('short_id');

    if (!short_id) {
      return NextResponse.json({ error: 'Missing short_id' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('followed_profiles')
      .select('followed_short_id')
      .eq('followed_short_id', short_id.toUpperCase())
      .maybeSingle();

    if (error) {
      console.error('Follow fetch error:', error);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    return NextResponse.json({ isFollowing: !!data });
  } catch (err) {
    console.error('Follow check error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
