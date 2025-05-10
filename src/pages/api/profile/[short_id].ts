import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/lib/supabase';

const supabase = createSupabaseClient(true); // server-side access

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { short_id } = req.query;

  if (!short_id || typeof short_id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid short_id' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('short_id', short_id.toUpperCase())
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  return res.status(200).json({ ok: true });
}
