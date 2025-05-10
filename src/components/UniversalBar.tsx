'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createSupabaseClient } from '@/lib/supabase';
import Sidebar from './Sidebar';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

export default function UniversalBar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputId, setInputId] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [myShortId, setMyShortId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const showBar = pathname === '/holdings' || pathname?.startsWith('/u/');
  const currentShortId = pathname?.startsWith('/u/') ? pathname.split('/u/')[1]?.toUpperCase() : null;

  useEffect(() => {
    if (showBar) inputRef.current?.focus();
  }, [showBar]);

  useEffect(() => {
    const fetchMyId = async () => {
      try {
        const res = await fetch('/api/userid');
        const data = await res.json();
        setMyShortId(data?.short_id || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyId();
  }, []);

  useEffect(() => {
    if (currentShortId) {
      setInputId(currentShortId);
    }
  }, [currentShortId]);

  useEffect(() => {
    const checkFollow = async () => {
      if (!user?.id || !currentShortId) return;
      const supabase = createSupabaseClient();

      const { data, error } = await supabase
        .from('followed_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('followed_short_id', currentShortId)
        .maybeSingle();

      if (error) console.error(error);
      setIsFollowing(!!data);
    };

    checkFollow();
  }, [user?.id, currentShortId]);

  const handleSubmit = async () => {
    const trimmed = inputId.trim().toUpperCase();
    if (!trimmed) return;

    try {
      const res = await fetch(`/api/profile/${trimmed}`);
      if (res.ok) {
        toast.success('Profile found!');
        router.push(`/u/${trimmed}`);
      } else {
        toast.error('Profile not found.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
      console.error(err);
    }
  };

  const handleFollowClick = async () => {
    if (!user?.id || !currentShortId) return;
    setFollowLoading(true);
    const supabase = createSupabaseClient();

    if (isFollowing) {
      const { error } = await supabase
        .from('followed_profiles')
        .delete()
        .eq('user_id', user.id)
        .eq('followed_short_id', currentShortId);
      if (error) console.error(error);
      toast.success('Unfollowed');
    } else {
      const { error } = await supabase.from('followed_profiles').insert({
        user_id: user.id,
        followed_short_id: currentShortId,
      });
      if (error) console.error(error);
      toast.success('Followed');
    }

    setIsFollowing(!isFollowing);
    setFollowLoading(false);
  };

  const handleRefresh = async () => {
    console.log('Refresh triggered');
  };

  const handleCloseSidebar = () => setSidebarOpen(false);

  if (!showBar) return <>{children}</>;
  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onRefresh={handleRefresh}
        onClose={handleCloseSidebar}
      />

      <div
        className={clsx(
          'transition-transform duration-300 min-h-screen flex flex-col',
          sidebarOpen ? 'translate-x-64' : ''
        )}
      >
        {/* Page Content */}
        <div className="flex-grow pt-6 pb-28 px-4">{children}</div>

        {/* Sticky Input Bar */}
        <div className="sticky bottom-0 w-full z-50 px-2 sm:px-4 bg-transparent">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 rounded-t-2xl bg-white dark:bg-zinc-900 shadow-md border-t border-gray-200 dark:border-zinc-700">
            <div className="flex flex-col gap-2 bg-gray-100 dark:bg-zinc-800 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              {/* Search row */}
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="text"
                  placeholder="Search user ID..."
                  className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  onClick={handleSubmit}
                  className="text-purple-600 dark:text-purple-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-zinc-600"
                >
                  Search
                </button>
              </div>

              {/* Action row */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 shadow-sm border border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600"
                >
                  ☰
                </button>

                {pathname?.startsWith('/u/') &&
                  currentShortId &&
                  currentShortId !== myShortId && (
                    <button
                      onClick={handleFollowClick}
                      disabled={followLoading}
                      className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 shadow-sm border border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
                    >
                      {followLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
