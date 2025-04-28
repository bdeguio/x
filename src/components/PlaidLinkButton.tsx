'use client';

import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    async function createLinkToken() {
      const res = await fetch('/api/plaid/create-link-token', { method: 'POST' });
      const data = await res.json();
      setLinkToken(data.link_token);
    }

    createLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: (public_token, metadata) => {
      console.log('✅ Success:', public_token, metadata);
      // 🔥 Later: Exchange public_token for access_token
    },
    onExit: (err, metadata) => {
      console.log('👋 User exited:', err, metadata);
    },
  });

  if (!ready) return <div>Loading...</div>;

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Load Holdings ✨
    </button>
  );
}
