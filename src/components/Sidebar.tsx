'use client';

import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: Props) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserId() {
      const res = await fetch('/api/userid'); // You'll create this API route
      const data = await res.json();
      setUserId(data?.id || 'XXXXXX');
    }
    loadUserId();
  }, []);

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-gray-100 h-full p-4 shadow-md border-r">
      <div className="text-center text-lg font-semibold mb-4">
        ID: {userId}
      </div>
      {/* Future: Add links or social feed here */}
    </aside>
  );
}
