'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import clsx from 'clsx';
import InputBar from '@/components/InputBar';

export default function UniversalBar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [myShortId, setMyShortId] = useState<string | null>(null);

  const showBar = pathname === '/holdings' || pathname?.startsWith('/u/');

  useEffect(() => {
    const fetchMyId = async () => {
      try {
        const res = await fetch('/api/userid');
        const data = await res.json();
        if (data?.short_id) setMyShortId(data.short_id);
      } catch (err) {
        console.error("Error fetching my short_id:", err);
      }
    };
    fetchMyId();
  }, []);

  const handleRefresh = async () => {
    console.log('Refresh triggered');
  };

  const handleCloseSidebar = () => setSidebarOpen(false);

  if (!showBar) return <>{children}</>;

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onRefresh={handleRefresh} onClose={handleCloseSidebar} />

      <div
        className={clsx(
          'transition-transform duration-300 min-h-screen flex flex-col',
          sidebarOpen ? 'translate-x-64' : ''
        )}
      >
        <div className="flex-grow pt-6 pb-28 px-4">{children}</div>

        <InputBar
          myShortId={myShortId}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      </div>
    </>
  );
}

