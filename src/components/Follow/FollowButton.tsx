'use client';

import { useFollowStatus } from './useFollowStatus';

interface FollowButtonProps {
  followedShortId: string;
}

export default function FollowButton({ followedShortId }: FollowButtonProps) {
  const { isFollowing, loading, toggleFollow } = useFollowStatus(followedShortId);

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-700 rounded-full px-3 py-1 shadow-sm border border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
    >
      {loading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
