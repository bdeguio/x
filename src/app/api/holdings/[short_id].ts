import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/lib/supabase'; // adjust if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { short_id } = req.query;

  if (!short_id || typeof short_id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid short_id' });
  }

  const supabase = createSupabaseClient();

  // Step 1: Get user_id from profiles table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('short_id', short_id)
    .single();

  if (profileError || !profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Step 2: Get holdings for that user_id
  const { data: holdings, error: holdingsError } = await supabase
    .from('holdings')
    .select('ticker_symbol, company_name') // adjust columns if needed
    .eq('user_id', profile.id);

  if (holdingsError) {
    return res.status(500).json({ error: 'Failed to fetch holdings' });
  }

  res.status(200).json(holdings);
}
