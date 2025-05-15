import InputBar from '@/components/InputBar';
import SidebarToggle from '@/components/SidebarToggle'; // ✅ correct now
import { useFollowStatus } from '@/components/useFollowStatus'; // ✅ confirm this path
import clsx from 'clsx';

export default function UniversalBar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const { showFollow, handleFollow } = useFollowStatus();

  return (
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-full transition-all duration-300 z-50',
          'px-4 py-3 dark:border-zinc-700',
          sidebarOpen ? 'pl-64' : ''
        )}
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
      <div className="flex items-center gap-2">
        <SidebarToggle />
        <InputBar />
      </div>
    </div>
  );
}
