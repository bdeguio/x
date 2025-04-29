'use client';

import { useEffect, useState } from 'react';
import PlaidLinkButton from '@/components/PlaidLinkButton';

type Holding = {
  ticker_symbol: string; // 🔥 Match your updated database
  security_id?: string;  // optional, for backend/internal use if you ever want
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
          <div className="text-center text-gray-500">Loading...</div>
        ) : holdings.length === 0 ? (
          <div className="text-center text-gray-500">No Holdings Yet</div>
        ) : (
          holdings.map((h, i) => (
            <div key={i} className="p-4 rounded border shadow flex justify-between items-center">
              <div className="text-lg font-semibold">{h.ticker_symbol}</div> {/* 🔥 Use ticker_symbol here */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
