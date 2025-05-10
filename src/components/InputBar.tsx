'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function InputBar() {
  const router = useRouter();
  const pathname = usePathname()!;
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputId, setInputId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Show bar only on /holdings or /u/[id] pages
  const isVisible =
    pathname === '/holdings' || pathname.startsWith('/u/');

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
  }, [isVisible]);

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
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[95%] max-w-2xl px-4 py-3 rounded-b-2xl bg-white dark:bg-zinc-900 shadow-md border-b border-gray-200 dark:border-zinc-700 z-50">
      <div className="flex items-center gap-2 max-w-2xl mx-auto bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search user ID..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={inputId}
          onChange={(e) => setInputId(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="text-purple-300 dark:text-purple-300 font-medium text-sm hover:underline disabled:opacity-50"
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </div>
    </div>
  );
}
