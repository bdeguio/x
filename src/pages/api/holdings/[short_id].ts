import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { short_id } = req.query;

  if (!short_id || typeof short_id !== 'string') {
    return res.status(400).json({ error: 'Invalid short_id' });
  }

  const supabase = createSupabaseClient();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('short_id', short_id)
    .single();

  if (profileError || !profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { data: holdings, error: holdingsError } = await supabase
    .from('holdings')
    .select('ticker_symbol, company_name')
    .eq('user_id', profile.id);

  if (holdingsError) {
    return res.status(500).json({ error: 'Failed to fetch holdings' });
  }

  return res.status(200).json(holdings || []);
}
