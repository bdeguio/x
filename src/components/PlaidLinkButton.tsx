'use client';

import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { toast } from 'react-hot-toast';

export default function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    async function createLinkToken() {
      try {
        const res = await fetch('/api/plaid/create-link-token', { method: 'POST' });
        const data = await res.json();
        setLinkToken(data.link_token);
      } catch (err) {
        console.error("❌ Failed to create link token", err);
        toast.error("Could not initialize Plaid link");
      }
    }

    createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (public_token) => {
      try {
        console.log('✅ Plaid link success');

        // Step 1: Exchange public_token for access_token
        const exchangeRes = await fetch('/api/plaid/exchange-public-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        });

        const exchangeData = await exchangeRes.json();
        console.log("✅ Exchange response:", exchangeData);
        if (!exchangeRes.ok) throw new Error(exchangeData.error || 'Token exchange failed');

        // Step 2: Trigger holdings sync
        const holdingsRes = await fetch('/api/plaid/holdings', { method: 'POST' });
        const holdingsData = await holdingsRes.json();
        console.log("✅ Holdings sync response:", holdingsData);
        if (!holdingsRes.ok) throw new Error(holdingsData.error || 'Holdings fetch failed');

        toast.success("Holdings loaded successfully!");
      } catch (err: any) {
        console.error("❌ Plaid sync error", err);
        toast.error(err.message || "Failed to sync account");
      }
    }
  });

  if (!ready) {
    return (
      <div className="flex justify-left mt-4">
        <div className="h-10 w-40 bg-gray-300 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="text-sm text-purple-500 hover:text-gray-400 transition-colors duration-150 disabled:opacity-50"
    >
      Load Holdings ✨
    </button>
  );
}
