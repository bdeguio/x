'use client';

import { Menu } from 'lucide-react';

export default function SidebarToggle() {
  return (
    <button
      className="p-2 rounded-full hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
      onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
    >
      <Menu size={18} />
    </button>
  );
}
