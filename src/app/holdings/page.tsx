'use client';

import { useEffect, useState } from 'react';
import PlaidLinkButton from '@/components/PlaidLinkButton';

type Holding = {
  ticker: string;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [newTicker, setNewTicker] = useState('');

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

  async function addHolding() {
    if (!newTicker) return;

    await fetch('/api/holdings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker: newTicker }),
    });

    setHoldings(prev => [...prev, { ticker: newTicker }]);
    setNewTicker('');
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Holdings</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64"
          type="text"
          placeholder="Enter ticker symbol (e.g., TSLA)"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={addHolding}
        >
          Add Holding
        </button>
      </div>

      <div className="grid gap-4">
        {holdings.map((h, i) => (
          <div key={i} className="p-4 rounded border shadow flex justify-between items-center">
            <div className="text-lg font-semibold">{h.ticker}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

