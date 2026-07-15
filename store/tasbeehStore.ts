import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TasbeehState {
  counts:        Record<string, number> // Store counts for each dhikr
  total:         number
  selectedDhikr: { id: string; ar: string; count: number } | null
  sessions:      number
  viewMode:      'single' | 'list'
  increment:     (id?: string, amount?: number) => void
  reset:         (id?: string) => void
  setDhikr:      (d: { id: string; ar: string; count: number }) => void
  setViewMode:   (mode: 'single' | 'list') => void
}

export const useTasbeehStore = create<TasbeehState>()(
  persist(
    (set) => ({
      counts:        {},
      total:         0,
      selectedDhikr: { id:'subhan', ar:'سُبْحَانَ اللَّهِ', count:33 },
      sessions:      0,
      viewMode:      'single',

      increment: (id = 'current', amount = 1) => set(s => {
        const targetId = id === 'current' ? (s.selectedDhikr?.id || 'subhan') : id
        return {
          counts: { ...s.counts, [targetId]: Math.max(0, (s.counts[targetId] || 0) + amount) },
          total: amount > 0 ? s.total + amount : Math.max(0, s.total + amount),
        }
      }),

      reset: (id = 'current') => set(s => {
        const targetId = id === 'current' ? (s.selectedDhikr?.id || 'subhan') : id
        const currentCount = s.counts[targetId] || 0
        
        if (currentCount > 0) {
          // Sync with Supabase asynchronously
          import('@/store/userStore').then(({ useUserStore }) => {
            const user = useUserStore.getState().user
            if (user) {
              import('@/lib/supabase').then(({ saveTasbeehSession }) => {
                saveTasbeehSession({
                  user_id: user.id,
                  dhikr: targetId,
                  count: currentCount
                })
              })
            }
          })
        }

        return {
          counts: { ...s.counts, [targetId]: 0 },
          sessions: s.sessions + (currentCount > 0 ? 1 : 0),
        }
      }),

      setDhikr: (d) => set({ selectedDhikr: d }),
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    { name: 'athar-tasbeeh-v2' }
  )
)
