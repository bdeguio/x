import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/lib/supabase';

const supabase = createSupabaseClient(true);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const { short_id } = req.query;

  if (!userId || !short_id || typeof short_id !== 'string') {
    return res.status(400).json({ error: 'Missing data' });
  }

  const { data, error } = await supabase
    .from('followed_profiles')
    .select('followed_short_id') // ✅ correct column
    .eq('user_id', userId)
    .eq('followed_short_id', short_id.toUpperCase())
    .maybeSingle();

  if (error) {
  console.error('Follow insert error:', error); // 👈 this will surface in Vercel logs
  return res.status(500).json({ error: 'Insert failed' });
  }

  return res.status(200).json({ isFollowing: !!data });
}
