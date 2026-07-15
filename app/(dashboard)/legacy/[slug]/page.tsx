'use client'
import { useState, use } from 'react'
import { MOCK_MEMORIAL_PAGES } from '@/lib/constants'
import { formatNumber } from '@/lib/utils'
import { Bird, MapPin, Users, BookMarked, MessageSquare, HandHeart, RefreshCcw, Send, Activity, Share2, Copy, ChevronLeft } from 'lucide-react'

const ACTIVITIES = [
  { name:'مصطفى أحمد',  action:'سبّح 100 مرة',         time:'منذ دقيقة',   Icon: HandHeart },
  { name:'فاطمة محمد',  action:'قرأت سورة الفاتحة',    time:'منذ 3 دقائق', Icon: BookMarked },
  { name:'عبد الرحمن',  action:'دعا بدعاء خاص',        time:'منذ 5 دقائق', Icon: HandHeart },
  { name:'أم عبد الله', action:'أضافت تعليقاً',         time:'منذ 8 دقائق', Icon: MessageSquare },
]

export default function MemorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const page = MOCK_MEMORIAL_PAGES.find(p => p.slug === slug) || MOCK_MEMORIAL_PAGES[0]
  const [activeAction, setActiveAction] = useState<string|null>(null)
  const [counter, setCounter] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    { name:'أحمد علي',    text:'رحمه الله وأسكنه فسيح جناته',    time:'أمس'     },
    { name:'مريم حسن',   text:'اللهم اجعل قبره روضة من رياض الجنة', time:'منذ يومين' },
  ])

  const ACTIONS = [
    { id:'tasbeeh', Icon: HandHeart,     label:'تسبيح',    color:'text-primary-900', bg:'bg-primary-50', border:'border-primary-100' },
    { id:'quran',   Icon: BookMarked,    label:'قرآن',     color:'text-gold-600', bg:'bg-warm-50', border:'border-gold-100' },
    { id:'dua',     Icon: HandHeart,     label:'دعاء',     color:'text-primary', bg:'bg-primary-50', border:'border-primary-100' },
    { id:'comment', Icon: MessageSquare, label:'تعليق',    color:'text-text-muted', bg:'bg-warm-50', border:'border-border-light' },
  ]

  const addComment = () => {
    if (!comment.trim()) return
    setComments(c => [{ name:'أنت', text:comment.trim(), time:'الآن' }, ...c])
    setComment('')
    setActiveAction(null)
  }

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32" dir="rtl">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm border-b border-border-light">
        <div className="w-10"></div> {/* Spacer */}
        <h1 className="text-lg font-bold text-primary-900 truncate px-4">{page.name}</h1>
        <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-warm-100 hover:bg-warm-200 transition-colors">
          <ChevronLeft size={20} className="text-text-muted" />
        </button>
      </div>

      {/* ── Cover & Avatar ─────────────────────────────── */}
      <div className="relative mb-16">
        <div className="h-40 bg-primary-900 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-48 h-48 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
        </div>
        
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-3xl bg-white border-4 border-warm-100 shadow-floating flex items-center justify-center text-gold-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gold-50/50"></div>
            <Bird size={40} strokeWidth={1.5} className="relative z-10" />
          </div>
        </div>
      </div>

      <div className="px-6">
        
        {/* ── Info ───────────────────────────────────────── */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-900 mb-1">{page.name}</h1>
          <p className="text-sm font-bold text-text-muted mb-2">رحمه الله</p>
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-text-muted">
            {page.date && <span>{page.date}</span>}
            {page.country && (
              <>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span className="flex items-center gap-1"><MapPin size={12}/> {page.country}</span>
              </>
            )}
          </div>
        </div>

        {page.bio && (
          <div className="bg-white rounded-3xl p-5 mb-6 border border-border-light shadow-sm text-center">
            <p className="text-sm font-semibold text-text-muted leading-relaxed">"{page.bio}"</p>
          </div>
        )}

        {/* ── Stats ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { n:formatNumber(page.participants), l:'مشارك',  Icon: Users, c:'text-primary-900', bg:'bg-primary-50' },
            { n:formatNumber(page.tasbeeh),      l:'تسبيحة', Icon: HandHeart, c:'text-gold-600', bg:'bg-warm-50' },
            { n:'3',                              l:'ختمة',   Icon: BookMarked, c:'text-primary', bg:'bg-primary-50' },
          ].map(s => (
            <div key={s.l} className="bg-white rounded-2xl p-4 text-center border border-border-light shadow-sm flex flex-col items-center">
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.c} flex items-center justify-center mb-2`}>
                <s.Icon size={20} />
              </div>
              <div className={`text-lg font-bold ${s.c} mb-1`}>{s.n}</div>
              <div className="text-[10px] font-bold text-text-muted">{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── Actions ────────────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-primary-900 mb-4 px-2">شارك الأجر</h2>
          <div className="grid grid-cols-2 gap-3">
            {ACTIONS.map(a => (
              <button key={a.id} onClick={() => setActiveAction(activeAction === a.id ? null : a.id)}
                className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all duration-300 ${activeAction === a.id ? `${a.bg} ${a.border} shadow-md scale-[1.02]` : 'bg-white border-border-light shadow-sm hover:border-primary-100'}`}>
                <div className={`mb-3 ${activeAction === a.id ? a.color : 'text-text-muted'}`}>
                  <a.Icon size={32} />
                </div>
                <span className={`font-bold text-sm ${activeAction === a.id ? a.color : 'text-text'}`}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Action Panels ──────────────────────────────── */}
        <div className="mb-8">
          {activeAction === 'tasbeeh' && (
            <div className="animate-enter bg-primary-900 rounded-3xl p-8 text-center shadow-floating relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
              <p className="text-xl font-bold text-primary-200 mb-6 relative z-10">سبحان الله وبحمده</p>
              <div className="text-6xl font-black text-white mb-8 font-arabic relative z-10">{counter}</div>
              <div className="flex justify-center gap-4 relative z-10">
                <button onClick={() => setCounter(c => c + 1)} className="w-20 h-20 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-lg hover:bg-gold-400 hover:scale-105 active:scale-95 transition-all">
                  <HandHeart size={36} />
                </button>
                <button onClick={() => setCounter(0)} className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all self-end mb-3">
                  <RefreshCcw size={20} />
                </button>
              </div>
            </div>
          )}

          {activeAction === 'comment' && (
            <div className="animate-enter bg-white rounded-3xl p-5 border border-border-light shadow-sm">
              <textarea value={comment} onChange={e => setComment(e.target.value)}
                placeholder="اكتب كلمة طيبة أو دعاء للفقيد..."
                rows={3}
                className="w-full p-4 rounded-2xl border border-border-light bg-warm-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all font-semibold resize-none mb-4"
              />
              <button onClick={addComment} className="w-full py-4 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-800 transition-colors">
                <Send size={18} /> نشر التعليق
              </button>
            </div>
          )}
        </div>

        {/* ── Activity Feed ──────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-primary-900 mb-4 px-2 flex items-center gap-2">
            <Activity size={20} className="text-primary" /> الأنشطة الحية
          </h2>
          <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 ${i < ACTIVITIES.length-1 ? 'border-b border-border-light' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-warm-50 flex items-center justify-center text-primary shrink-0">
                  <a.Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-primary-900 mb-0.5">{a.name}</div>
                  <div className="text-xs font-semibold text-text-muted">{a.action}</div>
                </div>
                <div className="text-[10px] font-bold text-text-muted">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Comments ───────────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-primary-900 mb-4 px-2 flex items-center gap-2">
            <MessageSquare size={20} className="text-gold-600" /> التعليقات
          </h2>
          <div className="space-y-3">
            {comments.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-border-light shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-primary-900">{c.name}</span>
                  <span className="text-[10px] font-bold text-text-muted bg-warm-50 px-2 py-1 rounded-md">{c.time}</span>
                </div>
                <p className="text-sm font-semibold text-text-muted leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Share ──────────────────────────────────────── */}
        <div className="bg-primary-50 rounded-3xl p-6 text-center border border-primary-100 mt-12 mb-8 relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-primary-900 shadow-sm mb-4 relative z-10">
            <Share2 size={28} />
          </div>
          <h3 className="text-lg font-bold text-primary-900 mb-2 relative z-10">شارك الصفحة مع عائلتك</h3>
          <p className="text-xs text-primary-700 font-semibold mb-6 relative z-10">الدال على الخير كفاعله، انشر الصفحة لتعم الفائدة.</p>
          
          <button onClick={() => navigator.clipboard?.writeText(`https://athar-islamic.com/legacy/${page.slug}`)}
            className="w-full py-4 rounded-xl bg-primary-900 text-white font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary transition-colors relative z-10">
            <Copy size={18} /> نسخ الرابط
          </button>
        </div>

      </div>
    </div>
  )
}
