import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const supabase = createSupabaseClient();
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('connected_accounts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }

  return NextResponse.json({ accounts: data });
}
