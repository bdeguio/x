import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = await req.json();
    const { followed_short_id } = body;

    if (!followed_short_id) {
      return NextResponse.json({ error: 'Missing short_id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('followed_profiles')
      .insert({
        followed_short_id: followed_short_id.toUpperCase(), // ✅ normalized
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in follows POST:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
