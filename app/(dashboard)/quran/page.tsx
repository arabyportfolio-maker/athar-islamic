'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronLeft, BookOpen, Bookmark } from 'lucide-react'
import { ALL_SURAHS, FEATURED_SURAHS, JUZ_LIST } from '@/data/quran-complete'

type Tab = 'surahs' | 'juz' | 'favorites'

const LAST_READ = { surah: 2, verse: 45, name: 'البقرة' }

export default function QuranPage() {
  const [tab, setTab] = useState<Tab>('surahs')
  const [search, setSearch] = useState('')

  const filtered = ALL_SURAHS.filter(s => {
    const matchSearch = !search || s.name.includes(search) || s.nameEn.toLowerCase().includes(search.toLowerCase()) || String(s.number).includes(search)
    return matchSearch
  })

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-24" dir="rtl">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="flex justify-between items-center px-6 py-6 bg-white shadow-sm sticky top-0 z-20">
        <div className="w-10 h-10"></div> {/* Spacer */}
        <h1 className="text-xl font-bold text-primary-900">القرآن الكريم</h1>
        <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-warm-100 text-text-muted hover:text-primary transition-colors">
          <ChevronLeft size={20} />
        </button>
      </header>

      <div className="px-6 pt-6">

        {/* ── Continue Reading Card (Screen 13) ──────────── */}
        <Link href={`/quran/${LAST_READ.surah}`} className="block mb-8 relative group overflow-hidden rounded-3xl bg-primary-900 text-white p-6 shadow-floating hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary-200 text-sm font-bold mb-3">
                <BookOpen size={16} /> تابع القراءة
              </div>
              <h2 className="text-3xl font-arabic font-bold mb-2">سورة {LAST_READ.name}</h2>
              <p className="text-sm text-primary-100 font-medium mb-6">الآية {LAST_READ.verse}</p>
              
              {/* Progress bar */}
              <div className="w-48 h-2 bg-primary-800 rounded-full overflow-hidden">
                <div className="h-full bg-gold-500 rounded-full" style={{ width: `${(LAST_READ.verse/286)*100}%` }}></div>
              </div>
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gold-500">
              <Bookmark size={32} fill="currentColor" />
            </div>
          </div>
        </Link>

        {/* ── Search ─────────────────────────────────────── */}
        <div className="relative mb-6">
          <Search size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-text-muted" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو الرقم..."
            className="w-full py-4 pr-12 pl-4 rounded-2xl bg-white border border-border-light shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
          />
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-border-light mb-6">
          {[
            { id: 'surahs', label: 'السور' },
            { id: 'juz', label: 'الأجزاء' },
            { id: 'favorites', label: 'مفضلة' }
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as Tab)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${tab === t.id ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:bg-warm-50'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Surahs List ────────────────────────────────── */}
        {tab === 'surahs' && (
          <div className="space-y-3">
            {filtered.map((s, i) => (
              <Link key={s.number} href={`/quran/${s.number}`} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-border-light hover:border-primary-100 transition-all group">
                <div className="flex items-center gap-4">
                  {/* Number Badge mimicking design */}
                  <div className="w-12 h-12 rounded-xl bg-warm-50 flex items-center justify-center relative shadow-sm border border-warm-100">
                    <div className="absolute inset-0 flex items-center justify-center rotate-45 border border-primary-100 rounded-lg scale-75 opacity-50"></div>
                    <span className="relative z-10 font-bold text-primary-900">{s.number}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-primary-900 group-hover:text-primary transition-colors flex items-center gap-2">
                      {s.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-1 font-semibold">
                      <span>{s.type}</span>
                      <span className="w-1 h-1 rounded-full bg-border"></span>
                      <span>{s.verses} آية</span>
                    </div>
                  </div>
                </div>
                
                <ChevronLeft size={20} className="text-text-muted group-hover:-translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        )}

        {/* ── Juz Tab ────────────────────────────────────── */}
        {tab === 'juz' && (
          <div className="grid grid-cols-3 gap-3 animate-enter">
            {JUZ_LIST.map(j => (
              <div key={j.juz} className="bg-white rounded-2xl p-4 text-center border border-border-light shadow-sm hover:border-primary-200 transition-all cursor-pointer group">
                <div className="text-2xl font-bold text-primary-900 group-hover:text-primary transition-colors font-arabic mb-1">
                  {j.juz}
                </div>
                <div className="text-xs font-semibold text-text-muted">
                  {j.surahs.length} سور
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Favorites Tab ──────────────────────────────── */}
        {tab === 'favorites' && (
          <div className="space-y-3 animate-enter">
            <h3 className="text-sm font-bold text-text-muted px-2 mb-2">السور المقترحة</h3>
            {FEATURED_SURAHS.map(s => (
              <Link key={s.number} href={`/quran/${s.number}`} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-border-light hover:border-primary-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md">
                    {s.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary-900 group-hover:text-primary transition-colors">
                      {s.name}
                    </h3>
                    <div className="text-xs text-text-muted mt-1 font-semibold">
                      {s.verses} آية · {s.type}
                    </div>
                  </div>
                </div>
                <ChevronLeft size={20} className="text-text-muted" />
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
