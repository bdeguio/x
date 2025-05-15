import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/lib/supabase';

const supabase = createSupabaseClient(true);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, followed_short_id } = req.body;

  if (!user_id || !followed_short_id) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const { error } = await supabase
    .from('followed_profiles')
    .insert({ user_id, followed_short_id: followed_short_id.toUpperCase() });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Insert failed' });
  }

  return res.status(200).json({ success: true });
}
