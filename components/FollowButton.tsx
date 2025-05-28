'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function FollowButton() {
  const { user } = useUser();
  const params = useParams();
  const viewedShortId = (params?.short_id as string)?.toUpperCase();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  // ✅ Only fetch once with stable deps
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!user?.id || !viewedShortId) return;

      try {
        const res = await fetch(`/api/follows/${user.id}?short_id=${viewedShortId}`);
        if (!res.ok) throw new Error('Follow status check failed');
        const data = await res.json();
        setIsFollowing(data.isFollowing);
      } catch (err) {
        console.error('Error checking follow status:', err);
        setIsFollowing(false); // fallback: assume not following
      }
    };

    checkFollowStatus();
  }, [user?.id, viewedShortId]);

    const handleFollow = async () => {
    const res = await fetch('/api/follows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user?.id,
        followed_short_id: viewedShortId,
      }),
    });

    if (res.ok) {
      setIsFollowing(true);
      toast.success(`Followed ${viewedShortId}`);
      window.dispatchEvent(new CustomEvent('follow:new', { detail: viewedShortId }));
    } else {
      const errBody = await res.text();
      console.error('Failed to follow:', res.status, errBody);
      toast.error('Failed to follow. Try again.');
    }
  };

  // ✅ Hide if:
  const isSelf = user?.publicMetadata?.short_id === viewedShortId;
  const shouldHide = isSelf || isFollowing !== false;

  if (shouldHide) return null;

  return (
    <button
      onClick={handleFollow}
      className="fixed bottom-20 right-6 z-60 px-4 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
    >
      Follow
    </button>
  );
}

