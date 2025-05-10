'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';
import FollowButton from './Follow/FollowButton';

type Props = {
  myShortId?: string | null;
  onToggleSidebar?: () => void;
};

export default function InputBar({ myShortId, onToggleSidebar }: Props) {
  const router = useRouter();
  const pathname = usePathname()!;
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputId, setInputId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isVisible = pathname === '/holdings' || pathname.startsWith('/u/');
  const currentShortId = pathname?.startsWith('/u/') ? pathname.split('/u/')[1]?.toUpperCase() : null;
  const isOwnProfile = currentShortId === myShortId;

  useEffect(() => {
    if (!isVisible) return;
    inputRef.current?.focus();
    if (currentShortId && inputId !== currentShortId) {
      setInputId(currentShortId);
    }
  }, [isVisible, currentShortId]);

  const handleSubmit = async () => {
    const trimmed = inputId.trim().toUpperCase();
    if (!trimmed) return;
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="sticky bottom-0 w-full z-50 px-2 sm:px-4 bg-transparent">
      <div className="mx-auto w-full max-w-2xl px-4 py-3 rounded-t-2xl bg-white dark:bg-zinc-900 shadow-md border-t border-gray-200 dark:border-zinc-700">
        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-zinc-800 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search user ID..."
              className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={inputId}
              onChange={(e) => setInputId(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="text-purple-600 dark:text-purple-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-zinc-600"
            >
              {isLoading ? '...' : 'Search'}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onToggleSidebar}
              className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 shadow-sm border border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600"
            >
              ☰
            </button>

            {!isOwnProfile && currentShortId && (
              <FollowButton followedShortId={currentShortId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
