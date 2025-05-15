'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FollowButton from '@/components/FollowButton';

type Holding = {
  ticker_symbol: string;
  company_name?: string;
};

// ✅ 1. Fetch function OUTSIDE the component
const fetchHoldings = async (
  short_id: string,
  setHoldings: React.Dispatch<React.SetStateAction<Holding[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/holdings/${short_id}`);
    const data = await res.json();
    setHoldings(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch holdings:", err);
    setHoldings([]);
  } finally {
    setLoading(false);
  }
};

// ✅ 2. Your component as normal
export default function UserHoldingsPage() {
  const params = useParams();
  const short_id = params?.short_id as string;

  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (short_id) {
      fetchHoldings(short_id, setHoldings, setLoading);
    }
  }, [short_id]);

  return (
    <div className="relative h-screen overflow-hidden">
      <main className="absolute top-0 left-0 right-0 bottom-0 pt-20 overflow-y-auto p-6">
        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 rounded border shadow animate-pulse bg-gray-200 h-16" />
            ))
          ) : holdings.length === 0 ? (
            <div className="text-center text-gray-500">No Holdings Yet</div>
          ) : (
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
      </main>
      <FollowButton />
    </div>
  );
}
