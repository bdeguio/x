import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export const createSupabaseServerClient = async () => {
  const { getToken, userId } = await auth(); // ← ✅ await the Promise

  if (!userId) {
    throw new Error("User not authenticated.");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${await getToken()}`, // ← Clerk session token
        },
      },
    }
  );

  return supabase;
};
