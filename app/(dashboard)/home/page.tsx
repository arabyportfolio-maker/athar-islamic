'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePrayerStore } from '@/store/prayerStore'
import { useTasbeehStore } from '@/store/tasbeehStore'
import { useUserStore } from '@/store/userStore'
import { MapPin } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

const QUICK_ACCESS = [
  { href:'/tasbeeh',      label:'مسبحة',     icon: '📿', bg:'bg-primary-50', color:'text-primary' },
  { href:'/azkar',        label:'أذكار',      icon: '🌿', bg:'bg-gold-50', color:'text-gold-600' },
  { href:'/quran',        label:'قرآن',       icon: '📖', bg:'bg-blue-50', color:'text-blue-600' },
  { href:'/prayer-times', label:'صلوات',      icon: '🕌', bg:'bg-primary-50', color:'text-primary-600' },
]

function timeToDate(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const d = new Date()
  d.setHours(hours, minutes, 0, 0)
  return d
}

export default function HomePage() {
  const { total: todayCount } = useTasbeehStore()
  const { schedule, location, fetchRealTimes } = usePrayerStore()

  const { user } = useUserStore()

  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchRealTimes() // Fetch real location and prayer times on mount
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [fetchRealTimes])

  // Calculate Next Prayer
  let nextPrayer = schedule[0] // Default to Fajr
  let nextPrayerDate = timeToDate(nextPrayer.time)
  let isTomorrow = false

  if (mounted) {
    const now = currentTime.getTime()
    const upcoming = schedule.find(p => timeToDate(p.time).getTime() > now)
    
    if (upcoming) {
      nextPrayer = upcoming
      nextPrayerDate = timeToDate(nextPrayer.time)
    } else {
      // If all prayers today have passed, next is Fajr tomorrow
      nextPrayer = schedule[0]
      nextPrayerDate = timeToDate(nextPrayer.time)
      nextPrayerDate.setDate(nextPrayerDate.getDate() + 1)
      isTomorrow = true
    }
  }

  // Calculate Time Remaining
  const diffMs = nextPrayerDate.getTime() - currentTime.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)
  
  const remainingStr = `${diffHrs.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`

  const hijriDate = mounted ? new Date().toLocaleDateString('ar-SA-u-ca-islamic', { day:'numeric', month:'long', year:'numeric' }) : ''

  return (
    <div className="min-h-screen pb-24 bg-warm-100 font-sans" dir="rtl">
      
      {/* ── Header ───────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary font-bold text-lg">
              {mounted && user?.full_name ? user.full_name[0] : 'م'}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-muted">السلام عليكم</div>
            <div className="font-bold text-primary-900 text-lg">{mounted && user?.full_name ? user.full_name : 'المسلم العابد'}</div>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-6">

        {/* ── Prayer Hero Card ───────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDF8F0] to-[#F5E6D3] p-6 shadow-card border border-gold-400/20">
          <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="200" height="100" viewBox="0 0 200 100" fill="currentColor" className="text-gold-600">
              <path d="M40 100V60C40 48.9543 48.9543 40 60 40H140C151.046 40 160 48.9543 160 60V100H40Z"/>
              <path d="M100 40L100 0M100 0L90 10M100 0L110 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="100" cy="50" r="10"/>
              <path d="M20 100V70C20 64.4772 24.4772 60 30 60H40V100H20Z"/>
              <path d="M180 100V70C180 64.4772 175.523 60 170 60H160V100H180Z"/>
              <path d="M30 60L30 30M30 30L25 35M30 30L35 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M170 60L170 30M170 30L165 35M170 30L175 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="relative z-10 flex justify-between items-center mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary-800 bg-white/40 px-2 py-1 rounded-lg">
              <MapPin size={12} /> {mounted ? location : 'جاري التحديد...'}
            </div>
            <div className="text-sm font-medium text-primary-700 bg-white/50 inline-block px-3 py-1 rounded-full min-h-[28px]">
              {hijriDate}
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-end">
            <div>
              <div className="text-gold-600 font-semibold mb-1 flex items-center gap-2">
                <span className="text-2xl">🕌</span> صلاة {nextPrayer.nameAr} {isTomorrow && <span className="text-[10px] bg-gold-200 text-gold-800 px-1.5 py-0.5 rounded">غداً</span>}
              </div>
              <div className="text-4xl font-bold text-primary-900 font-arabic" suppressHydrationWarning>
                {nextPrayer.time}
              </div>
            </div>
            
            <div className="text-center bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm border border-white/50 min-w-[100px]">
              <div className="text-xs font-bold text-text-muted mb-1">متبقي</div>
              <div className="text-xl font-black text-gold-600 font-arabic" suppressHydrationWarning>
                {mounted ? remainingStr : '--:--:--'}
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Access Row ───────────────────────────── */}
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACCESS.map((item, i) => (
            <Link key={i} href={item.href} className="flex flex-col items-center gap-2 group">
              <div className={`w-16 h-16 rounded-[20px] ${item.bg} flex items-center justify-center text-3xl shadow-sm border border-white group-hover:-translate-y-1 group-hover:shadow-md transition-all`}>
                {item.icon}
              </div>
              <span className="text-xs font-bold text-text-muted group-hover:text-primary transition-colors">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Quick Tasbeeh Card ─────────────────────────── */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-border-light relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="flex items-start justify-between relative z-10 mb-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="text-xl">📿</span> المسبحة السريعة
            </div>
            <div className="bg-primary-50 text-primary font-bold px-3 py-1 rounded-full text-sm">
              {formatNumber(todayCount)} اليوم
            </div>
          </div>

          <div className="text-center py-6">
            <h3 className="text-2xl font-arabic font-bold text-primary-900 leading-relaxed">
              سُبْحَانَ اللَّهِ وَبِحَمْدِهِ<br/>سُبْحَانَ اللَّهِ الْعَظِيمِ
            </h3>
          </div>

          <Link href="/tasbeeh">
            <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-primary hover:bg-primary-800 transition-colors flex items-center justify-center gap-2">
              ابدأ التسبيح <span className="text-xl">✨</span>
            </button>
          </Link>
        </div>

        {/* ── Pages of Impact (Sadaqah) ──────────────────── */}
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-lg font-bold text-primary-900">صفحات الأثر</h2>
          <Link href="/legacy" className="text-sm font-bold text-gold-600 hover:text-gold-500 transition-colors">
            عرض الكل
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl p-5 shadow-card border border-border-light flex gap-4 items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-3xl shrink-0">
            🌿
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-text mb-1">صدقة جارية لمن تحب</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              أنشئ صفحة صدقة جارية واجمع التسبيحات والأذكار كأجر لمن تحب.
            </p>
          </div>
          <Link href="/legacy/new">
            <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-800 transition-colors shrink-0">
              +
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
