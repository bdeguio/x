'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

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
    // In real app, fetch from DB here
    setHoldings(mockHoldings);
  }, []);

  return (
    <div className="p-8">
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
            Welcome, {user?.firstName || "Investor"} 👋
        </h1>

        <SignedIn>
            <SignOutButton />
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
