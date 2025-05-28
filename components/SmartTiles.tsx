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
        💡 This is a sample Smart Tile. Connect your holdings to see personalized AI insights.
      </p>
    </div>
  );
}
