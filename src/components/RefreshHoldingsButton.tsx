'use client';

import { useState } from 'react';

interface RefreshHoldingsButtonProps {
  onRefresh: () => Promise<void>;
}

export default function RefreshHoldingsButton({ onRefresh }: RefreshHoldingsButtonProps) {
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleClick = async () => {
    setRefreshing(true);
    await onRefresh();
    setLastRefreshed(new Date());
    setRefreshing(false);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={handleClick}
        disabled={refreshing}
        className={`px-4 py-2 rounded text-white ${
          refreshing ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
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
