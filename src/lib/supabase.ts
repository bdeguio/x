//to become supabase-server.ts

import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient(isServer: boolean = false) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = isServer
    ? process.env.SUPABASE_SERVICE_ROLE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Key is missing!');
  }

  return createClient(supabaseUrl, supabaseKey);
}


// TEMP: Simplified Supabase setup using direct createClient.
// This bypasses SSR cookie/session integration for ease of use.
// To restore full SSR + Clerk auth integration, reintroduce supabase-server.ts
// and use @supabase/ssr@0.6.1 with { request, response } signature.

