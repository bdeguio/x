'use client';

import { useEffect, useState } from 'react';
import SmartTiles from '@/components/SmartTiles';

type Holding = {
  ticker: string;
  name: string;
  value?: number;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/holdings');
        const data = await res.json();
        if (Array.isArray(data)) {
          setHoldings(data);
        }
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  return (
    <main className="pt-20 p-6">
      <div className="grid gap-4">
        <SmartTiles shortId="demo" isOwner />

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded border shadow animate-pulse bg-gray-200 h-16" />
          ))
        ) : holdings.length === 0 ? (
          <div className="text-center text-gray-500">No Holdings Yet</div>
        ) : (
          holdings.map((h, i) => (
            <div key={i} className="p-4 rounded border shadow flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">{h.ticker}</div>
                <div className="text-gray-500 text-sm">{h.name}</div>
              </div>
              <div className="text-sm font-medium">${(h.value ?? 0).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
