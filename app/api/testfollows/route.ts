// src/app/api/follows/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseService} from '@/lib/supabase';


export async function POST(req: NextRequest) {
  const supabase = supabaseService();
  const body = await req.json();
  const { user_id, followed_short_id } = body;

  if (!user_id || !followed_short_id) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const { error } = await supabase
    .from('followed_profiles')
    .insert({
      user_id,
      followed_short_id: followed_short_id.toUpperCase(),
    });

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
