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
      <div className="text-center text-lg font-semibold mt-4 mb-6">
        ID: {userId}
      </div>

      <PlaidLinkButton />
      <div className="mt-4">
        <RefreshHoldingsButton onRefresh={onRefresh} />
      </div>
    </aside>
  );
}
