import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

import { type Metadata } from 'next';
import ClientLayout from './ClientLayout'; // 👈 move logic here

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arena',
  description: 'Track and compare your financial holdings.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" style={{ backgroundColor: 'var(--background)' }}>
        <body className={inter.className}>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
