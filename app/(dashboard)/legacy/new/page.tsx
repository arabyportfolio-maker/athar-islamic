'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, Leaf, ChevronLeft, Upload, Globe, Lock, Check } from 'lucide-react'

const PAGE_TYPES = [
  { id:'deceased', label:'صدقة جارية', desc:'صفحة دعاء وترحّم', Icon: Heart,  color:'text-primary-900', bg:'bg-primary-50', border:'border-primary-100' },
  { id:'family',   label:'عائلة',     desc:'صفحة ذكر الأثر',   Icon: Users,  color:'text-gold-600', bg:'bg-warm-50', border:'border-gold-100' },
  { id:'campaign', label:'حملة خير', desc:'مشروع خيري',        Icon: Leaf,   color:'text-primary', bg:'bg-primary-50', border:'border-primary-100' },
]

type Step = 1|2|3

export default function NewLegacyPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({ name:'', type:'deceased', bio:'', visibility:'public', country:'' })

  const steps = [
    { n:1, label:'النوع'    },
    { n:2, label:'التفاصيل' },
    { n:3, label:'مراجعة'  },
  ]

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="bg-primary-900 text-white rounded-b-[2rem] pt-6 pb-8 px-6 shadow-floating relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">إنشاء صفحة أثر</h1>
          <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <ChevronLeft size={20} />
          </button>
        </div>
        
        {/* Progress steps */}
        <div className="relative z-10 flex items-center justify-between max-w-sm mx-auto px-4">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${s.n < step ? 'bg-gold-500 text-primary-900' : s.n === step ? 'bg-white text-primary-900 shadow-[0_0_0_4px_rgba(255,255,255,0.2)]' : 'bg-white/20 text-white/50'}`}>
                {s.n < step ? <Check size={20} /> : s.n}
              </div>
              <span className={`text-xs font-bold ${s.n <= step ? 'text-white' : 'text-white/50'}`}>{s.label}</span>
            </div>
          ))}
          {/* Connecting lines */}
          <div className="absolute top-5 left-10 right-10 h-1 bg-white/20 -z-10">
            <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${((step-1)/2)*100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 max-w-md mx-auto">

        {/* ── Step 1: Choose type ────────────────────────── */}
        {step === 1 && (
          <div className="animate-enter">
            <h2 className="text-xl font-bold text-primary-900 mb-2">اختر نوع الصفحة</h2>
            <p className="text-text-muted font-semibold mb-6">حدد الغرض من صفحة الأثر لكي نتمكن من تخصيصها لك.</p>
            
            <div className="space-y-4">
              {PAGE_TYPES.map(t => (
                <button key={t.id} onClick={() => setForm(f => ({...f, type:t.id}))}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${form.type === t.id ? `border-primary ${t.bg} shadow-md scale-[1.02]` : 'border-border-light bg-white hover:border-primary-100'}`}>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${t.bg} ${t.color} ${t.border}`}>
                    <t.Icon size={28} />
                  </div>
                  <div className="flex-1 text-right">
                    <div className={`font-bold text-lg ${form.type === t.id ? 'text-primary-900' : 'text-text'}`}>{t.label}</div>
                    <div className="text-sm text-text-muted font-semibold mt-1">{t.desc}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${form.type === t.id ? 'bg-primary border-primary' : 'border-border'}`}>
                    {form.type === t.id && <Check size={14} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Details ────────────────────────────── */}
        {step === 2 && (
          <div className="animate-enter">
            <h2 className="text-xl font-bold text-primary-900 mb-2">التفاصيل الأساسية</h2>
            <p className="text-text-muted font-semibold mb-6">أدخل معلومات صفحة الأثر لتظهر للزوار</p>

            <div className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-border-light">
              
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 rounded-2xl bg-primary-50 text-primary-700 cursor-pointer hover:bg-primary-100 transition-colors">
                <Upload size={32} className="mb-2" />
                <span className="font-bold text-sm">أضف صورة (اختياري)</span>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))}
                  placeholder="مثال: صدقة جارية عن والدي"
                  className="w-full px-4 py-3 rounded-xl border border-border-light bg-warm-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">البلد (اختياري)</label>
                <input value={form.country} onChange={e => setForm(f=>({...f,country:e.target.value}))}
                  placeholder="مصر، السعودية..."
                  className="w-full px-4 py-3 rounded-xl border border-border-light bg-warm-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">نبذة (اختياري)</label>
                <textarea value={form.bio} onChange={e => setForm(f=>({...f,bio:e.target.value}))}
                  placeholder="اكتب بضع كلمات عن الفقيد أو المشروع..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border-light bg-warm-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all font-semibold resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2">الخصوصية</label>
                <div className="flex gap-3">
                  {[{id:'public',label:'عام',Icon:Globe},{id:'private',label:'خاص',Icon:Lock}].map(v => (
                    <button key={v.id} onClick={() => setForm(f=>({...f,visibility:v.id}))}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border-2 ${form.visibility === v.id ? 'border-primary bg-primary-50 text-primary-900' : 'border-transparent bg-warm-50 text-text-muted hover:bg-warm-100'}`}>
                      <v.Icon size={18} /> {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Review ─────────────────────────────── */}
        {step === 3 && (
          <div className="animate-enter">
            <h2 className="text-xl font-bold text-primary-900 mb-2">مراجعة أخيرة</h2>
            <p className="text-text-muted font-semibold mb-6">تحقق من صحة المعلومات قبل النشر</p>

            <div className="bg-white rounded-3xl p-8 border border-border-light shadow-sm text-center mb-6">
              {(() => {
                const tc = PAGE_TYPES.find(t => t.id === form.type)!
                return (
                  <>
                    <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center border-2 mb-4 ${tc.bg} ${tc.color} ${tc.border}`}>
                      <tc.Icon size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">{form.name || 'الاسم غير محدد'}</h3>
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border bg-primary-50 text-primary-900 border-primary-100 font-bold text-sm mb-6">
                      {tc.label}
                    </div>
                    {form.bio && <p className="text-text-muted font-semibold leading-relaxed px-4">{form.bio}</p>}
                  </>
                )
              })()}
            </div>

            <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100 flex items-start gap-3">
              <div className="mt-0.5 text-primary-600"><Check size={20} /></div>
              <p className="text-sm font-bold text-primary-900">
                سيتم إنشاء الصفحة ويمكنك البدء في مشاركتها مع الأهل والأصدقاء لجمع الدعاء والأجر.
              </p>
            </div>
          </div>
        )}

        {/* ── Navigation Controls ────────────────────────── */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-warm-100 via-warm-100 to-transparent z-40">
          <div className="flex gap-4 max-w-md mx-auto">
            {step > 1 && (
              <button onClick={() => setStep(s => (s-1) as Step)}
                className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white text-primary-900 shadow-sm border border-border-light hover:bg-warm-50 transition-colors">
                <ChevronLeft size={24} className="rotate-180" />
              </button>
            )}
            <button
              onClick={() => { if (step < 3) setStep(s => (s+1) as Step); else router.push('/legacy') }}
              disabled={step===2 && !form.name.trim()}
              className={`flex-1 h-14 rounded-2xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2 ${step===2 && !form.name.trim() ? 'bg-warm-200 text-text-muted shadow-none cursor-not-allowed' : 'bg-primary-900 text-white hover:bg-primary hover:shadow-lg hover:-translate-y-0.5'}`}>
              {step === 3 ? 'تأكيد وإنشاء' : 'متابعة'} {step < 3 && <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
