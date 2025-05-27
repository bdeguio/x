'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RefreshHoldingsButton() {
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleClick = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/plaid/holdings', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Holdings refresh error:", data.error);
        toast.error(data.error || "Failed to refresh holdings");
      } else {
        console.log("✅ Holdings refresh result:", data);
        toast.success("Holdings refreshed!");
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      toast.error("Network error refreshing holdings");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={handleClick}
        disabled={refreshing}
        className={`px-4 py-2 rounded text-white ${
          refreshing ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {refreshing ? 'Refreshing...' : 'Refresh'}
      </button>
      {lastRefreshed && (
        <div className="text-sm text-gray-500">
          Last updated: {lastRefreshed.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
