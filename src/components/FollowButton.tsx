'use client';

import { useState, useEffect } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

interface FollowButtonProps {
  followedShortId: string;
}

export default function FollowButton({ followedShortId }: FollowButtonProps) {
  const { user } = useUser();
  const supabase = createSupabaseClient();

  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollow = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('followed_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('followed_short_id', followedShortId)
        .maybeSingle();

      if (error) console.error(error);
      setIsFollowing(!!data);
      setLoading(false);
    };

    checkFollow();
  }, [user?.id, followedShortId]);

  const handleClick = async () => {
    if (!user?.id) return;
    setLoading(true);

    if (isFollowing) {
      const { error } = await supabase
        .from('followed_profiles')
        .delete()
        .eq('user_id', user.id)
        .eq('followed_short_id', followedShortId);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from('followed_profiles').insert({
        user_id: user.id,
        followed_short_id: followedShortId,
      });
      if (error) console.error(error);
    }

    setIsFollowing(!isFollowing);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 shadow-sm border border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
    >
      {loading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
