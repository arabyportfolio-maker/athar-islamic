'use client'
import Link from 'next/link'
import { use } from 'react'
import { MOCK_MEMORIAL_PAGES } from '@/lib/constants'
import { ChevronLeft, Download, Copy } from 'lucide-react'

export default function QRPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const page = MOCK_MEMORIAL_PAGES.find(p => p.slug === slug) || MOCK_MEMORIAL_PAGES[0]
  const url  = `https://athar-islamic.com/legacy/${slug}`

  return (
    <div className="min-h-screen bg-warm-100 font-sans pb-32 flex flex-col items-center justify-center px-6" dir="rtl">

      {/* ── Card ───────────────────────────────────────── */}
      <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 text-center shadow-floating border border-border-light relative overflow-hidden">
        
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

        {/* Header */}
        <div className="relative z-10 flex flex-col items-center gap-2 mb-8">
          <span className="text-3xl">🌿</span>
          <span className="text-lg font-bold text-primary-900">أثر إسلامي</span>
        </div>

        {/* QR Placeholder */}
        <div className="relative z-10 w-56 h-56 mx-auto rounded-3xl bg-gradient-to-br from-primary-50 to-warm-50 border-2 border-primary-200 mb-6 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="grid grid-cols-7 gap-1 p-5 w-full h-full">
            {Array.from({length:49},(_,i) => {
              const corners = [0,1,2,3,4,5,6, 7,13, 14,20, 21,27, 28,29,30,31,32,33,34, 42,48, 35,41, 43,44,45,46,47,48]
              const isDark  = corners.includes(i) || (i > 14 && i < 34 && Math.random() > 0.55)
              return <div key={i} className={`w-full h-full rounded-[2px] ${isDark ? 'bg-primary-900' : 'bg-transparent'}`} />
            })}
          </div>
        </div>

        {/* Info */}
        <div className="relative z-10 mb-8">
          <h2 className="text-xl font-bold text-primary-900 mb-1">{page.name}</h2>
          <p className="text-xs font-semibold text-text-muted break-all px-4">{url}</p>
        </div>

        {/* Instructions */}
        <div className="relative z-10 bg-warm-50 rounded-2xl p-4 border border-border-light mb-6">
          <p className="text-xs font-bold text-primary-900 leading-relaxed">
            امسح هذا الكود بكاميرا هاتفك للوصول المباشر لصفحة الأثر والمشاركة في الأجر.
          </p>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex flex-col gap-3">
          <button className="w-full py-3.5 rounded-xl bg-primary-900 text-white font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary transition-colors">
            <Download size={18} /> حفظ الصورة
          </button>
          <button onClick={() => navigator?.clipboard?.writeText(url)} className="w-full py-3.5 rounded-xl bg-white border border-border-light text-primary-900 font-bold flex items-center justify-center gap-2 hover:bg-warm-50 transition-colors">
            <Copy size={18} /> نسخ الرابط
          </button>
        </div>
      </div>

      <Link href={`/legacy/${slug}`} className="mt-8 flex items-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors">
        <ChevronLeft size={16} className="rotate-180" /> العودة للصفحة
      </Link>
    </div>
  )
}
