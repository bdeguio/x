'use client';

import { SignOutButton } from '@clerk/nextjs';

export default function CustomSignOutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <button className="text-sm text-red-600 hover:text-red-800 transition">
        Sign Out
      </button>
    </SignOutButton>
  );
}

