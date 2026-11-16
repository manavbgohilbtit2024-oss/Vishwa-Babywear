'use client'

// Auth context — wraps the app with real Supabase session state.
// When Supabase is not configured, user is always null and auth functions are no-ops.

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  full_name: string | null
  phone: string | null
}

interface AuthContextType {
  /** null = logged out or Supabase not configured */
  user: User | null
  profile: Profile | null
  /** true while the initial session check hasn't resolved yet */
  loading: boolean
  /** Whether Supabase is configured at all */
  isConfigured: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isConfigured: false,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const isConfigured = supabase !== null

  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return
      const { data } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', userId)
        .single()
      if (data) setProfile({ full_name: data.full_name, phone: data.phone })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isConfigured]
  )

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id)
  }, [user, fetchProfile])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      if (data.user) fetchProfile(data.user.id)
      setLoading(false)
    })

    // Listen for auth state changes (sign in / sign out / token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, isConfigured, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
