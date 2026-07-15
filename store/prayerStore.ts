// ── Zustand Prayer Tracker Store ────────────────────────────────────────────
'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
export type PrayerStatus = 'pending' | 'prayed' | 'missed'

export interface PrayerTime {
  name:       PrayerName
  nameAr:     string
  time:       string     // "HH:MM"
  endTime:    string     // next prayer start = this prayer's end
  icon:       string
}

const DEFAULT_SCHEDULE: PrayerTime[] = [
  { name:'fajr',    nameAr:'الفجر',  time:'04:52', endTime:'06:18', icon:'fajr'    },
  { name:'dhuhr',   nameAr:'الظهر',  time:'12:18', endTime:'15:43', icon:'dhuhr'   },
  { name:'asr',     nameAr:'العصر',  time:'15:43', endTime:'18:21', icon:'asr'     },
  { name:'maghrib', nameAr:'المغرب', time:'18:21', endTime:'19:48', icon:'maghrib' },
  { name:'isha',    nameAr:'العشاء',  time:'19:48', endTime:'23:59', icon:'isha'    },
]

type DayRecord = Record<PrayerName, PrayerStatus>

interface PrayerState {
  schedule:  PrayerTime[]
  location:  string
  records:   Record<string, DayRecord>   // key = YYYY-MM-DD
  streak:    number

  todayRecord: () => DayRecord
  markPrayed:  (prayer: PrayerName) => void
  markMissed:  (prayer: PrayerName) => void
  getCurrentPrayer: () => PrayerName | null
  getPrayerStatus:  (prayer: PrayerName) => PrayerStatus
  getStats:    () => { prayed: number; total: number; streak: number }
  autoMarkMissed: () => void
  fetchRealTimes: () => Promise<void>
}

function todayKey() { return new Date().toISOString().split('T')[0] }

function emptyDay(): DayRecord {
  return { fajr:'pending', dhuhr:'pending', asr:'pending', maghrib:'pending', isha:'pending' }
}

function timeToMinutes(t: string): number {
  if (!t) return 0
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function nowMinutes(): number {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

// Helper to remove timezone suffix if present (e.g., "04:52 (+03)")
function cleanTime(t: string) {
  return t.split(' ')[0]
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      schedule: DEFAULT_SCHEDULE,
      location: 'جاري تحديد الموقع...',
      records: {},
      streak:  0,

      todayRecord: () => {
        const key = todayKey()
        return get().records[key] || emptyDay()
      },

      markPrayed: (prayer) => {
        const key = todayKey()
        set(s => ({
          records: {
            ...s.records,
            [key]: { ...(s.records[key] || emptyDay()), [prayer]: 'prayed' }
          }
        }))
      },

      markMissed: (prayer) => {
        const key = todayKey()
        set(s => ({
          records: {
            ...s.records,
            [key]: { ...(s.records[key] || emptyDay()), [prayer]: 'missed' }
          }
        }))
      },

      autoMarkMissed: () => {
        const now    = nowMinutes()
        const key    = todayKey()
        const record = get().records[key] || emptyDay()
        const updated = { ...record }
        let changed = false

        get().schedule.forEach(p => {
          const endMins = timeToMinutes(p.endTime)
          if (now > endMins && updated[p.name] === 'pending') {
            updated[p.name] = 'missed'
            changed = true
          }
        })

        if (changed) {
          set(s => ({ records: { ...s.records, [key]: updated } }))
        }
      },

      getCurrentPrayer: () => {
        const now = nowMinutes()
        const sched = get().schedule
        for (const p of sched) {
          const start = timeToMinutes(p.time)
          const end   = timeToMinutes(p.endTime)
          if (now >= start && now < end) return p.name
        }
        if (now < timeToMinutes(sched[0].time)) return null
        return 'isha'
      },

      getPrayerStatus: (prayer) => {
        const key    = todayKey()
        const record = get().records[key] || emptyDay()
        return record[prayer]
      },

      getStats: () => {
        const key    = todayKey()
        const record = get().records[key] || emptyDay()
        const prayed = Object.values(record).filter(s => s === 'prayed').length

        let streak = 0
        const d = new Date()
        for (let i = 0; i < 365; i++) {
          d.setDate(d.getDate() - (i === 0 ? 0 : 1))
          const k = d.toISOString().split('T')[0]
          const r = get().records[k]
          if (!r) break
          const all5 = Object.values(r).every(s => s === 'prayed')
          if (!all5) break
          streak++
        }

        return { prayed, total: 5, streak }
      },

      fetchRealTimes: async () => {
        try {
          // 1. Get location via IP
          const ipRes = await fetch('https://ipapi.co/json/')
          const ipData = await ipRes.json()
          const lat = ipData.latitude || 30.0444
          const lng = ipData.longitude || 31.2357
          const city = ipData.city || 'القاهرة'
          const country = ipData.country_name || 'مصر'

          // 2. Fetch Prayer Times from Aladhan API
          // method=4 is Umm Al-Qura, method=5 is Egyptian, method=2 is ISNA.
          // Let's use method=auto (by omitting it, or using an empty string, or letting the API decide).
          // Actually, method=null lets Aladhan choose the best one based on country.
          const date = new Date()
          const ts = Math.floor(date.getTime() / 1000)
          const adhanRes = await fetch(`https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lng}`)
          const adhanData = await adhanRes.json()

          if (adhanData?.data?.timings) {
            const t = adhanData.data.timings
            const newSchedule: PrayerTime[] = [
              { name:'fajr',    nameAr:'الفجر',  time: cleanTime(t.Fajr),    endTime: cleanTime(t.Sunrise), icon:'fajr' },
              { name:'dhuhr',   nameAr:'الظهر',  time: cleanTime(t.Dhuhr),   endTime: cleanTime(t.Asr),     icon:'dhuhr' },
              { name:'asr',     nameAr:'العصر',  time: cleanTime(t.Asr),     endTime: cleanTime(t.Maghrib), icon:'asr' },
              { name:'maghrib', nameAr:'المغرب', time: cleanTime(t.Maghrib), endTime: cleanTime(t.Isha),    icon:'maghrib' },
              { name:'isha',    nameAr:'العشاء',  time: cleanTime(t.Isha),    endTime: '23:59',              icon:'isha' },
            ]
            set({ schedule: newSchedule, location: `${city}، ${country}` })
          }
        } catch (error) {
          console.error("Failed to fetch real prayer times:", error)
          // Fallback to defaults if it fails completely
        }
      }
    }),
    { name: 'athar-prayers-v2' } // upgraded version
  )
)
