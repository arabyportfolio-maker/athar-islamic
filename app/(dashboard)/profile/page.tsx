'use client'
import Link from 'next/link'
import { Settings, BarChart2, Clock, Heart, Target, ChevronLeft, Award, Flame, BookMarked, Star } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

const STATS = [
  { val:'12,458', label:'تسبيحة', Icon: BarChart2, color:'text-primary-900', bg:'bg-primary-50' },
  { val:'1,245',  label:'جلسة',   Icon: Clock,     color:'text-gold-600', bg:'bg-warm-50' },
  { val:'22',     label:'ختمة',   Icon: BookMarked, color:'text-primary', bg:'bg-primary-50' },
]

const ACHIEVEMENTS = [
  { title:'المسبّح الأول',  desc:'1000 تسبيحة',   locked:false, Icon: Award, color:'text-gold-600', bg:'bg-warm-50', border:'border-gold-200' },
  { title:'حافظ القرآن',   desc:'ختمة كاملة',     locked:false, Icon: BookMarked, color:'text-primary-900', bg:'bg-primary-50', border:'border-primary-200' },
  { title:'المداوم',       desc:'30 يوم متواصل',  locked:true,  Icon: Flame, color:'text-text-muted', bg:'bg-warm-100', border:'border-border-light' },
  { title:'الداعي',        desc:'100 مشاركة',     locked:true,  Icon: Star, color:'text-text-muted', bg:'bg-warm-100', border:'border-border-light' },
]

const MENU = [
  { href:'/profile/stats',    label:'إحصائياتي',   Icon: BarChart2 },
  { href:'/profile/history',  label:'سجل النشاط',  Icon: Clock     },
  { href:'/profile/goals',    label:'أهدافي',       Icon: Target    },
  { href:'/profile/favorites',label:'المفضلة',      Icon: Heart     },
  { href:'/settings',         label:'الإعدادات',    Icon: Settings  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">

      {/* ── Cover + Avatar ─────────────────────────────── */}
      <div className="relative mb-20">
        <div className="h-40 bg-primary-900 rounded-b-[2rem] overflow-hidden relative shadow-floating">
           <div className="absolute top-0 right-0 w-48 h-48 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
           
           <Link href="/settings" className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all z-20">
             <Settings size={20} />
           </Link>
        </div>
        
        <div className="absolute -bottom-14 right-6 flex items-end gap-4 z-20">
          <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-gold-400 to-orange-500 border-4 border-warm-100 shadow-floating flex items-center justify-center text-3xl font-black text-white">
            أ
          </div>
          <div className="mb-2">
            <div className="text-xl font-bold text-primary-900 leading-tight">أحمد محمد عبد الله</div>
            <div className="text-sm font-semibold text-text-muted">@ahmed.muhammad</div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">

        {/* ── Stats ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-border-light shadow-sm flex flex-col items-center">
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-2`}>
                <s.Icon size={20} />
              </div>
              <div className={`text-lg font-black ${s.color} mb-1`}>{s.val}</div>
              <div className="text-[10px] font-bold text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Streak ─────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-warm-50 to-orange-50 rounded-3xl p-5 border border-orange-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="w-14 h-14 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0 relative z-10">
            <Flame size={28} className="text-orange-500" />
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-lg font-black text-orange-600 mb-0.5">7 أيام متواصلة</div>
            <div className="text-xs font-bold text-text-muted">سلسلة ذكر يومية</div>
          </div>
          <div className="relative z-10 flex gap-1 shrink-0">
            {Array.from({length:7},(_,i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i<7 ? 'bg-orange-500 shadow-sm' : 'bg-warm-200'}`} />
            ))}
          </div>
        </div>

        {/* ── Achievements ───────────────────────────────── */}
        <div>
          <h2 className="text-lg font-bold text-primary-900 mb-4 px-2 flex items-center gap-2">
            <Award size={20} className="text-gold-600" /> الإنجازات
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} className={`bg-white rounded-3xl p-5 border shadow-sm relative overflow-hidden ${a.locked ? 'border-border-light opacity-70' : a.border}`}>
                {!a.locked && <div className={`absolute top-0 left-0 w-12 h-12 ${a.bg} rounded-br-3xl`} />}
                {a.locked && <div className="absolute top-3 left-3 text-sm">🔒</div>}
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative z-10 ${a.bg} ${a.color}`}>
                  <a.Icon size={24} />
                </div>
                <div className={`font-bold text-sm mb-1 ${a.locked ? 'text-text-muted' : 'text-primary-900'}`}>{a.title}</div>
                <div className="text-xs font-semibold text-text-muted">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Menu ───────────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-bold text-primary-900 mb-4 px-2">الصفحات</h2>
          <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
            {MENU.map((item, i) => (
              <Link key={item.href} href={item.href} className={`flex items-center gap-4 p-4 transition-colors hover:bg-warm-50 ${i < MENU.length-1 ? 'border-b border-border-light' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-900 shrink-0">
                  <item.Icon size={20} />
                </div>
                <span className="flex-1 font-bold text-sm text-primary-900">{item.label}</span>
                <ChevronLeft size={20} className="text-text-muted" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
