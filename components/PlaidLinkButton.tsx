'use client';

import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { toast } from 'react-hot-toast';

export default function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const res = await fetch('/api/plaid/create-link-token', { method: 'POST' });
        const data = await res.json();
        setLinkToken(data.link_token);
      } catch (err) {
        console.error('❌ Failed to create link token', err);
        toast.error('Could not initialize Plaid link');
      }
    };
    createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (public_token) => {
      try {
        const exchangeRes = await fetch('/api/plaid/exchange-public-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        });

        const exchangeData = await exchangeRes.json();
        if (!exchangeRes.ok) throw new Error(exchangeData?.error || 'Token exchange failed');

        toast.success('Holdings loaded successfully!');
        window.dispatchEvent(new CustomEvent('plaid:sync'));
      } catch (err) {
        console.error('❌ Plaid sync error:', err);
        toast.error(err instanceof Error ? err.message : 'Failed to sync account');
      }
    },
  });

  return (
    <div className="mt-6">
      <button
        onClick={() => open()}
        disabled={!ready}
        className="px-5 py-3 bg-purple-600 text-white text-sm font-medium rounded-2xl hover:bg-purple-700 transition disabled:opacity-50"
        aria-label="Connect your bank account to load holdings"
      >
        Connect Account ✨
      </button>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Securely connect your account to view your holdings.
      </p>
    </div>
  );
}
