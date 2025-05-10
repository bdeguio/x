'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createSupabaseClient } from '@/lib/supabase';

export function useFollowStatus(followedShortId: string) {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check follow status on mount
  useEffect(() => {
    if (!user?.id || !followedShortId) return;

    let isMounted = true;
    const fetchStatus = async () => {
      setLoading(true);
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from('followed_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('followed_short_id', followedShortId)
        .maybeSingle();

      if (error) console.error('Follow status error:', error);
      if (isMounted) {
        setIsFollowing(!!data);
        setLoading(false);
      }
    };

    fetchStatus();
    return () => {
      isMounted = false;
    };
  }, [user?.id, followedShortId]);

  // Toggle follow/unfollow
  const toggleFollow = async () => {
    if (!user?.id || !followedShortId) return;
    setLoading(true);
    const supabase = createSupabaseClient();

    if (isFollowing) {
      const { error } = await supabase
        .from('followed_profiles')
        .delete()
        .eq('user_id', user.id)
        .eq('followed_short_id', followedShortId);
      if (error) console.error(error);
      setIsFollowing(false);
    } else {
      const { error } = await supabase.from('followed_profiles').insert({
        user_id: user.id,
        followed_short_id: followedShortId,
      });
      if (error) console.error(error);
      setIsFollowing(true);
    }

    setLoading(false);
  };

  return { isFollowing, loading, toggleFollow, setIsFollowing };
}
