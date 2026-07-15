'use client'
import Link from 'next/link'
import { signUp } from '@/lib/supabase'
import { useState } from 'react'
import { Eye, EyeOff, ChevronRight } from 'lucide-react'

const COUNTRIES = ['مصر','السعودية','الإمارات','الكويت','قطر','البحرين','الأردن','المغرب','الجزائر','تونس','ليبيا','السودان','تركيا','أخرى']
const LANGS     = ['العربية','English','Français','Türkçe','Indonesian']

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', pass:'', country:'مصر', lang:'العربية', terms:false })
  const [showPass, setShowPass] = useState(false)

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.terms) return alert('يرجى الموافقة على الشروط')
    setLoading(true)
    const { error, data } = await signUp(form.email, form.pass, form.name)
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('تم إنشاء الحساب بنجاح! يرجى تأكيد بريدك الإلكتروني إذا طلب منك ذلك.')
      window.location.href = '/login'
    }
  }

  const inpClass = "w-full px-4 py-3.5 rounded-xl border border-border-light bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-sans text-sm shadow-sm text-primary-900"

  return (
    <div className="min-h-screen bg-warm-100 font-sans flex flex-col relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto px-6 py-10 flex-1 relative z-10 flex flex-col justify-center">
        
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary-900 font-bold mb-8 hover:text-primary transition-colors">
          <ChevronRight size={20} /> رجوع
        </Link>

        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center text-3xl mb-4 shadow-floating text-white border border-primary-700/50">🌿</div>
          <h1 className="text-2xl font-black text-primary-900 mb-2">أنشئ حسابك</h1>
          <p className="text-sm font-semibold text-text-muted">ابدأ رحلتك في أثر إسلامي اليوم</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-primary-900 mb-2">الاسم الكامل *</label>
            <input className={inpClass} placeholder="أحمد محمد" value={form.name} onChange={e => set('name', e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary-900 mb-2">البريد الإلكتروني *</label>
            <input type="email" className={inpClass} placeholder="example@email.com" value={form.email} onChange={e => set('email', e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary-900 mb-2">كلمة المرور *</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} className={`${inpClass} pl-12`} placeholder="••••••••" value={form.pass} onChange={e => set('pass', e.target.value)} required />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-900 transition-colors">
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-primary-900 mb-2">الدولة</label>
              <select className={`${inpClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236B7280%22%3E%3Cpath%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:left_12px_center]`} value={form.country} onChange={e => set('country', e.target.value)}>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-primary-900 mb-2">اللغة</label>
              <select className={`${inpClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236B7280%22%3E%3Cpath%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:left_12px_center]`} value={form.lang} onChange={e => set('lang', e.target.value)}>
                {LANGS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer pt-2 pb-2">
            <input type="checkbox" checked={form.terms} onChange={e => set('terms', e.target.checked)} className="mt-1 w-4 h-4 rounded border-border-light text-primary-900 focus:ring-primary-900 shrink-0" />
            <span className="text-xs font-semibold text-text-muted leading-relaxed">
              أوافق على{' '}
              <span className="text-gold-600 font-bold hover:text-gold-700 transition-colors">شروط الاستخدام وسياسة الخصوصية</span>
            </span>
          </label>

          <button type="submit" disabled={loading} className="w-full py-4 mt-2 rounded-xl bg-primary-900 text-white font-bold text-base shadow-floating hover:bg-primary transition-all disabled:opacity-70 flex items-center justify-center">
            {loading ? '⏳ جاري الإنشاء...' : 'إنشاء الحساب 🚀'}
          </button>
        </form>

        <p className="text-center text-sm font-semibold text-text-muted mt-8">
          لديك حساب؟{' '}
          <Link href="/login" className="text-gold-600 font-bold hover:text-gold-700 transition-colors">سجّل الدخول</Link>
        </p>
      </div>
    </div>
  )
}
