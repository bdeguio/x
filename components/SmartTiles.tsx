'use client';

interface SmartTilesProps {
  shortId: string;
  isOwner?: boolean;
}

export default function SmartTiles({ shortId, isOwner }: SmartTilesProps) {
  return (
    <div className="p-4 rounded-xl border shadow-md bg-white dark:bg-zinc-900 mt-4">
      <h3 className="font-semibold text-purple-500 text-sm mb-2">
        {isOwner ? 'Your AI Portfolio Summary' : `Smart Insights for ${shortId}`}
      </h3>
      <p className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
        👋 <strong>Welcome, Paddle.</strong>{'\n'}
          📈 Your demo portfolio is <strong>tech-heavy</strong>, with Apple, Nvidia, and Tesla making up 100% of holdings.{'\n'}
          ⚠️ This concentration boosts returns — but increases volatility.{'\n'}
          🤖 In production, this tile shows <strong>real-time AI insights</strong> based on live holdings.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        ⚠️ This is sample content and does not constitute financial advice.
      </p>
    </div>
  );
}
