'use client';

import { useEffect, useState } from 'react';
import RefreshHoldingsButton from './RefreshHoldingsButton';
import PlaidLinkButton from './PlaidLinkButton';
import clsx from 'clsx';
import { useUser } from '@clerk/nextjs';

type Props = {
  isOpen: boolean;
  onRefresh: () => Promise<void>;
};

export default function Sidebar({ isOpen, onRefresh }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) return;

    const loadUserId = async () => {
      try {
        const res = await fetch('/api/userid');
        const data = await res.json();
        setUserId(data?.id || 'XXXXXX');
      } catch (err) {
        console.error('Failed to load user ID:', err);
      }
    };

    loadUserId();
  }, [isSignedIn]);

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-full w-64 p-4 shadow-md border-r transform transition-transform duration-300 z-40',
        'bg-white text-black dark:bg-neutral-900 dark:text-white',
        {
          '-translate-x-full': !isOpen,
          'translate-x-0': isOpen,
        }
      )}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Center zone with follows + ID */}
        <div className="flex flex-col items-center justify-center flex-grow">
          {/* Follows list growing upward */}
          <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 mb-4">
            <div className="text-sm text-gray-500">XXXXXX</div>
            <div className="text-sm text-gray-500">XXXXXX</div>
            <div className="text-sm text-gray-500">XXXXXX</div>
          </div>

          {/* Anchored User ID with borders */}
          <div className="w-full border-t border-b border-gray-300 py-3 text-center text-sm font-medium">
            ID: {userId}
          </div>
        </div>

        {/* Bottom buttons */}
        <div>
          <PlaidLinkButton />
          <div className="mt-4">
            <RefreshHoldingsButton onRefresh={onRefresh} />
          </div>
        </div>
      </div>
    </aside>
  );
}
