'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';

export default function InputBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentShortId = (params?.short_id as string)?.toUpperCase() || null;
  const [inputId, setInputId] = useState('');

  // Autofill if you're on /u/[short_id]
  useEffect(() => {
    if (typeof pathname === 'string' && pathname.startsWith('/u/') && currentShortId) {
      setInputId(currentShortId);
    }
  }, [pathname, currentShortId]);

  const handleSubmit = () => {
    const trimmed = inputId.trim().toUpperCase();
    if (!trimmed) return;

    router.push(`/u/${trimmed}`);
  };

  return (
    <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2">
      <input
        type="text"
        placeholder="View ID..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        value={inputId}
        onChange={(e) => setInputId(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        className="text-purple-300 dark:text-purple-300 font-medium text-sm hover:underline"
      >
        View
      </button>
    </div>
  );
}
