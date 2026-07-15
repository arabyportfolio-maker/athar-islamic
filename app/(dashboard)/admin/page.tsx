'use client'
import { useState } from 'react'
import { Users, Activity, Settings, AlertCircle, CheckCircle, Search, Shield, ChevronLeft } from 'lucide-react'

const USERS = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', role: 'مشرف', status: 'active', joined: '12 مايو 2024' },
  { id: '2', name: 'فاطمة علي', email: 'fatima@example.com', role: 'مستخدم', status: 'active', joined: '10 مايو 2024' },
  { id: '3', name: 'عمر خالد', email: 'omar@example.com', role: 'مستخدم', status: 'inactive', joined: '5 مايو 2024' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="bg-primary-900 text-white rounded-b-[2rem] pt-8 pb-8 px-6 shadow-floating relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shrink-0 shadow-inner">
            <Shield size={28} className="text-gold-400" />
          </div>
          <div>
            <h1 className="text-xl font-black mb-1">لوحة الإدارة</h1>
            <p className="text-xs font-semibold text-primary-200">التحكم الكامل في المنصة والمستخدمين</p>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {/* ── Stats Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 animate-enter">
          <div className="bg-white rounded-3xl p-4 border border-border-light shadow-sm relative overflow-hidden">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-50 rounded-full opacity-50"></div>
            <div className="flex items-center gap-3 mb-2 relative">
              <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-900 flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <span className="text-xs font-bold text-text-muted">المستخدمين</span>
            </div>
            <div className="text-2xl font-black text-primary-900 relative">1,248</div>
            <div className="text-[10px] font-bold text-green-500 mt-1 relative flex items-center gap-1">
              <CheckCircle size={10} /> +12 هذا الأسبوع
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-border-light shadow-sm relative overflow-hidden">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gold-50 rounded-full opacity-50"></div>
            <div className="flex items-center gap-3 mb-2 relative">
              <div className="w-8 h-8 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                <Activity size={16} />
              </div>
              <span className="text-xs font-bold text-text-muted">النشاط اليومي</span>
            </div>
            <div className="text-2xl font-black text-primary-900 relative">485</div>
            <div className="text-[10px] font-bold text-green-500 mt-1 relative flex items-center gap-1">
              <CheckCircle size={10} /> نشط الآن
            </div>
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className="flex gap-2 p-1.5 bg-warm-200 rounded-2xl animate-enter" style={{ animationDelay: '0.05s' }}>
          {[
            { id: 'users', label: 'المستخدمين' },
            { id: 'reports', label: 'التقارير' },
            { id: 'settings', label: 'الإعدادات' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white text-primary-900 shadow-sm' : 'text-text-muted hover:bg-white/50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content Area ───────────────────────────────── */}
        {activeTab === 'users' && (
          <div className="animate-enter" style={{ animationDelay: '0.1s' }}>
            {/* Search */}
            <div className="relative mb-4">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="ابحث عن مستخدم..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-border-light rounded-2xl text-sm font-semibold text-primary-900 shadow-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* List */}
            <div className="bg-white border border-border-light rounded-3xl shadow-sm overflow-hidden">
              {USERS.filter(u => u.name.includes(search) || u.email.includes(search)).map((user, i) => (
                <div key={user.id} className={`p-4 flex items-center gap-3 transition-colors hover:bg-warm-50 cursor-pointer ${i < USERS.length - 1 ? 'border-b border-border-light' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center font-black text-primary-900 shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-primary-900 truncate">{user.name}</h3>
                      {user.role === 'مشرف' && (
                        <span className="px-1.5 py-0.5 bg-gold-100 text-gold-700 text-[9px] font-black rounded-md">مشرف</span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-text-muted truncate">{user.email}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-400'}`}></div>
                    <ChevronLeft size={16} className="text-border-dark" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'users' && (
          <div className="text-center py-12 animate-enter" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-3 text-border-dark">
              {activeTab === 'reports' ? <AlertCircle size={28} /> : <Settings size={28} />}
            </div>
            <h3 className="text-sm font-black text-primary-900 mb-1">قريباً</h3>
            <p className="text-xs font-semibold text-text-muted">هذا القسم قيد التطوير حالياً</p>
          </div>
        )}
      </div>
    </div>
  )
}
