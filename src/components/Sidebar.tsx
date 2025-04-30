'use client';

import { useEffect, useState } from 'react';
import RefreshHoldingsButton from './RefreshHoldingsButton';
import PlaidLinkButton from './PlaidLinkButton';
import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  onRefresh: () => Promise<void>;
};

export default function Sidebar({ isOpen, onRefresh }: Props) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserId() {
      const res = await fetch('/api/userid');
      const data = await res.json();
      setUserId(data?.id || 'XXXXXX');
    }
    loadUserId();
  }, []);

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-full w-64 bg-black p-4 shadow-md border-r transform transition-transform duration-300 z-40',
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
