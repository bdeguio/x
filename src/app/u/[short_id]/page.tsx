'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import FollowButton from '@/components/FollowButton'


type Holding = {
  ticker_symbol: string;
  company_name?: string;
};

export default function UserHoldingsPage() {
  const params = useParams();
  const short_id = params?.short_id as string;

  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchHoldings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/holdings/${short_id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setHoldings(data);
      } else {
        setHoldings([]); // Fallback for unexpected API response
      }
    } catch (err) {
      console.error("Failed to fetch holdings:", err);
      setHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (short_id) {
      fetchHoldings();
    }
  }, [short_id]);

  return (
    <div className="relative h-screen overflow-hidden">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 px-6 py-4 bg-transparent rounded border border-transparent hover:border-gray-400 transition"
      >
        ☰
      </button>

      <Sidebar isOpen={sidebarOpen} onRefresh={fetchHoldings} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white dark:bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="absolute top-0 left-0 right-0 bottom-0 pt-20 overflow-y-auto p-6">
        <div className="flex justify-end mb-6">
          <FollowButton followedShortId={short_id} />
        </div>
        
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
    </div>
  );
}
