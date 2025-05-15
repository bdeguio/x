'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { createSupabaseClient } from '@/lib/supabase';

type Props = {
  onClose: () => void;
};

export default function FollowedProfilesList({ onClose }: Props) {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const [myShortId, setMyShortId] = useState<string | null>(null);
  const [followedShortIds, setFollowedShortIds] = useState<string[]>([]);
  const supabase = createSupabaseClient();

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const fetchData = async () => {
      // Get own short ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('short_id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) console.error('Profile error:', profileError);
      else setMyShortId(profile?.short_id || null);

      // Get followed profiles
      const { data: follows, error: followsError } = await supabase
        .from('followed_profiles')
        .select('followed_short_id')
        .eq('user_id', user.id);

      if (followsError) console.error('Follows error:', followsError);
      else setFollowedShortIds(follows.map(f => f.followed_short_id));
    };

    fetchData();

    // Optimistic update support
    const handleNewFollow = (e: CustomEvent<string>) => {
      const newId = e.detail;
      setFollowedShortIds((prev) => (
        prev.includes(newId) ? prev : [...prev, newId]
      ));
    };

    window.addEventListener('follow:new', handleNewFollow as EventListener);
    return () => window.removeEventListener('follow:new', handleNewFollow as EventListener);
  }, [isSignedIn, user?.id, supabase]);

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
