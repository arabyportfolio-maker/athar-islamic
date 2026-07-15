'use client'
import { useState } from 'react'
import { Users, TrendingUp, Trophy, Globe, Star, Award, Flame } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

const LEADERBOARD = [
  { rank:1, name:'أحمد محمد',    country:'SA', count:12458, streak:7,  avatar:'أ', color:'text-gold-500', bg:'bg-gold-50' },
  { rank:2, name:'فاطمة علي',    country:'EG', count:11200, streak:12, avatar:'ف', color:'text-text-muted', bg:'bg-warm-100' },
  { rank:3, name:'عمر إبراهيم',  country:'KW', count:9870,  streak:5,  avatar:'ع', color:'text-[#B45309]', bg:'bg-orange-50' },
  { rank:4, name:'خالد عبدالله', country:'AE', count:8543,  streak:9,  avatar:'خ', color:'text-primary-800', bg:'bg-primary-50' },
  { rank:5, name:'مريم حسن',     country:'JO', count:7200,  streak:3,  avatar:'م', color:'text-primary-800', bg:'bg-primary-50' },
  { rank:6, name:'يوسف ناصر',    country:'QA', count:6890,  streak:8,  avatar:'ي', color:'text-primary-800', bg:'bg-primary-50' },
  { rank:7, name:'سارة محمد',    country:'BH', count:5400,  streak:2,  avatar:'س', color:'text-primary-800', bg:'bg-primary-50' },
]

const GLOBAL_STATS = [
  { icon:<Users size={24}/>,    val:'245,980,000', label:'تسبيحة إجمالية', color:'text-primary-900', bg:'bg-primary-50' },
  { icon:<Globe size={24}/>,    val:'18,542',       label:'مستخدم نشط',     color:'text-gold-600', bg:'bg-warm-50' },
  { icon:<TrendingUp size={24}/>,val:'125,430',     label:'جلسة اليوم',     color:'text-primary', bg:'bg-primary-50' },
  { icon:<Award size={24}/>,    val:'8,245',         label:'ختمة قرآن',      color:'text-gold-600', bg:'bg-warm-50' },
]

type CommunityTab = 'leaderboard' | 'global' | 'challenges'

export default function CommunityPage() {
  const [tab, setTab] = useState<CommunityTab>('leaderboard')

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">

      {/* ── Header ───────────────────────────────────────── */}
      <header className="bg-primary-900 text-white rounded-b-[2rem] pt-6 pb-6 px-6 shadow-floating relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">المجتمع</h1>
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {([
            { id:'leaderboard', label:'المتصدرون', icon:<Trophy size={16}/> },
            { id:'global',      label:'الإحصائيات', icon:<Globe size={16}/> },
            { id:'challenges',  label:'التحديات',   icon:<Star size={16}/> },
          ] as const).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${tab === t.id ? 'bg-gold-500 text-primary-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 pt-6">

        {/* ── Leaderboard ──────────────────────────────── */}
        {tab === 'leaderboard' && (
          <div className="animate-enter">
            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-2 mb-8 pt-4">
              {[1,0,2].map(idx => {
                const p = LEADERBOARD[idx]
                const heights = ['h-24', 'h-32', 'h-20']
                const bgColors = ['bg-warm-200', 'bg-gold-200', 'bg-orange-200']
                const textColors = ['text-text-muted', 'text-gold-700', 'text-[#B45309]']
                const crownColors = ['text-text-muted', 'text-gold-500', 'text-[#B45309]']
                
                return (
                  <div key={p.rank} className="flex flex-col items-center flex-1">
                    <div className={`text-xs font-bold mb-2 ${textColors[idx]}`}>{p.name.split(' ')[0]}</div>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black mb-2 relative z-10 shadow-md border-4 border-white ${p.bg} ${p.color}`}>
                      {p.avatar}
                      <div className={`absolute -top-4 text-xl ${crownColors[idx]}`}>
                        {idx===1 ? <Trophy size={20} className="fill-current" /> : <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm">{p.rank}</div>}
                      </div>
                    </div>
                    <div className={`w-full ${heights[idx]} ${bgColors[idx]} rounded-t-2xl border border-white flex justify-center pt-2 relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
                      <span className={`text-sm font-black relative z-10 ${textColors[idx]}`}>{formatNumber(p.count)}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Full list */}
            <div className="space-y-3">
              {LEADERBOARD.slice(3).map((p, i) => (
                <div key={p.rank} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-border-light shadow-sm">
                  <div className="w-6 text-center text-sm font-black text-text-muted shrink-0">{p.rank}</div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black shrink-0 ${p.bg} ${p.color}`}>
                    {p.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-primary-900">{p.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-text-muted bg-warm-50 px-2 py-0.5 rounded">{p.country}</span>
                      <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded"><Flame size={12}/> {p.streak} أيام</span>
                    </div>
                  </div>
                  <div className="text-left shrink-0">
                    <div className="text-base font-black text-primary-900">{formatNumber(p.count)}</div>
                    <div className="text-[10px] font-bold text-text-muted">تسبيحة</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Global Stats ──────────────────────────────── */}
        {tab === 'global' && (
          <div className="animate-enter">
            <div className="bg-primary-900 rounded-3xl p-8 mb-6 text-center shadow-floating relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
              <div className="text-sm font-bold text-primary-200 mb-2 relative z-10">مجتمع أثر الإسلامي</div>
              <div className="text-4xl font-black text-white mb-2 relative z-10 tracking-tight">245,980,000</div>
              <div className="text-xs font-bold text-primary-200 relative z-10">تسبيحة مشتركة</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {GLOBAL_STATS.map((s, i) => (
                <div key={i} className="bg-white rounded-3xl p-5 border border-border-light shadow-sm text-center flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${s.bg} ${s.color}`}>
                    {s.icon}
                  </div>
                  <div className={`text-xl font-black mb-1 ${s.color}`}>{s.val}</div>
                  <div className="text-xs font-bold text-text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Challenges ───────────────────────────────── */}
        {tab === 'challenges' && (
          <div className="animate-enter space-y-4">
            {[
              { title:'تحدي الختمة الشهرية',     participants:1245, goal:'ختمة قرآن',     deadline:'15 يوم', color:'text-primary-900', bg:'bg-primary-50', border:'border-primary-200', joined:true  },
              { title:'تحدي 500 تسبيحة يومياً',   participants:3872, goal:'500 تسبيحة',    deadline:'مستمر',  color:'text-gold-600', bg:'bg-warm-50', border:'border-gold-200', joined:false },
              { title:'تحدي أذكار الصباح 30 يوم', participants:892,  goal:'أذكار الصباح',  deadline:'22 يوم', color:'text-primary', bg:'bg-primary-50', border:'border-primary-100', joined:false },
            ].map((ch, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-border-light shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-primary-900 mb-2">{ch.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5"><Users size={14}/> {formatNumber(ch.participants)}</span>
                      <span className="w-1 h-1 rounded-full bg-border"></span>
                      <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">{ch.deadline}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${ch.color} ${ch.bg} ${ch.border}`}>{ch.goal}</span>
                </div>
                
                <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${ch.joined ? 'bg-warm-50 text-gold-600 border border-gold-200' : 'bg-primary-900 text-white shadow-md hover:bg-primary'}`}>
                  {ch.joined ? '✓ منضم بالفعل' : 'انضم للتحدي'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
