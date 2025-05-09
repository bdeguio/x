'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

export default function FollowedProfilesList() {
  const { user, isSignedIn } = useUser(); // ✅ this must be inside the component
  const [followedShortIds, setFollowedShortIds] = useState<string[]>([]);
  const supabase = createSupabaseClient();

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const loadFollowedProfiles = async () => {
      const { data, error } = await supabase
        .from('followed_profiles')
        .select('followed_short_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading followed profiles:', error);
      } else {
        setFollowedShortIds(data.map((f) => f.followed_short_id));
      }
    };

    loadFollowedProfiles();
  }, [isSignedIn, user?.id, supabase]);

  return (
    <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 mb-4">
      {followedShortIds.length === 0 ? (
        <div className="text-sm text-gray-500">No follows yet</div>
      ) : (
        followedShortIds.map((id) => (
          <div key={id} className="text-sm text-gray-500">
            {id}
          </div>
        ))
      )}
    </div>
  );
}
