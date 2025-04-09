'use client';

import { useUser, SignOutButton, SignedIn } from "@clerk/nextjs";
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>

        <SignedIn>
          <div className="flex items-center gap-4">
            <img
              src={user?.imageUrl || ""}
              alt="User avatar"
              className="w-10 h-10 rounded-full border"
            />
            <SignOutButton redirectUrl="/">
              <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>

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
