'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { createSupabaseClient } from '@/lib/supabase';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Props = {
  onClose: () => void;
};

export default function FollowedProfilesList({ onClose }: Props) {
  const { user, isSignedIn } = useUser();
  const [followedShortIds, setFollowedShortIds] = useState<string[]>([]);
  const [myShortId, setMyShortId] = useState<string | null>(null);
  const supabase = createSupabaseClient();
  const pathname = usePathname();

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

  // Handle optimistic update when a new follow happens
  useEffect(() => {
    const handleNewFollow = (e: CustomEvent<string>) => {
      const newId = e.detail;
      setFollowedShortIds((prev) => {
        if (prev.includes(newId)) return prev;
        return [...prev, newId];
      });
    };

    window.addEventListener('follow:new', handleNewFollow as EventListener);

    return () => {
      window.removeEventListener('follow:new', handleNewFollow as EventListener);
    };
  }, []);

  return (
    <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 mb-4">
      {followedShortIds.map((id) => {
        const href = id === myShortId ? '/holdings' : `/u/${id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={id}
            href={href}
            onClick={onClose}
            className={clsx(
              'text-sm transition-colors',
              isActive
                ? 'text-purple-600 font-semibold'
                : 'text-gray-500 hover:text-purple-500'
            )}
          >
            {id}
          </Link>
        );
      })}

    </div>
  );
}
