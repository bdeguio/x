'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';

type Holding = {
  ticker_symbol: string;
  company_name?: string;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  useEffect(() => {
    fetchHoldings();
  }, []);

  useEffect(() => {
    // Ensure short_id is synced on sign-in
    const syncUserProfile = async () => {
      try {
        await fetch('/api/sync-profile');
      } catch (err) {
        console.error('Failed to sync user profile:', err);
      }
    };
  
    syncUserProfile();
  }, []);
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 px-6 py-4 bg-transparent hover:bg-transparent rounded"
      >
        ☰
      </button>
      <div className="mb-20" />

      {/* Sidebar (Responsive) */}
      <Sidebar isOpen={sidebarOpen} onRefresh={fetchHoldings} />


      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white dark:bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="h-full overflow-y-auto p-6">
        <div className="grid gap-4 mt-6">
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
