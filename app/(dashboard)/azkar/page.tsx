'use client'
import { useState } from 'react'
import { Sun, Moon, Sunrise, Sunset, BookOpen, Coffee, Heart, ChevronLeft, Search, Plus, Minus, Bookmark } from 'lucide-react'
import { AZKAR } from '@/data/azkar'

const CATEGORIES = [
  { id:'morning', label:'أذكار الصباح', icon: '🌅', color:'text-orange-500', count:14 },
  { id:'evening', label:'أذكار المساء', icon: '🌇', color:'text-purple-500', count:12 },
  { id:'prayer',  label:'أذكار الصلاة', icon: '🕌', color:'text-primary-600', count:18 },
  { id:'sleep',   label:'أذكار النوم',  icon: '🌙', color:'text-blue-500', count:8  },
  { id:'eating',  label:'أذكار الطعام', icon: '🍽️', color:'text-amber-600', count:6  },
  { id:'general', label:'أذكار متنوعة', icon: '📿', color:'text-red-500', count:20 },
]

export default function AzkarPage() {
  const [activeCategory, setActiveCategory] = useState<string|null>(null)
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState<typeof AZKAR[0]|null>(null)
  const [count, setCount]     = useState(0)

  const displayAzkar = AZKAR.filter(a =>
    (!activeCategory || a.category === activeCategory) &&
    (!search || a.arabic.includes(search) || a.translation?.includes(search))
  )

  if (selected) {
    return (
      <div className="min-h-screen bg-warm-100 font-sans pb-24 flex flex-col" dir="rtl">
        {/* ── Header ───────────────────────────────────────── */}
        <header className="flex justify-between items-center px-6 py-6 bg-white shadow-sm sticky top-0 z-20">
          <div className="w-10 h-10"></div> {/* Spacer */}
          <h1 className="text-xl font-bold text-primary-900">تفاصيل ذكر</h1>
          <button onClick={() => { setSelected(null); setCount(0) }} className="w-10 h-10 flex items-center justify-center rounded-full bg-warm-100 text-text-muted hover:text-primary transition-colors">
            <ChevronLeft size={20} />
          </button>
        </header>

        <div className="flex-1 px-6 py-6 flex flex-col">
          {/* Dhikr Card */}
          <div className="bg-white rounded-3xl p-6 shadow-floating border border-border-light relative overflow-hidden mb-auto">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-sm font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded-full mb-6 flex items-center gap-2">
                <BookOpen size={14} /> {selected.category === 'morning' ? 'أذكار الصباح' : 'ذكر'}
              </div>

              <h2 className="text-3xl font-arabic font-bold text-primary-900 leading-loose mb-6">
                {selected.arabic}
              </h2>

              {selected.translation && (
                <p className="text-sm text-text-muted leading-relaxed mb-6 border-t border-border-light pt-6 w-full">
                  {selected.translation}
                </p>
              )}

              <div className="text-sm font-semibold text-primary px-4 py-2 bg-primary-50 rounded-full">
                الهدف: {selected.count} مرات
              </div>
            </div>
          </div>

          {/* Counter Controls */}
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center justify-between bg-white px-8 py-5 rounded-full shadow-card border border-border-light">
              <button onClick={() => setCount(c => Math.max(0, c-1))} className="w-14 h-14 rounded-full bg-warm-100 flex items-center justify-center text-primary-900 hover:bg-primary-50 transition-colors">
                <Minus size={24} />
              </button>
              
              <div className="text-4xl font-bold text-primary-900 w-20 text-center font-arabic">
                {count}
              </div>
              
              <button onClick={() => setCount(c => Math.min(c+1, selected.count*2))} className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-primary hover:bg-primary-800 transition-transform active:scale-95">
                <Plus size={28} />
              </button>
            </div>

            <button className="w-full py-4 rounded-2xl bg-primary-900 text-white font-bold text-lg shadow-md hover:bg-primary-800 transition-colors flex items-center justify-center gap-2">
              <Bookmark size={20} /> إضافة ذكر
            </button>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-24" dir="rtl">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="flex justify-between items-center px-6 py-6 bg-white shadow-sm sticky top-0 z-20">
        <div className="w-10 h-10"></div> {/* Spacer */}
        <h1 className="text-xl font-bold text-primary-900">الأذكار</h1>
        <button onClick={() => activeCategory ? setActiveCategory(null) : window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-warm-100 text-text-muted hover:text-primary transition-colors">
          <ChevronLeft size={20} />
        </button>
      </header>

      <div className="px-6 pt-6">
        {/* Search */}
        {!activeCategory && (
          <div className="relative mb-8">
            <Search size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-text-muted" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث في الأذكار..."
              className="w-full py-4 pr-12 pl-4 rounded-2xl bg-white border border-border-light shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
            />
          </div>
        )}

        {/* Categories List (Screen 10) */}
        {!activeCategory && (
          <div className="space-y-3">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-border-light hover:border-primary-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-50 flex items-center justify-center text-2xl shadow-sm">
                    {cat.icon}
                  </div>
                  <span className="font-bold text-lg text-primary-900 group-hover:text-primary transition-colors">{cat.label}</span>
                </div>
                <ChevronLeft size={20} className="text-text-muted" />
              </button>
            ))}
          </div>
        )}

        {/* Azkar List for a specific category */}
        {activeCategory && (
          <div className="space-y-3 animate-enter">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-primary-900">
                {CATEGORIES.find(c => c.id === activeCategory)?.label}
              </h2>
              <span className="text-sm font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded-full">
                {displayAzkar.length} أذكار
              </span>
            </div>

            {displayAzkar.map((a, i) => (
              <button key={a.id} onClick={() => { setSelected(a); setCount(0) }}
                className="w-full text-right bg-white rounded-2xl p-5 border border-border-light shadow-sm hover:border-primary-200 transition-all group"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex justify-between items-start gap-4">
                  <p className="text-lg font-arabic font-bold text-primary-900 leading-loose flex-1 group-hover:text-primary transition-colors">
                    {a.arabic.length > 80 ? a.arabic.slice(0,80) + '...' : a.arabic}
                  </p>
                  <ChevronLeft size={20} className="text-text-muted mt-2 shrink-0" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs font-bold text-primary bg-primary-50 px-3 py-1 rounded-md">
                    {a.count} مرات
                  </span>
                </div>
              </button>
            ))}

            {displayAzkar.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold">لم يُعثر على أذكار</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
