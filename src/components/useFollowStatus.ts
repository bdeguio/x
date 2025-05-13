'use client';

import { useEffect, useState } from 'react';
import { usePathname, useParams } from 'next/navigation';

export function useFollowStatus() {
  const pathname = usePathname();
  const params = useParams();

  const currentId = (params?.short_id as string)?.toUpperCase() || null;
  const [myId, setMyId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const res = await fetch('/api/userid');
      const data = await res.json();
      setMyId(data?.short_id || null);
    };
    fetchId();
  }, []);

  useEffect(() => {
    const checkFollow = async () => {
      if (!myId || !currentId || myId === currentId) return;
      const res = await fetch(`/api/follows/${myId}`);
      const data = await res.json();
      const followed = data?.some((d: any) => d.followed_short_id === currentId);
      setIsFollowing(followed);
    };
    checkFollow();
  }, [myId, currentId]);

  const showFollow =
    pathname.startsWith('/u/') &&
    myId &&
    currentId &&
    myId !== currentId &&
    !isFollowing;

  const handleFollow = async () => {
    if (!myId || !currentId || isFollowing) return;

    await fetch('/api/follow', {
      method: 'POST',
      body: JSON.stringify({ user_id: myId, followed_short_id: currentId }),
      headers: { 'Content-Type': 'application/json' },
    });

    setIsFollowing(true);

    // ✅ Notify FollowedProfilesList to update optimistically
    window.dispatchEvent(new CustomEvent('new-follow', { detail: currentId }));
  };

  return { showFollow, handleFollow };
}