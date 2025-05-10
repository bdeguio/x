'use client';

import { usePathname } from 'next/navigation';
import InputBar from './InputBar';

export default function InputBarWrapper() {
  const pathname = usePathname()!;
  const show = pathname === '/holdings' || pathname.startsWith('/u/');

  return show ? <InputBar /> : null;
}
