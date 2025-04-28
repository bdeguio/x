'use client';

import { useEffect, useState } from 'react';
import PlaidLinkButton from '@/components/PlaidLinkButton';

type Holding = {
  ticker: string;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    async function loadHoldings() {
      const res = await fetch('/api/holdings');
      const data = await res.json();
      console.log("🎯 Holdings response:", data);

      if (Array.isArray(data)) {
        setHoldings(data);
      }
    }

    loadHoldings();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Holdings</h2>
  
      <PlaidLinkButton />
  
      <div className="grid gap-4 mt-6">
        {holdings.map((h, i) => (
          <div key={i} className="p-4 rounded border shadow flex justify-between items-center">
            <div className="text-lg font-semibold">{h.ticker}</div>
        </div>
        ))}
      </div>
    </div>
  );
}

