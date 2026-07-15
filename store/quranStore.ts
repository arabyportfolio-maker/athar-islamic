'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuranTheme = 'light' | 'warm' | 'dark'

export interface Reciter {
  id: string
  name: string
  surahUrl: string // base URL for full surah (e.g. server8.mp3quran.net/afs)
  ayahIdentifier: string // identifier for Alquran Cloud or EveryAyah
  singleAyahProvider?: 'alquran' | 'everyayah'
}

export const RECITERS: Reciter[] = [
  { id: 'alafasy', name: 'مشاري العفاسي', surahUrl: 'https://server8.mp3quran.net/afs', ayahIdentifier: 'ar.alafasy' },
  { id: 'abdulbasit', name: 'عبد الباسط (مرتل)', surahUrl: 'https://server7.mp3quran.net/basit', ayahIdentifier: 'Abdul_Basit_Murattal_192kbps', singleAyahProvider: 'everyayah' },
  { id: 'abdulbasit_mjwd', name: 'عبد الباسط (تجويد)', surahUrl: 'https://server7.mp3quran.net/basit_mjwd', ayahIdentifier: 'ar.abdulbasitmujawwad' },
  { id: 'maher', name: 'ماهر المعيقلي', surahUrl: 'https://server12.mp3quran.net/maher', ayahIdentifier: 'ar.mahermuaiqly' },
  { id: 'dosari', name: 'ياسر الدوسري', surahUrl: 'https://server11.mp3quran.net/yasser', ayahIdentifier: 'ar.yasseraldossari' },
  { id: 'husary', name: 'محمود خليل الحصري', surahUrl: 'https://server13.mp3quran.net/husr', ayahIdentifier: 'ar.husary' },
  { id: 'tablawi', name: 'محمد الطبلاوي (تجويد)', surahUrl: 'https://server12.mp3quran.net/tblawi', ayahIdentifier: 'Mohammad_al_Tablaway_128kbps', singleAyahProvider: 'everyayah' },
  { id: 'sayed_saeed', name: 'السيد سعيد', surahUrl: 'https://server10.mp3quran.net/sayed_saeed', ayahIdentifier: 'ar.abdulbasitmujawwad' }, // fallback for ayah audio
]

interface Bookmark {
  surah: number
  ayah: number
  page?: number
}

interface QuranState {
  fontSize: number
  theme: QuranTheme
  reciterId: string
  bookmarks: Record<number, Bookmark>
  
  setFontSize: (size: number | ((prev: number) => number)) => void
  setTheme: (theme: QuranTheme) => void
  setReciterId: (id: string) => void
  saveBookmark: (surah: number, ayah: number, page?: number) => void
  removeBookmark: (surah: number) => void
  getBookmark: (surah: number) => Bookmark | undefined
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      fontSize: 28,
      theme: 'warm',
      reciterId: 'alafasy',
      bookmarks: {},

      setFontSize: (val) => set((state) => ({
        fontSize: typeof val === 'function' ? val(state.fontSize) : val
      })),

      setTheme: (theme) => set({ theme }),
      
      setReciterId: (reciterId) => set({ reciterId }),

      saveBookmark: (surah, ayah, page) => set((state) => {
        // Sync with Supabase asynchronously
        import('@/store/userStore').then(({ useUserStore }) => {
          const user = useUserStore.getState().user
          if (user) {
            import('@/lib/supabase').then(({ saveQuranBookmark }) => {
              saveQuranBookmark(user.id, surah, ayah)
            })
          }
        })

        return {
          bookmarks: {
            ...state.bookmarks,
            [surah]: { surah, ayah, page }
          }
        }
      }),

      removeBookmark: (surah) => set((state) => {
        const newBookmarks = { ...state.bookmarks }
        delete newBookmarks[surah]
        return { bookmarks: newBookmarks }
      }),

      getBookmark: (surah) => get().bookmarks[surah]
    }),
    { name: 'athar-quran-settings' }
  )
)
