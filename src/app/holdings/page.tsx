'use client';

import { useEffect, useState } from 'react';

type Holding = {
  symbol: string;
  ticker: string;
  percent: number;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    async function loadHoldings() {
      const res = await fetch('/api/holdings');
      const data = await res.json();

      if (Array.isArray(data)) {
        setHoldings(data); // ✅ safe
      } else {
        console.error("Unexpected holdings response:", data);
        setHoldings([]); // fallback
      }
    }

    loadHoldings();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Your Holdings</h2>

      <div className="grid gap-4">
        {holdings.map((h, i) => (
          <div key={i} className="p-4 rounded border shadow flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">{h.ticker}</div>
              <div className="text-sm text-gray-500">{h.symbol}</div>
            </div>
            <div className="text-xl font-bold">{h.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
