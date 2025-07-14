'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { supabaseClient as supabaseBrowser } from '@/lib/supabase-client';


export default function FollowedProfilesList({ onClose }: { onClose: () => void }) {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname()!;
  const [myShortId, setMyShortId] = useState<string | null>(null);
  const [followedShortIds, setFollowedShortIds] = useState<string[]>([]);
  const supabase = supabaseBrowser;
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const load = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('short_id')
        .eq('id', user.id)
        .maybeSingle();

      setMyShortId(profile?.short_id ?? null);

      const { data: follows } = await supabase
        .from('followed_profiles')
        .select('followed_short_id')
        .eq('user_id', user.id);

      setFollowedShortIds(follows?.map(f => f.followed_short_id) || []);
    };

    load();

    const handleNewFollow = (e: CustomEvent<string>) => {
      const newId = e.detail;
      setFollowedShortIds((prev) =>
        prev.includes(newId) ? prev : [...prev, newId]
      );
    };

    window.addEventListener('follow:new', handleNewFollow as EventListener);
    return () => window.removeEventListener('follow:new', handleNewFollow as EventListener);
  }, [isSignedIn, user?.id, supabase]);

  const handleRemove = async (shortId: string) => {
    if (!user?.id) return;

    await supabase
      .from('followed_profiles')
      .delete()
      .eq('user_id', user.id)
      .eq('followed_short_id', shortId);

    setFollowedShortIds(prev => prev.filter(id => id !== shortId));
  };

  return (
    <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 mb-4 w-full">
      {followedShortIds.map((id) => {
        const href = id === myShortId ? '/holdings' : `/u/${id}`;
        const isActive = pathname === href;
        const isMenuOpen = menuOpenId === id;

        return (
          <div
            key={id}
            className="group relative w-full flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 rounded transition"
          >
            <Link
              href={href}
              onClick={onClose}
              className={clsx(
                'text-sm truncate transition-colors',
                isActive
                  ? 'text-purple-600 font-semibold'
                  : 'text-gray-500 hover:text-purple-500'
              )}
            >
              {id}
            </Link>

            {/* Three dot button, appears on hover */}
            <button
              onClick={() => setMenuOpenId(menuOpenId === id ? null : id)}
              className="invisible group-hover:visible p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              ⋯
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className="absolute right-2 top-8 z-50 w-28 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-md rounded text-sm">
                <button
                  onClick={() => handleRemove(id)}
                  className="w-full px-4 py-2 text-left hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
