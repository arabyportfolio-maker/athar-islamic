'use client'
import { useState } from 'react'
import { BookOpen, CheckCircle2, ChevronLeft, Circle, Moon, Sun, Star } from 'lucide-react'

const WIRDS = [
  { id: '1', title: 'أذكار الصباح', time: 'بعد الفجر', icon: Sun, color: 'text-gold-500', bg: 'bg-gold-50', progress: 100, total: 20, done: 20, isCompleted: true },
  { id: '2', title: 'أذكار المساء', time: 'بعد العصر', icon: Moon, color: 'text-primary-900', bg: 'bg-primary-50', progress: 0, total: 20, done: 0, isCompleted: false },
  { id: '3', title: 'ورد القرآن', time: 'حسب اختيارك', icon: BookOpen, color: 'text-[#7C3AED]', bg: 'bg-[#EDE9FE]', progress: 50, total: 10, done: 5, isCompleted: false },
  { id: '4', title: 'ورد الاستغفار', time: 'طوال اليوم', icon: Star, color: 'text-orange-500', bg: 'bg-orange-50', progress: 30, total: 100, done: 30, isCompleted: false },
]

export default function WirdPage() {
  const [wirds, setWirds] = useState(WIRDS)

  const toggleWird = (id: string) => {
    setWirds(ws => ws.map(w => w.id === id ? { ...w, isCompleted: !w.isCompleted, done: !w.isCompleted ? w.total : 0, progress: !w.isCompleted ? 100 : 0 } : w))
  }

  const completedCount = wirds.filter(w => w.isCompleted).length
  const progressPercent = Math.round((completedCount / wirds.length) * 100)

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="bg-primary-900 text-white rounded-b-[2.5rem] pt-8 pb-10 px-6 shadow-floating relative overflow-hidden mb-6">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black mb-1">الورد اليومي</h1>
              <p className="text-sm font-semibold text-primary-200">حافظ على أورادك لترتقي درجات</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-xl font-black text-gold-400">{completedCount}</span>
              <span className="text-[10px] font-bold text-primary-100">من {wirds.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-primary-100">الإنجاز اليومي</span>
              <span className="text-sm font-black text-white">{progressPercent}%</span>
            </div>
            <div className="h-3 bg-primary-950/50 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div 
                className="h-full bg-gradient-to-l from-gold-400 to-gold-600 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjIiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="px-6 space-y-4">
        <h2 className="text-sm font-black text-text-muted px-2 mb-2">أوراد اليوم</h2>
        
        <div className="space-y-3">
          {wirds.map((wird, i) => (
            <div 
              key={wird.id} 
              onClick={() => toggleWird(wird.id)}
              className={`animate-enter relative flex items-center gap-4 bg-white p-4 rounded-3xl border shadow-sm cursor-pointer transition-all hover:scale-[1.01] ${wird.isCompleted ? 'border-primary-200 bg-primary-50/30' : 'border-border-light hover:border-primary-200'}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${wird.isCompleted ? 'bg-primary-900 text-white border-primary-800 shadow-md' : `${wird.bg} ${wird.color} border-transparent`}`}>
                <wird.icon size={24} className={wird.isCompleted ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-base mb-1 ${wird.isCompleted ? 'font-bold text-primary-900 line-through decoration-primary-200 decoration-2' : 'font-black text-primary-900'}`}>
                  {wird.title}
                </h3>
                <p className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-dark"></span>
                  {wird.time}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 flex items-center justify-center pr-2">
                {wird.isCompleted ? (
                  <div className="text-primary-900">
                    <CheckCircle2 size={28} className="fill-primary-100" />
                  </div>
                ) : (
                  <div className="text-border-dark hover:text-primary-500 transition-colors">
                    <Circle size={28} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Helper (if needed) */}
        {wirds.length === 0 && (
          <div className="text-center py-12 animate-enter">
            <div className="w-20 h-20 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-4 text-border-dark">
              <BookOpen size={32} />
            </div>
            <h3 className="text-sm font-black text-primary-900 mb-1">لا توجد أوراد</h3>
            <p className="text-xs font-semibold text-text-muted">أضف أوراداً جديدة للبدء في الإنجاز</p>
          </div>
        )}
      </div>
    </div>
  )
}
