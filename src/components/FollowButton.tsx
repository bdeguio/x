'use client';

type FollowButtonProps = {
  onFollow: () => void | Promise<void>;
};

export default function FollowButton({ onFollow }: FollowButtonProps) {
  return (
    <button
      onClick={onFollow}
      className="ml-1 px-3 py-1 text-sm border border-purple-400 text-purple-400 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900"
    >
      Follow
    </button>
  );
}
