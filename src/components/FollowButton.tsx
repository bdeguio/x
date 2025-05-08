'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'

interface FollowButtonProps {
  followedShortId: string
}

export default function FollowButton({ followedShortId }: FollowButtonProps) {
  const { user } = useUser()
  const supabase = createSupabaseClient()

  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkFollow = async () => {
      if (!user?.id) return

      const { data, error } = await supabase
        .from('followed_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('followed_short_id', followedShortId)
        .maybeSingle()

      if (error) console.error(error)
      setIsFollowing(!!data)
      setLoading(false)
    }

    checkFollow()
  }, [user?.id, followedShortId, supabase])

  const handleClick = async () => {
    if (!user?.id) return
    setLoading(true)

    if (isFollowing) {
      const { error } = await supabase
        .from('followed_profiles')
        .delete()
        .eq('user_id', user.id)
        .eq('followed_short_id', followedShortId)

      if (error) console.error(error)
    } else {
      const { error } = await supabase.from('followed_profiles').insert({
        user_id: user.id,
        followed_short_id: followedShortId,
      })

      if (error) console.error(error)
    }

    setIsFollowing(!isFollowing)
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="absolute top-4 right-4 rounded-full px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
    >
      {loading ? 'Loading...' : isFollowing ? 'unfollow' : 'follow'}
    </button>
  )
}
