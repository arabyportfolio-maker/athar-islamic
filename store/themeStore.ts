// ── Zustand Theme Store ───────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme    = 'emerald' | 'dark' | 'gold'
type FontSize = 'sm' | 'md' | 'lg'

interface ThemeState {
  theme:    Theme
  fontSize: FontSize
  setTheme:    (t: Theme)    => void
  setFontSize: (s: FontSize) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme:    'emerald',
      fontSize: 'md',
      setTheme:    (theme)    => { set({ theme }); document.documentElement.setAttribute('data-theme', theme) },
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    { name: 'athar-theme' }
  )
)
