'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import UniversalBar from '@/components/UniversalBar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSignedIn } = useUser(); // ✅ get sign-in state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setSidebarOpen((prev) => !prev);
    window.addEventListener('toggle-sidebar', toggle);
    return () => window.removeEventListener('toggle-sidebar', toggle);
  }, []);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const hideUniversalBar =
  typeof pathname === 'string' &&
  ['/', '/sign-in', '/sign-up'].includes(pathname);

  return (
    <>
      <Toaster position="top-center" />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      {sidebarOpen && (
        <div
          onClick={handleCloseSidebar}
          className="fixed inset-0 z-30 bg-transparent"
        />
      )}
      <div className="flex flex-col min-h-screen relative z-10">
        <main className="flex-grow overflow-y-auto">{children}</main>
        {isSignedIn && !hideUniversalBar && (
          <UniversalBar sidebarOpen={sidebarOpen} />
        )}
      </div>
    </>
  );
}
