'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { createSupabaseClient } from '@/lib/supabase';

export default function FollowedProfilesList() {
  const { user, isSignedIn } = useUser();
  const [followedShortIds, setFollowedShortIds] = useState<string[]>([]);
  const [myShortId, setMyShortId] = useState<string | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const loadData = async () => {
      // Get your own short ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('short_id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) console.error('Error loading profile:', profileError);
      else setMyShortId(profile?.short_id || null);

      // Get followed profiles
      const { data: follows, error: followsError } = await supabase
        .from('followed_profiles')
        .select('followed_short_id')
        .eq('user_id', user.id);

      if (followsError) console.error('Error loading follows:', followsError);
      else setFollowedShortIds(follows.map(f => f.followed_short_id));
    };

    loadData();
  }, [isSignedIn, user?.id, supabase]);

  return (
    <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 mb-4">
      {followedShortIds.length === 0 ? (
        <div className="text-sm text-gray-500">No follows yet</div>
      ) : (
        followedShortIds.map((id) => {
          const href = id === myShortId ? '/holdings' : `/u/${id}`;
          return (
            <Link key={id} href={href} className="text-sm text-blue-500 hover:underline">
              {id}
            </Link>
          );
        })
      )}
    </div>
  );
}
