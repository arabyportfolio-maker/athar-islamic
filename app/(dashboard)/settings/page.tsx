'use client'
import { useState } from 'react'
import { User, Bell, Shield, Globe, Moon, Sun, ChevronLeft, Smartphone, Eye, EyeOff, LogOut, Trash2, ChevronRight, Check, Lock, Languages } from 'lucide-react'

type Section = {
  title: string
  items: {
    Icon: React.ElementType
    label:    string
    sub?:     string
    type:     'navigate' | 'toggle' | 'select'
    key?:     string
    options?: string[]
  }[]
}[]

const SECTIONS: Section = [
  {
    title: 'الحساب',
    items: [
      { Icon:User,      label:'تعديل الملف الشخصي', sub:'الاسم، الصورة، البلد', type:'navigate' },
      { Icon:Lock,      label:'تغيير كلمة المرور',   sub:'آخر تغيير: لم يتغير',  type:'navigate' },
      { Icon:Shield,    label:'الأمان والخصوصية',     sub:'الجلسات النشطة',       type:'navigate' },
    ]
  },
  {
    title: 'التطبيق',
    items: [
      { Icon:Bell,      label:'الإشعارات',         sub:'أذكار، مواقيت، تحديات', type:'toggle', key:'notifications' },
      { Icon:Moon,      label:'الوضع الداكن',      sub:'تغيير مظهر التطبيق',    type:'toggle', key:'dark'  },
      { Icon:Globe,     label:'لغة التطبيق',        sub:'العربية',               type:'navigate' },
      { Icon:Smartphone,label:'الإشعارات الصوتية', sub:'تنبيه الصلاة',          type:'toggle', key:'sound' },
    ]
  },
  {
    title: 'القرآن والأذكار',
    items: [
      { Icon:Eye,       label:'حجم خط القرآن',   sub:'متوسط',       type:'navigate' },
      { Icon:Languages, label:'لغة الترجمة',      sub:'الإنجليزية',  type:'navigate' },
    ]
  },
]

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string,boolean>>({ notifications:true, dark:false, sound:true })

  const toggle = (key: string) => setToggles(t => ({...t, [key]:!t[key]}))

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">

      {/* ── Header ───────────────────────────────────────── */}
      <header className="bg-primary-900 text-white rounded-b-[2rem] pt-6 pb-12 px-6 shadow-floating relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <h1 className="text-xl font-bold">الإعدادات</h1>
          
          {/* Profile mini-card */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-orange-500 border-2 border-white/20 shadow-md flex items-center justify-center text-2xl font-black text-white">
              أ
            </div>
            <div>
              <div className="text-lg font-bold">أحمد محمد عبد الله</div>
              <div className="text-sm font-semibold text-primary-200">ahmed@example.com</div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {SECTIONS.map(sec => (
          <div key={sec.title}>
            <h2 className="text-sm font-bold text-text-muted mb-3 px-2">{sec.title}</h2>
            <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
              {sec.items.map((item, i) => (
                <div key={item.label} className={`flex items-center gap-4 p-4 transition-colors ${item.type === 'navigate' ? 'cursor-pointer hover:bg-warm-50' : ''} ${i < sec.items.length-1 ? 'border-b border-border-light' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-900 shrink-0">
                    <item.Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-primary-900">{item.label}</div>
                    {item.sub && <div className="text-xs font-semibold text-text-muted">{item.sub}</div>}
                  </div>
                  
                  {item.type === 'toggle' && item.key && (
                    <button onClick={() => toggle(item.key!)} className={`w-12 h-6 rounded-full relative transition-colors ${toggles[item.key] ? 'bg-primary-900' : 'bg-border'} shrink-0`}>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${toggles[item.key] ? 'right-1' : 'right-7'}`} />
                    </button>
                  )}
                  {item.type === 'navigate' && <ChevronLeft size={20} className="text-text-muted" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── Danger Zone ────────────────────────────────── */}
        <div>
          <h2 className="text-sm font-bold text-red-500 mb-3 px-2">منطقة الخطر</h2>
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
            {[
              { Icon:LogOut, label:'تسجيل الخروج',  color:'text-red-500', bg:'bg-red-50', border:'border-red-100' },
              { Icon:Trash2, label:'حذف الحساب',     color:'text-red-600', bg:'bg-red-50', border:'border-red-200' },
            ].map((item, i) => (
              <div key={item.label} className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-red-50/50 transition-colors ${i===0 ? 'border-b border-red-100' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.bg} ${item.color} ${item.border}`}>
                  <item.Icon size={20} />
                </div>
                <span className={`font-bold text-sm ${item.color}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version */}
        <div className="text-center pt-4 pb-8">
          <div className="text-xs font-bold text-text-muted">أثر إسلامي</div>
          <div className="text-[10px] font-semibold text-border-dark mt-1">الإصدار 1.0.0</div>
        </div>
      </div>
    </div>
  )
}
