'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, BookMarked, Heart, Coffee } from 'lucide-react'

// Custom Tasbeeh icon (circular beads)
const TasbeehIcon = ({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.5"/>
    <circle cx="19" cy="9" r="2"/>
    <circle cx="19" cy="15" r="2"/>
    <circle cx="12" cy="19" r="2.5"/>
    <circle cx="5" cy="15" r="2"/>
    <circle cx="5" cy="9" r="2"/>
    <path d="M12 7.5 L19 9"/>
    <path d="M19 11 L19 13"/>
    <path d="M19 17 L12 18.5"/>
    <path d="M12 18.5 L5 17"/>
    <path d="M5 13 L5 11"/>
    <path d="M5 9 L12 7.5"/>
  </svg>
)

const NAV_ITEMS = [
  { href:'/home',         label:'الرئيسية', Icon: Home       },
  { href:'/tasbeeh',      label:'التسبيح',  Icon: TasbeehIcon },
  { href:'/azkar',        label:'الأذكار',  Icon: BookOpen    },
  { href:'/quran',        label:'القرآن',   Icon: BookMarked  },
  { href:'/legacy',       label:'الأثر',    Icon: Heart       },
]

export function BottomNav() {
  const path = usePathname()

  return (
    <nav style={{
      position:'fixed', bottom:0, left:0, right:0, zIndex:100,
      background:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)',
      WebkitBackdropFilter:'blur(16px)',
      borderTop:'1px solid #E5E7EB',
      paddingBottom:'env(safe-area-inset-bottom,0px)',
      maxWidth:'480px', margin:'0 auto',
    }}>
      <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center', paddingTop:'6px', paddingBottom:'8px' }}>
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = path === href || (path.startsWith(href + '/') && href !== '/')
          return (
            <Link key={href} href={href} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', textDecoration:'none', flex:1, padding:'4px 0', color: active ? '#064E3B' : '#9CA3AF', position:'relative', transition:'color 0.2s' }}>
              {/* Active pill indicator */}
              {active && (
                <span style={{ position:'absolute', top:'-6px', left:'50%', transform:'translateX(-50%)', width:'32px', height:'3px', borderRadius:'0 0 4px 4px', background:'#064E3B', transition:'all 0.3s' }} />
              )}
              {/* Icon with scale */}
              <span style={{ transform: active ? 'scale(1.15)' : 'scale(1)', transition:'transform 0.25s cubic-bezier(.34,1.56,.64,1)', display:'flex' }}>
                <Icon size={22} color={active ? '#064E3B' : '#9CA3AF'} />
              </span>
              <span style={{ fontSize:'10px', fontFamily:'Cairo,sans-serif', fontWeight: active ? 700 : 500, letterSpacing:'0.2px' }}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
