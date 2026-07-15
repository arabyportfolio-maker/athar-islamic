'use client'
import { useState } from 'react'
import { Bell, CheckCircle, Info, Star, Users, Clock, X, BookMarked } from 'lucide-react'

type NotifType = 'prayer'|'dhikr'|'community'|'quran'|'system'
const TYPE_CFG: Record<NotifType,{Icon:React.ElementType;color:string;bg:string;border:string}> = {
  prayer:    { Icon:Clock,      color:'text-primary-900', bg:'bg-primary-50', border:'border-primary-200' },
  dhikr:     { Icon:Star,       color:'text-gold-600',    bg:'bg-warm-50',    border:'border-gold-200' },
  community: { Icon:Users,      color:'text-orange-500',  bg:'bg-orange-50',  border:'border-orange-200' },
  quran:     { Icon:BookMarked, color:'text-[#7C3AED]',   bg:'bg-[#EDE9FE]',  border:'border-[#C4B5FD]' },
  system:    { Icon:Info,       color:'text-text-muted',  bg:'bg-warm-200',   border:'border-border-light' },
}

const NOTIFICATIONS = [
  { id:'1', type:'prayer'    as NotifType, title:'وقت الصلاة',          body:'حان وقت صلاة المغرب — 18:21',    time:'الآن',       read:false },
  { id:'2', type:'dhikr'     as NotifType, title:'تذكير الأذكار',        body:'أذكار الصباح — ابدأ يومك بذكر الله', time:'10د',     read:false },
  { id:'3', type:'community' as NotifType, title:'تحدي جديد',            body:'انضم لتحدي الختمة الشهرية',      time:'1س',        read:false },
  { id:'4', type:'prayer'    as NotifType, title:'وقت الصلاة',          body:'حان وقت صلاة العصر — 15:43',    time:'3س',        read:true  },
  { id:'5', type:'quran'     as NotifType, title:'ورد القرآن اليومي',    body:'تابع قراءة سورة البقرة — الآية 45', time:'5س',    read:true  },
  { id:'6', type:'community' as NotifType, title:'شارك في مجتمع أثر',   body:'أحمد بدأ جلسة تسبيح جماعية',   time:'أمس',       read:true  },
  { id:'7', type:'system'    as NotifType, title:'تحديث التطبيق',        body:'إصدار جديد متاح — تحديثات مهمة', time:'أمس',      read:true  },
]

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS)
  const unread = notifs.filter(n => !n.read).length

  const markRead    = (id: string) => setNotifs(ns => ns.map(n => n.id===id ? {...n,read:true} : n))
  const dismiss     = (id: string) => setNotifs(ns => ns.filter(n => n.id!==id))
  const markAllRead = () => setNotifs(ns => ns.map(n => ({...n,read:true})))

  const groups = [
    { label:'جديدة',    items: notifs.filter(n => !n.read) },
    { label:'مقروءة',   items: notifs.filter(n => n.read)  },
  ].filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">

      {/* ── Header ───────────────────────────────────────── */}
      <header className="bg-primary-900 text-white rounded-b-[2rem] pt-6 pb-6 px-6 shadow-floating relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">الإشعارات</h1>
            {unread > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                {unread}
              </span>
            )}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs font-bold text-primary-200 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle size={14} /> قراءة الكل
            </button>
          )}
        </div>
      </header>

      <div className="px-6 space-y-6">
        {groups.map(group => (
          <div key={group.label}>
            <h2 className="text-sm font-bold text-text-muted mb-3 px-2">{group.label}</h2>
            <div className="space-y-3">
              {group.items.map((n, i) => {
                const tc = TYPE_CFG[n.type]
                return (
                  <div key={n.id} onClick={() => markRead(n.id)} className={`animate-enter relative flex items-start gap-3 bg-white p-4 rounded-3xl border shadow-sm cursor-pointer transition-colors hover:bg-warm-50 ${n.read ? 'border-border-light' : 'border-primary-200 bg-primary-50/30'}`} style={{ animationDelay: `${i * 0.05}s` }}>
                    
                    {/* Unread indicator */}
                    {!n.read && (
                      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary-900" />
                    )}

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${tc.bg} ${tc.color} ${tc.border}`}>
                      <tc.Icon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${n.read ? 'font-bold text-primary-900' : 'font-black text-primary-900'}`}>{n.title}</span>
                        <span className="text-[10px] font-bold text-text-muted pr-4">{n.time}</span>
                      </div>
                      <p className={`text-xs ${n.read ? 'font-semibold text-text-muted' : 'font-bold text-primary-800'}`}>{n.body}</p>
                    </div>

                    {/* Dismiss */}
                    <button onClick={e => { e.stopPropagation(); dismiss(n.id) }} className="self-center shrink-0 w-8 h-8 rounded-lg bg-warm-100 flex items-center justify-center text-text-muted hover:bg-warm-200 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {notifs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-4 text-border-dark">
              <Bell size={32} />
            </div>
            <p className="text-sm font-bold text-text-muted">لا توجد إشعارات</p>
          </div>
        )}
      </div>
    </div>
  )
}
