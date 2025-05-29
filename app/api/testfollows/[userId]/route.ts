import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  context: unknown
) {
  const { userId } = (context as { params: { userId: string } }).params;

  const supabase = createSupabaseClient(true);
  const { searchParams } = new URL(req.url);
  const short_id = searchParams.get('short_id');

  if (!userId || !short_id) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('followed_profiles')
    .select('followed_short_id')
    .eq('user_id', userId)
    .eq('followed_short_id', short_id.toUpperCase())
    .maybeSingle();

  if (error) {
    console.error('Follow fetch error:', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  return NextResponse.json({ isFollowing: !!data });
}
