'use client'
import { useState, useCallback } from 'react'
import { useTasbeehStore } from '@/store/tasbeehStore'
import { RotateCcw, Settings, ChevronDown, Check, Minus, Plus, List, CircleDot, X } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

const DHIKR_LIST = [
  { id:'subhan',      ar:'سُبْحَانَ اللَّهِ',                         count:33,  color:'#064E3B' },
  { id:'hamd',        ar:'الْحَمْدُ لِلَّهِ',                         count:33,  color:'#065F46' },
  { id:'akbar',       ar:'اللَّهُ أَكْبَرُ',                          count:34,  color:'#047857' },
  { id:'tahleel',     ar:'لَا إِلَهَ إِلَّا اللَّهُ',                 count:100, color:'#D4A017' },
  { id:'istighfar',   ar:'أَسْتَغْفِرُ اللَّهَ',                     count:100, color:'#6366F1' },
  { id:'hawqala',     ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',  count:100, color:'#8B5CF6' },
  { id:'subhan_bihamdih', ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',     count:100, color:'#10B981' },
  { id:'yunus',       ar:'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ', count:100, color:'#EF4444' },
  { id:'salawat',     ar:'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', count:10,  color:'#F59E0B' },
  { id:'hasbuna',     ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',        count:100, color:'#3B82F6' },
  { id:'jalal',       ar:'يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',          count:33,  color:'#EC4899' },
  { id:'quddus',      ar:'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',            count:33,  color:'#14B8A6' },
]

export default function TasbeehPage() {
  const { counts, total, selectedDhikr, viewMode, increment, reset, setDhikr, setViewMode } = useTasbeehStore()
  
  const [showPicker, setShowPicker] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const activeDhikrId = selectedDhikr?.id || 'subhan'
  const dhikr = DHIKR_LIST.find(d => d.id === activeDhikrId) || DHIKR_LIST[0]
  const count = counts[activeDhikrId] || 0
  const target = dhikr.count
  const pct = Math.min((count / target) * 100, 100)
  const done = count >= target && count > 0

  const handleTap = useCallback(() => {
    increment('current', 1)
  }, [increment])

  const handleReset = () => { reset('current') }

  const selectDhikr = (d: typeof DHIKR_LIST[0]) => {
    setDhikr({ id:d.id, ar:d.ar, count:d.count })
    setShowPicker(false)
  }

  // Generate beads for SVG
  const numBeads = dhikr.count <= 34 ? dhikr.count : 33
  const activeBeadIndex = count % numBeads
  const beads = Array.from({ length: numBeads }).map((_, i) => {
    const angle = (i / numBeads) * 2 * Math.PI - Math.PI / 2
    const cx = 140 + 120 * Math.cos(angle)
    const cy = 140 + 120 * Math.sin(angle)
    const isActive = i <= activeBeadIndex && count > 0
    return { cx, cy, isActive, i }
  })

  // Dashboard Stats
  const stats = [
    { label: 'الورد الحالي', val: count, icon: '🤲' },
    { label: 'الهدف', val: target, icon: '🎯' },
    { label: 'المجموع الكلي', val: total, icon: '📈' },
  ]

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-24 flex flex-col relative" dir="rtl">
      
      {/* ── Header ───────────────────────────────────────── */}
      <header className="flex justify-between items-center px-6 py-6 sticky top-0 bg-warm-100/80 backdrop-blur-md z-30">
        <div className="w-10"></div>
        <h1 className="text-xl font-black text-primary-900">مسبحة رقمية</h1>
        <button onClick={() => setShowSettings(true)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-text-muted hover:text-primary-900 hover:shadow-md transition-all active:scale-95">
          <Settings size={20} />
        </button>
      </header>

      {/* ── Single View Mode ──────────────────────────────── */}
      {viewMode === 'single' && (
        <div className="flex-1 flex flex-col items-center px-6 animate-enter">
          
          {/* Circular Progress Counter with Beads */}
          <div className="relative w-[280px] h-[280px] mt-4 mb-8 flex items-center justify-center cursor-pointer group" onClick={handleTap}>
            {/* Outer decoration */}
            <div className="absolute inset-0 rounded-full border-[10px] border-primary-50/50 group-hover:scale-[1.02] transition-transform duration-300"></div>
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md">
              {/* Background dashed circle line */}
              <circle cx="140" cy="140" r="120" fill="none" stroke="#E5E5E0" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Render Beads */}
              {beads.map((b) => (
                <circle 
                  key={b.i} 
                  cx={b.cx} 
                  cy={b.cy} 
                  r={b.isActive ? "7" : "5"} 
                  fill={b.isActive ? (done ? "#D4A017" : "#064E3B") : "#D1D5DB"}
                  className="transition-all duration-300"
                />
              ))}
              
              {/* Current Progress Ring */}
              <circle cx="140" cy="140" r="120" fill="none" stroke={done ? "#D4A017" : "#064E3B"} strokeWidth="4"
                strokeDasharray={2 * Math.PI * 120} strokeDashoffset={(2 * Math.PI * 120) * (1 - pct/100)}
                strokeLinecap="round"
                className="transition-all duration-300 -rotate-90 origin-center opacity-30"
              />
            </svg>

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-[180px] h-[180px] rounded-full bg-gradient-to-br from-white to-warm-50 shadow-floating border border-white group-active:scale-95 transition-transform duration-100">
              <div className="text-6xl font-black text-primary-900 mb-1 font-arabic tracking-tight">{count}</div>
              <div className="text-sm font-bold text-primary-600/70">التسبيحة</div>
            </div>
          </div>

          {/* Dhikr Title */}
          <div className="text-center mb-8 px-4">
            <h2 className="text-2xl font-arabic font-black text-primary-900 mb-2 leading-tight">{dhikr.ar}</h2>
            <button onClick={() => setShowPicker(true)} className="text-xs font-bold text-gold-600 flex items-center justify-center gap-1 mx-auto bg-gold-50/80 px-4 py-1.5 rounded-full hover:bg-gold-100 transition-colors">
              تغيير الذكر <ChevronDown size={14} />
            </button>
          </div>

          {/* Counter Controls */}
          <div className="flex items-center gap-6 bg-white px-6 py-4 rounded-[2rem] shadow-sm border border-border-light mb-auto">
            <button onClick={() => count > 0 && increment('current', -1)} className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center text-primary-900 hover:bg-primary-50 transition-colors active:scale-95">
              <Minus size={24} />
            </button>
            
            <div className="text-2xl font-black text-primary-900 w-16 text-center font-arabic">
              {count}
            </div>
            
            <button onClick={handleTap} className="w-14 h-14 rounded-full bg-primary-900 text-white flex items-center justify-center shadow-md hover:bg-primary transition-transform active:scale-95">
              <Plus size={28} />
            </button>
          </div>

          {/* Reset Button */}
          <button onClick={handleReset} className="mt-8 mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-border-light text-text-muted hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
            <RotateCcw size={16} />
            <span className="text-xs font-bold">تصفير العداد</span>
          </button>
        </div>
      )}

      {/* ── List View Mode ────────────────────────────────── */}
      {viewMode === 'list' && (
        <div className="flex-1 px-6 pb-6 space-y-4 overflow-y-auto animate-enter">
          {DHIKR_LIST.map((d, i) => {
            const currentCount = counts[d.id] || 0
            const isDone = currentCount >= d.count && currentCount > 0
            const percent = Math.min((currentCount / d.count) * 100, 100)
            
            return (
              <div key={d.id} className="bg-white rounded-3xl p-4 border border-border-light shadow-sm relative overflow-hidden" style={{ animationDelay: `${i * 0.05}s` }}>
                {/* Progress bar background */}
                <div className="absolute top-0 left-0 bottom-0 bg-primary-50/40 transition-all duration-300" style={{ width: `${percent}%`, right: 0, left: 'auto' }}></div>
                
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-arabic font-black text-primary-900 mb-1 leading-snug">{d.ar}</h3>
                    <div className="text-xs font-semibold text-text-muted flex items-center gap-2">
                      <span>الهدف: {d.count}</span>
                      <span className="w-1 h-1 rounded-full bg-border-dark"></span>
                      <button onClick={(e) => { e.stopPropagation(); reset(d.id); }} className="text-red-400 hover:text-red-600 transition-colors">تصفير</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-2xl font-black text-primary-900 font-arabic w-12 text-center">{currentCount}</div>
                    <button onClick={() => increment(d.id, 1)} className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform active:scale-95 ${isDone ? 'bg-gold-500 text-white shadow-gold-500/30' : 'bg-primary-900 text-white shadow-primary-900/30'}`}>
                      <Plus size={24} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Bottom Stats ────────────────────────────── */}
      <div className="px-6 w-full grid grid-cols-3 gap-3 mb-4 mt-auto">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center gap-1 bg-white p-3 py-4 rounded-2xl shadow-sm border border-border-light">
            <span className="text-xl mb-1">{s.icon}</span>
            <span className="text-xl font-black text-primary-900">{formatNumber(s.val)}</span>
            <span className="text-[10px] font-bold text-text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Dhikr Picker Bottom Sheet ─────────────────── */}
      {showPicker && viewMode === 'single' && (
        <div className="relative z-[100]">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowPicker(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 bg-warm-50 rounded-t-[2rem] flex flex-col max-h-[85vh] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]" style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
            <div className="w-12 h-1.5 bg-border-dark/50 rounded-full mx-auto mt-4 mb-6"></div>
            <h3 className="text-xl font-black text-primary-900 px-6 mb-4 flex items-center justify-between">
              اختر الذكر
              <button onClick={() => setShowPicker(false)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-muted hover:text-primary-900 shadow-sm"><X size={16}/></button>
            </h3>
            
            <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-3">
              {DHIKR_LIST.map(d => (
                <button key={d.id} onClick={() => selectDhikr(d)}
                  className={`w-full flex items-center justify-between p-4 rounded-3xl border-2 transition-all ${dhikr.id === d.id ? 'border-primary-500 bg-white shadow-md' : 'border-transparent bg-white shadow-sm hover:border-border-light hover:bg-warm-100'}`}>
                  <div className="text-right">
                    <div className={`text-lg font-arabic font-black mb-1 ${dhikr.id === d.id ? 'text-primary-900' : 'text-primary-800'}`}>{d.ar}</div>
                    <div className="text-xs font-semibold text-text-muted">الهدف: {d.count} مرة</div>
                  </div>
                  {dhikr.id === d.id && (
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-sm shrink-0">
                      <Check size={18} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Settings Bottom Sheet ─────────────────────── */}
      {showSettings && (
        <div className="relative z-[100]">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowSettings(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 bg-warm-50 rounded-t-[2rem] flex flex-col pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]" style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
            <div className="w-12 h-1.5 bg-border-dark/50 rounded-full mx-auto mt-4 mb-6"></div>
            <h3 className="text-xl font-black text-primary-900 px-6 mb-6 flex items-center justify-between">
              إعدادات السبحة
              <button onClick={() => setShowSettings(false)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-muted hover:text-primary-900 shadow-sm"><X size={16}/></button>
            </h3>
            
            <div className="px-6 space-y-6 pb-safe">
              <div>
                <h4 className="text-sm font-bold text-text-muted mb-3 px-2">نمط العرض</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { setViewMode('single'); setShowSettings(false); }} 
                    className={`flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all ${viewMode === 'single' ? 'border-primary-500 bg-white shadow-md' : 'border-transparent bg-white shadow-sm hover:border-border-light text-text-muted'}`}
                  >
                    <CircleDot size={28} className={viewMode === 'single' ? 'text-primary-500' : ''} />
                    <span className={`text-sm font-bold ${viewMode === 'single' ? 'text-primary-900' : ''}`}>مسبحة واحدة</span>
                  </button>
                  <button 
                    onClick={() => { setViewMode('list'); setShowSettings(false); }} 
                    className={`flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all ${viewMode === 'list' ? 'border-primary-500 bg-white shadow-md' : 'border-transparent bg-white shadow-sm hover:border-border-light text-text-muted'}`}
                  >
                    <List size={28} className={viewMode === 'list' ? 'text-primary-500' : ''} />
                    <span className={`text-sm font-bold ${viewMode === 'list' ? 'text-primary-900' : ''}`}>قائمة الأذكار</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-text-muted mb-3 px-2">إجراءات سريعة</h4>
                <button onClick={() => { reset('current'); setShowSettings(false); }} className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-red-100 shadow-sm hover:bg-red-50 text-red-500 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <RotateCcw size={20} />
                  </div>
                  <span className="font-bold text-sm">تصفير العداد الحالي</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
