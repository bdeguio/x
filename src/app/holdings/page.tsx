'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Holding = {
  symbol: string;
  ticker: string;
  percent: number;
};

const mockHoldings: Holding[] = [
  { symbol: "Tesla Inc.", ticker: "TSLA", percent: 45 },
  { symbol: "Apple Inc.", ticker: "AAPL", percent: 35 },
  { symbol: "Amazon", ticker: "AMZN", percent: 20 },
];

export default function HoldingsPage() {
  const { user } = useUser();
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    setHoldings(mockHoldings);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.firstName || "Investor"} 👋
      </h1>

      <h2 className="text-xl mb-4">Your Holdings</h2>

      <div className="grid gap-4">
        {holdings.map((h, i) => (
          <div
            key={i}
            className="p-4 rounded border shadow flex justify-between items-center"
          >
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
