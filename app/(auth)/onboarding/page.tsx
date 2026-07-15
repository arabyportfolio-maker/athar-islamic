'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

const SLIDES = [
  { icon:'🌿', color:'text-primary-900', bg:'bg-warm-100', iconBg:'bg-gradient-to-br from-primary-800 to-primary-900', title:'مرحباً في أثر إسلامي', sub:'بيئتك الإسلامية الرقمية المتكاملة', desc:'اذكر الله · اقرأ القرآن · اترك أثراً يبقى' },
  { icon:'📿', color:'text-gold-600',    bg:'bg-warm-50',  iconBg:'bg-gradient-to-br from-gold-500 to-orange-500', title:'عبادة يومية منظمة',      sub:'ابدأ يومك بذكر الله وأنهه بشكره',   desc:'أذكار الصباح والمساء · عداد التسبيح · ورد القرآن' },
  { icon:'📜', color:'text-primary-900', bg:'bg-warm-100', iconBg:'bg-gradient-to-br from-primary-800 to-primary-900', title:'اترك أثراً يبقى',       sub:'أنشئ صفحة أثر لمن تحب',             desc:'ادعُ لمن تحب · شارك أعمال الخير بنية صالحة' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const slide = SLIDES[step]

  return (
    <div className={`min-h-screen ${slide.bg} font-sans flex flex-col transition-colors duration-500 relative overflow-hidden`} dir="rtl">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-700"></div>

      {/* Skip */}
      <div className="flex justify-start p-6 relative z-10">
        <Link href="/home" className="text-sm font-bold text-text-muted hover:text-primary-900 transition-colors">تخطي</Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">
        {/* Icon */}
        <div key={step} className={`w-32 h-32 rounded-[2rem] ${slide.iconBg} flex items-center justify-center text-6xl mb-10 shadow-floating text-white border border-white/20 animate-enter`}>
          {slide.icon}
        </div>

        <h1 key={`title-${step}`} className="text-3xl font-black text-primary-900 mb-3 animate-enter" style={{animationDelay: '0.1s'}}>
          {slide.title}
        </h1>
        <p key={`sub-${step}`} className={`text-lg font-bold ${slide.color} mb-3 animate-enter`} style={{animationDelay: '0.15s'}}>
          {slide.sub}
        </p>
        <p key={`desc-${step}`} className="text-sm font-semibold text-text-muted leading-relaxed max-w-xs animate-enter" style={{animationDelay: '0.2s'}}>
          {slide.desc}
        </p>
      </div>

      {/* Dots + Button */}
      <div className="p-8 pb-12 flex flex-col items-center gap-8 relative z-10">
        {/* Dots */}
        <div className="flex gap-2.5">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setStep(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary-900' : 'w-2.5 bg-border-dark hover:bg-primary-300'}`} />
          ))}
        </div>

        {/* Button */}
        {step < 2 ? (
          <button onClick={() => setStep(s => s + 1)} className="w-full py-4 rounded-xl bg-primary-900 text-white font-bold text-lg shadow-floating hover:bg-primary transition-all flex items-center justify-center gap-2">
            التالي <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="w-full flex flex-col gap-3 animate-enter">
            <Link href="/register" className="block">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-800 to-primary-900 text-white font-bold text-lg shadow-floating hover:opacity-90 transition-opacity">
                إنشاء حساب مجاني 🚀
              </button>
            </Link>
            <Link href="/login" className="block">
              <button className="w-full py-3.5 rounded-xl bg-transparent text-primary-900 border-2 border-primary-900 font-bold text-base hover:bg-primary-50 transition-colors">
                لديّ حساب — دخول
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
