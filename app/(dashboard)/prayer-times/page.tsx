'use client'
import { useState, useEffect } from 'react'
import { usePrayerStore, PrayerName } from '@/store/prayerStore'
import { Clock, MapPin, Compass, Sunrise, Sun, Sunset, Moon, Bell } from 'lucide-react'

const PRAYER_ICONS: Record<string, React.ReactNode> = {
  fajr:    <Sunrise size={24} />,
  dhuhr:   <Sun     size={24} />,
  asr:     <Sun     size={24} />,
  maghrib: <Sunset  size={24} />,
  isha:    <Moon    size={24} />,
}

function timeToDate(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const d = new Date()
  d.setHours(hours, minutes, 0, 0)
  return d
}

export default function PrayerTimesPage() {
  const { schedule, location, getCurrentPrayer, qiblaDirection } = usePrayerStore()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [tab, setTab] = useState<'prayer' | 'qibla'>('prayer')
  const [mounted, setMounted] = useState(false)
  const [heading, setHeading] = useState<number | null>(null)
  
  const currentPrayer = getCurrentPrayer()

  const handleOrientation = (event: any) => {
    let alpha = event.alpha;
    let webkitCompassHeading = event.webkitCompassHeading;

    if (webkitCompassHeading !== undefined) {
      setHeading(webkitCompassHeading);
    } else if (alpha !== null) {
      setHeading(360 - alpha);
    }
  }

  const requestCompassPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          alert('يتطلب اتجاه القبلة إذن الوصول إلى بوصلة الهاتف.');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  }

  useEffect(() => {
    setMounted(true)
    const int = setInterval(() => setCurrentTime(new Date()), 1000)
    
    // Cleanup listeners
    return () => {
      clearInterval(int)
      window.removeEventListener('deviceorientation', handleOrientation, true)
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true)
    }
  }, [])

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

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-24" dir="rtl">

      {/* ── Header Tabs ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm">
        <div className="flex bg-warm-100 p-1 rounded-2xl">
          <button onClick={() => setTab('prayer')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${tab === 'prayer' ? 'bg-white shadow-sm text-primary-900' : 'text-text-muted hover:text-primary'}`}>
            مواقيت الصلاة
          </button>
          <button onClick={() => setTab('qibla')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${tab === 'qibla' ? 'bg-white shadow-sm text-primary-900' : 'text-text-muted hover:text-primary'}`}>
            اتجاه القبلة
          </button>
        </div>
      </div>

      <div className="px-6 pt-6">

        {tab === 'prayer' && (
          <div className="animate-enter">
            {/* ── Hero Banner (Screen 16) ───────────────────── */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FDF8F0] to-[#F5E6D3] p-6 shadow-floating border border-gold-400/20 mb-8">
              {/* Decorative Mosque Shape */}
              <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="200" height="100" viewBox="0 0 200 100" fill="currentColor" className="text-gold-600">
                  <path d="M40 100V60C40 48.9543 48.9543 40 60 40H140C151.046 40 160 48.9543 160 60V100H40Z"/>
                  <path d="M100 40L100 0M100 0L90 10M100 0L110 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-1 text-gold-600 font-bold mb-4 text-sm bg-white/40 inline-flex px-2 py-1 rounded-lg">
                  <MapPin size={16} /> {mounted ? location : 'جاري التحديد...'}
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-xl font-bold text-primary-900 mb-1">
                      صلاة {nextPrayer.nameAr} {isTomorrow && <span className="text-[10px] bg-gold-200 text-gold-800 px-1.5 py-0.5 rounded">غداً</span>}
                    </h2>
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
            </div>

            {/* ── Prayer Cards ──────────────────────────────── */}
            <h3 className="text-lg font-bold text-primary-900 mb-4 px-2">أوقات الصلاة</h3>
            <div className="space-y-3">
              {schedule.map((p) => {
                const isCurrent = currentPrayer === p.name
                
                return (
                  <div key={p.name} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isCurrent ? 'bg-primary-900 text-white shadow-lg scale-[1.02]' : 'bg-white text-primary-900 shadow-sm border border-border-light'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCurrent ? 'bg-white/10 text-gold-400' : 'bg-warm-50 text-gold-600'}`}>
                        {PRAYER_ICONS[p.name]}
                      </div>
                      <div className="font-bold text-lg">{p.nameAr}</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`text-xl font-bold font-arabic ${isCurrent ? 'text-white' : 'text-primary-900'}`} suppressHydrationWarning>
                        {p.time}
                      </div>
                      <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCurrent ? 'bg-white/10 hover:bg-white/20' : 'bg-warm-50 hover:bg-warm-100 text-text-muted'}`}>
                        <Bell size={20} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'qibla' && (
          <div className="animate-enter flex flex-col items-center pt-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-2">اتجاه القبلة</h2>
            <p className="text-text-muted text-center mb-6">الرجاء وضع الهاتف بشكل مسطح للحصول على أدق نتيجة</p>

            {heading === null && (
              <button 
                onClick={requestCompassPermission}
                className="mb-8 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-800 transition-colors"
              >
                تفعيل البوصلة 🧭
              </button>
            )}

            {/* Minimalist Elegant Qibla Compass */}
            <div className="relative w-80 h-80 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.05)] bg-white p-6 flex items-center justify-center border border-border-light">
              
              {/* Outer Ring with Compass Points */}
              <div className="relative w-full h-full rounded-full bg-warm-50 border border-warm-200 flex items-center justify-center">
                
                {/* Directions (N, E, S, W) - rotate the whole ring opposite to heading to keep North up, or rotate the inner dial? */}
                {/* Usually the compass outer ring stays fixed, and the needle points North. Or the outer ring rotates so North is always aligned with actual North. */}
                {/* Let's rotate the inner dial so the needle points to Qibla, relative to the phone. */}
                <div 
                  className="absolute inset-0 transition-transform duration-300 ease-out" 
                  style={{ transform: `rotate(${-(heading || 0)}deg)` }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-text-muted font-bold text-sm">ش</div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-text-muted font-bold text-sm">ج</div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-sm">ق</div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-sm">غ</div>

                  {/* Compass Degree Ticks SVG */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    {Array.from({ length: 72 }).map((_, i) => (
                      <line
                        key={i}
                        x1="50" y1="12" x2="50" y2={i % 6 === 0 ? "16" : "14"}
                        stroke={i % 6 === 0 ? "#94a3b8" : "#cbd5e1"}
                        strokeWidth={i % 6 === 0 ? "0.6" : "0.3"}
                        transform={`rotate(${i * 5} 50 50)`}
                      />
                    ))}
                  </svg>
                </div>

                {/* Inner Compass Area */}
                <div className="relative w-40 h-40 rounded-full border border-warm-200/50 shadow-inner flex items-center justify-center bg-white">
                  
                  {/* Rotating Dial (represents the Kaaba direction relative to North) */}
                  <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `rotate(${qiblaDirection - (heading || 0)}deg)` }}>
                    
                    {/* The Compass Needle */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[60px] border-b-primary-500 mb-[60px]"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[40px] border-t-warm-300 mt-[100px]"></div>
                    </div>

                    {/* Kaaba Icon */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="relative w-8 h-10 bg-[#1a1a1a] rounded shadow-lg flex flex-col items-center border border-black overflow-hidden">
                        <div className="w-full mt-2 h-1 bg-gold-400"></div>
                      </div>
                    </div>

                  </div>

                  {/* Center Pivot */}
                  <div className="absolute w-4 h-4 bg-white border-[3px] border-primary-500 rounded-full shadow-md z-20"></div>

                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="text-4xl font-black text-primary-900 font-arabic mb-2 text-shadow-sm">{qiblaDirection}°</div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-border-light flex items-center justify-center gap-2">
                <Compass size={18} className="text-gold-600" />
                <span className="font-bold text-text-muted text-sm">مكة المكرمة - اتجاه القبلة</span>
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  )
}
