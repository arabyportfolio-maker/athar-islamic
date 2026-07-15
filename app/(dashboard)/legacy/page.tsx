'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Heart, Users, Leaf, Plus, TrendingUp, ChevronLeft } from 'lucide-react'
import { MOCK_MEMORIAL_PAGES } from '@/lib/constants'
import { formatNumber } from '@/lib/utils'

type FilterType = 'all' | 'deceased' | 'campaign' | 'family'

const TYPE_CFG = {
  deceased: { label:'صدقة جارية', color:'text-primary-900', bg:'bg-primary-50', border:'border-primary-100', Icon: Heart },
  family:   { label:'عائلة', color:'text-gold-600', bg:'bg-warm-50', border:'border-gold-100', Icon: Users },
  campaign: { label:'حملة خير', color:'text-primary', bg:'bg-primary-50', border:'border-primary-100', Icon: Leaf },
}

export default function LegacyPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('@/lib/supabase').then(({ supabase }) => {
      supabase.from('memorial_pages').select('*').order('created_at', { ascending: false }).then(({ data }) => {
        setPages(data || [])
        setLoading(false)
      })
    })
  }, [])

  const filtered = pages.filter(p =>
    (filter === 'all' || p.visibility === filter) && // default to all for now
    (!search || p.person_name?.includes(search))
  )

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-24" dir="rtl">
      
      {/* ── Header ───────────────────────────────────────── */}
      <header className="px-6 py-6 bg-white shadow-sm sticky top-0 z-20 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-900">صدقة جارية</h1>
        <Link href="/legacy/new" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-900 text-white shadow-md hover:bg-primary transition-colors">
          <Plus size={20} />
        </Link>
      </header>

      <div className="px-6 pt-6">

        {/* ── Search ─────────────────────────────────────── */}
        <div className="relative mb-6">
          <Search size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-text-muted" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن صفحة أثر..."
            className="w-full py-4 pr-12 pl-4 rounded-2xl bg-white border border-border-light shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text font-semibold"
          />
        </div>

        {/* ── Filters ────────────────────────────────────── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {([{id:'all',label:'الكل'},...Object.entries(TYPE_CFG).map(([id,v])=>({id,label:v.label}))]).map(f => (
            <button key={f.id} onClick={() => setFilter(f.id as FilterType)}
              className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${filter === f.id ? 'bg-primary-900 text-white shadow-md' : 'bg-white text-text-muted border border-border-light hover:bg-warm-50'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Campaigns List ─────────────────────────────── */}
        <div className="space-y-4">
          {filtered.map((page, i) => {
            const tc = TYPE_CFG[page.type as keyof typeof TYPE_CFG] || TYPE_CFG.deceased
            
            return (
              <div key={page.id} className="bg-white rounded-3xl overflow-hidden border border-border-light shadow-sm hover:shadow-floating transition-all animate-enter">
                <div className="p-5">
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${tc.bg} ${tc.color} ${tc.border}`}>
                      <tc.Icon size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-primary-900 mb-1">{page.person_name}</h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tc.bg} ${tc.color} ${tc.border}`}>
                          {tc.label}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted font-semibold">{page.created_at ? new Date(page.created_at).toLocaleDateString('ar-EG') : 'حملة مستمرة'}</p>
                    </div>
                  </div>

                  {page.biography && (
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {page.biography.slice(0,80)}...
                    </p>
                  )}

                  <div className="flex gap-3 mb-4 p-3 bg-warm-50 rounded-2xl border border-warm-100">
                    <div className="flex-1 flex items-center gap-3">
                      <Users size={16} className="text-text-muted" />
                      <div>
                        <div className="text-sm font-bold text-primary-900">{formatNumber(page.participants || 0)}</div>
                        <div className="text-[10px] font-bold text-text-muted">مشارك</div>
                      </div>
                    </div>
                    <div className="w-px bg-border-light"></div>
                    <div className="flex-1 flex items-center gap-3">
                      <TrendingUp size={16} className="text-text-muted" />
                      <div>
                        <div className="text-sm font-bold text-primary-900">{formatNumber(page.tasbeeh || 0)}</div>
                        <div className="text-[10px] font-bold text-text-muted">تسبيحة ودعاء</div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/legacy/${page.slug}`} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-50 text-primary-900 font-bold hover:bg-primary-100 transition-colors">
                    شارك الأجر <ChevronLeft size={18} />
                  </Link>

                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-text-muted opacity-30 mb-4" />
              <p className="text-text-muted font-bold">لا توجد صفحات مطابقة</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
