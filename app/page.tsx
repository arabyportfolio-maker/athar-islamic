'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const nextStep = () => setStep(s => Math.min(s + 1, 4))
  const skip = () => router.push('/home')

  return (
    <div className="min-h-screen bg-warm-100 flex flex-col font-sans relative overflow-hidden transition-colors duration-500" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-700"></div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-6 py-12 relative z-10">
        
        {/* Step 1: Welcome (Screen 1) */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center animate-enter">
            <div className="w-32 h-32 rounded-full bg-white shadow-floating flex items-center justify-center mb-8 border border-border-light relative">
              <div className="absolute inset-2 border-2 border-gold-400 rounded-full border-dashed opacity-50 animate-[spin_10s_linear_infinite]"></div>
              <span className="text-6xl text-gold-500">📖</span>
            </div>
            
            <h1 className="text-3xl font-black text-primary-900 mb-4 font-arabic">أثر إسلامي</h1>
            <p className="text-lg font-bold text-primary-800 mb-12">
              "خيركم من تعلم القرآن وعلمه"
            </p>

            <div className="w-full space-y-4 mt-auto">
              <button 
                onClick={nextStep}
                className="w-full py-4 rounded-xl bg-primary-900 text-white font-bold text-lg shadow-floating hover:bg-primary transition-colors"
              >
                إنشاء حساب
              </button>
              <Link href="/login" className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-primary-900 font-bold text-lg border border-border-light shadow-sm hover:bg-warm-50 transition-colors">
                تسجيل الدخول
              </Link>
              <button 
                onClick={skip}
                className="w-full py-3 text-text-muted font-bold hover:text-primary-900 transition-colors"
              >
                تخطي
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Features (Screen 2) */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-enter">
            <div className="text-center mb-10 mt-8">
              <h2 className="text-2xl font-black text-primary-900 mb-2">المميزات</h2>
              <p className="text-sm font-semibold text-text-muted">كل ما تحتاجه في مكان واحد</p>
            </div>

            <div className="space-y-4">
              {[
                { icon: '📿', title: 'تسبيح و أذكار', desc: 'عداد ذكي وأذكار يومية مخصصة' },
                { icon: '🌿', title: 'صفحات الصدقة الجارية', desc: 'أنشئ صفحة لمن تحب وشاركها' },
                { icon: '📖', title: 'القرآن الكريم', desc: 'تلاوة وقراءة بأفضل تجربة مستخدم' },
                { icon: '🌍', title: 'مجتمع إسلامي وتحديات', desc: 'تنافس في الخيرات مع الآخرين' }
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-border-light hover:bg-warm-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl text-primary-900 shrink-0 border border-primary-100">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-primary-900">{f.title}</h3>
                    <p className="text-xs font-semibold text-text-muted mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <button 
                onClick={nextStep}
                className="w-full py-4 rounded-xl bg-primary-900 text-white font-bold text-lg shadow-floating hover:bg-primary transition-colors flex items-center justify-center gap-2"
              >
                التالي <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Language (Screen 3) */}
        {step === 3 && (
          <div className="flex-1 flex flex-col animate-enter">
            <div className="text-center mb-10 mt-8">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-border-light mx-auto flex items-center justify-center mb-4 text-2xl">
                🌍
              </div>
              <h2 className="text-2xl font-black text-primary-900 mb-2">اختيار اللغة المفضلة</h2>
              <p className="text-sm font-semibold text-text-muted">يمكنك تغييرها لاحقاً من الإعدادات</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'ar', name: 'العربية' },
                { id: 'en', name: 'English' },
                { id: 'fr', name: 'Français' },
                { id: 'ur', name: 'اردو' }
              ].map((lang) => (
                <label key={lang.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${lang.id === 'ar' ? 'border-primary-500 bg-primary-50/50' : 'border-transparent bg-white shadow-sm hover:border-primary-200'}`}>
                  <span className="font-bold text-lg text-primary-900">{lang.name}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${lang.id === 'ar' ? 'border-primary-500' : 'border-border-dark'}`}>
                    {lang.id === 'ar' && <div className="w-3 h-3 rounded-full bg-primary-500" />}
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <button 
                onClick={nextStep}
                className="w-full py-4 rounded-xl bg-primary-900 text-white font-bold text-lg shadow-floating hover:bg-primary transition-colors flex items-center justify-center gap-2"
              >
                التالي <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Create Account (Screen 4) */}
        {step === 4 && (
          <div className="flex-1 flex flex-col animate-enter">
            <div className="text-center mb-8 mt-4">
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary-800 to-primary-900 shadow-floating text-white mx-auto flex items-center justify-center mb-4 border border-white/20">
                <span className="text-3xl">🌿</span>
              </div>
              <h2 className="text-2xl font-black text-primary-900 mb-2">مرحباً بك</h2>
              <p className="text-sm font-semibold text-text-muted">أنشئ حسابك للبدء في ترك أثرك</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.push('/home'); }}>
              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">الاسم</label>
                <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-border-light bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-sans text-sm shadow-sm" placeholder="الاسم الكامل" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full px-4 py-3.5 rounded-xl border border-border-light bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-sans text-sm shadow-sm" placeholder="example@mail.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">كلمة المرور</label>
                <input type="password" className="w-full px-4 py-3.5 rounded-xl border border-border-light bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-sans text-sm shadow-sm" placeholder="••••••••" />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary-900 text-white font-bold text-lg shadow-floating hover:bg-primary transition-colors flex items-center justify-center"
                >
                  إنشاء حساب 🚀
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm font-semibold text-text-muted">
              لديك حساب؟ <Link href="/login" className="text-gold-600 font-bold hover:text-gold-700 transition-colors">تسجيل الدخول</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
