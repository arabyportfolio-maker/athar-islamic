'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, ChevronRight } from 'lucide-react'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [email, setEmail]       = useState('')
  const [pass, setPass]         = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    window.location.href = '/home'
  }

  return (
    <div className="min-h-screen bg-warm-100 font-sans flex flex-col relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto px-6 py-10 flex-1 relative z-10 flex flex-col justify-center">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary-900 font-bold mb-8 hover:text-primary transition-colors">
          <ChevronRight size={20} /> رجوع
        </Link>

        {/* Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center text-3xl mb-4 shadow-floating text-white border border-primary-700/50">🌿</div>
          <h1 className="text-2xl font-black text-primary-900 mb-2">مرحباً بعودتك!</h1>
          <p className="text-sm font-semibold text-text-muted">سجّل الدخول لحسابك في أثر إسلامي</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-primary-900 mb-2">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-3.5 rounded-xl border border-border-light bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-sans text-sm shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary-900 mb-2">كلمة المرور</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pl-12 rounded-xl border border-border-light bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-sans text-sm shadow-sm"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-900 transition-colors">
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-text-muted cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border-light text-primary-900 focus:ring-primary-900" />
              تذكرني
            </label>
            <button type="button" className="text-sm font-bold text-primary-900 hover:text-primary transition-colors">
              نسيت كلمة المرور؟
            </button>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 mt-2 rounded-xl bg-primary-900 text-white font-bold text-base shadow-floating hover:bg-primary transition-all disabled:opacity-70 flex items-center justify-center">
            {loading ? '⏳ جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border-light"></div>
          <span className="text-xs font-bold text-text-muted">أو</span>
          <div className="flex-1 h-px bg-border-light"></div>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <Link href="/home" className="block">
            <button className="w-full py-3.5 rounded-xl bg-white border border-border-light font-bold text-sm text-primary-900 shadow-sm flex items-center justify-center gap-3 hover:bg-warm-50 transition-colors">
              <span className="text-lg">G</span> الدخول بـ Google
            </button>
          </Link>
          <Link href="/home" className="block">
            <button className="w-full py-3.5 rounded-xl bg-primary-900 font-bold text-sm text-white shadow-md flex items-center justify-center gap-3 hover:bg-primary transition-colors">
              <span className="text-lg">🍎</span> الدخول بـ Apple
            </button>
          </Link>
          <Link href="/home" className="block">
            <button className="w-full py-3 rounded-xl bg-transparent font-bold text-sm text-text-muted hover:text-primary-900 transition-colors mt-2">
              المتابعة كضيف (بدون حساب)
            </button>
          </Link>
        </div>

        {/* Sign up */}
        <p className="text-center text-sm font-semibold text-text-muted mt-8">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="text-gold-600 font-bold hover:text-gold-700 transition-colors">أنشئ حساباً</Link>
        </p>
      </div>
    </div>
  )
}
