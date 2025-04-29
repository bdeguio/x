'use client';

import { useEffect, useState } from 'react';
import PlaidLinkButton from '@/components/PlaidLinkButton';

type Holding = {
  ticker_symbol: string;
  company_name?: string;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHoldings() {
      try {
        const res = await fetch('/api/holdings');
        const data = await res.json();
        console.log("🎯 Holdings response:", data);

        if (Array.isArray(data)) {
          setHoldings(data);
        }
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHoldings();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Holdings</h2>

      <PlaidLinkButton />

      <div className="grid gap-4 mt-6">
        {loading ? (
          // Skeleton loaders while loading
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded border shadow animate-pulse bg-gray-200 h-16" />
          ))
        ) : holdings.length === 0 ? (
          // Show "No Holdings Yet" if no holdings
          <div className="text-center text-gray-500">No Holdings Yet</div>
        ) : (
          // Otherwise render the real holdings
          holdings.map((h, i) => (
            <div
              key={i}
              className="p-4 rounded border shadow flex justify-between items-center"
            >
              <div>
                <div className="text-lg font-semibold">{h.ticker_symbol}</div>
                <div className="text-gray-500 text-sm">{h.company_name || "Unknown Company"}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
