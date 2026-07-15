import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface UserState {
  user: User | null
  loading: boolean
  fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    set({ loading: true })
    const { data: { user } } = await supabase.auth.getUser()
    set({ user, loading: false })
  }
}))

if (typeof window !== 'undefined') {
  useUserStore.getState().fetchUser()
  supabase.auth.onAuthStateChange((event, session) => {
    useUserStore.setState({ user: session?.user || null, loading: false })
  })
}
