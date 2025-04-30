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
    onSuccess: async (public_token) => {
      console.log('✅ Plaid link Success');
    
      const exchangeRes = await fetch('/api/plaid/exchange-public-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });
    
      const { access_token } = await exchangeRes.json();
      console.log('✅ Access token saved:', access_token);
    
      // ADD THIS AFTER saving access token:
      await fetch('/api/plaid/holdings', {
        method: 'POST',
      });
    
      console.log('✅ Holdings fetched and stored');
    }
  });

  if (!ready) return (
    <div className="flex justify-left mt-4">
      <div className="h-10 w-40 bg-gray-300 animate-pulse rounded"></div>
    </div>
  );  

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      Load Holdings ✨
    </button>
  );
}
