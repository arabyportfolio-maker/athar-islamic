import type { Metadata, Viewport } from 'next'
import './globals.css'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

export const metadata: Metadata = {
  title: { template: '%s | أثر إسلامي', default: 'أثر إسلامي' },
  description: 'منصة إسلامية متكاملة للتسبيح والأذكار والقرآن وصفحات الأثر',
  keywords: ['أذكار', 'تسبيح', 'قرآن', 'إسلامي', 'athar', 'islamic'],
  authors: [{ name: 'El Araby 360 Digital Agency', url: 'https://www.facebook.com/ElAraby360D' }],
}

export const viewport: Viewport = { themeColor: '#059669', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin:0, padding:0, fontFamily:"Cairo, 'Inter', sans-serif" }}>
        {children}
        <WhatsAppButton />

        {/* ── El Araby 360 Footer ─────────────────────────── */}
        <footer style={{
          position:'fixed', bottom:0, left:0, right:0, zIndex:60,
          textAlign:'center', padding:'3px 0 4px',
          fontSize:'10px', color:'#9CA3AF',
          background:'rgba(255,255,255,0.85)',
          backdropFilter:'blur(6px)',
          WebkitBackdropFilter:'blur(6px)',
          borderTop:'1px solid rgba(229,231,235,0.5)',
          pointerEvents:'none',
        }}>
          <span style={{ pointerEvents:'all' }}>
            تم التصميم بواسطة{' '}
            <a href="https://www.facebook.com/ElAraby360D" target="_blank" rel="noopener noreferrer"
               style={{ color:'#059669', fontWeight:700, textDecoration:'none' }}>
              El Araby 360 Digital Agency
            </a>
          </span>
        </footer>

        {/* Global animation keyframes */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>
      </body>
    </html>
  )
}
