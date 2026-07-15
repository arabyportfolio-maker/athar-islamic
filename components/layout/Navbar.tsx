'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Globe, ChevronRight, User } from 'lucide-react'

const TITLES: Record<string, string> = {
  '/tasbeeh':'/tasbeeh', '/quran':'القرآن', '/azkar':'الأذكار',
  '/legacy':'صفحات الأثر', '/community':'المجتمع',
  '/profile':'ملفي', '/settings':'الإعدادات', '/notifications':'الإشعارات',
  '/profile/stats':'إحصائياتي', '/profile/history':'سجل النشاط',
  '/profile/favorites':'المفضلة', '/profile/goals':'أهدافي',
  '/prayer-times':'مواقيت الصلاة',
}

import { useState, useEffect } from 'react'

export function Navbar() {
  const path     = usePathname()
  const isHome   = path === '/home'
  const title    = TITLES[path]
  const isSubpage = path.match(/\/(profile|quran|legacy)\/.+/)

  const [unread, setUnread] = useState(0)

  useEffect(() => {
    import('@/store/userStore').then(({ useUserStore }) => {
      const user = useUserStore.getState().user
      if (user) {
        import('@/lib/supabase').then(({ supabase }) => {
          supabase.from('notifications')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false)
            .then(({ count }) => setUnread(count || 0))
        })
      }
    })
  }, [])

  const backHref = path.startsWith('/profile/') ? '/profile'
    : path.startsWith('/quran/')   ? '/quran'
    : path.startsWith('/legacy/')  ? '/legacy'
    : '/'

  return (
    <header style={{
      position:'sticky', top:0, zIndex:80,
      background:'rgba(248,249,250,0.94)',
      backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
      borderBottom:'1px solid rgba(229,231,235,0.8)',
      padding:'0 16px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      minHeight:'58px', gap:'12px',
    }}>

      {/* Right side */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', overflow:'hidden' }}>
        {isSubpage ? (
          <Link href={backHref} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'6px', color:'#064E3B', fontSize:'14px', fontWeight:600, whiteSpace:'nowrap', flexShrink:0 }}>
            <ChevronRight size={18} /> رجوع
          </Link>
        ) : isHome ? (
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#064E3B,#065F46)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 10h2v10h12V10h2L12 2z" fill="rgba(255,255,255,0.9)"/>
                <path d="M9 14h6v6H9z" fill="rgba(255,255,255,0.5)"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:'16px', fontWeight:900, color:'#064E3B', lineHeight:1.1 }}>أثر إسلامي</div>
              <div style={{ fontSize:'10px', color:'#9CA3AF' }}>منصتك الإسلامية</div>
            </div>
          </div>
        ) : title ? (
          <span style={{ fontSize:'17px', fontWeight:800, color:'#111827', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{title}</span>
        ) : null}
      </div>

      {/* Left side */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
        {!isSubpage && (
          <>
            {/* Prayer times shortcut */}
            <Link href="/prayer-times" style={{ textDecoration:'none' }}>
              <button style={{ width:'38px', height:'38px', borderRadius:'50%', background:'#F9FAFB', border:'1px solid #E5E7EB', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
              </button>
            </Link>

            {/* Notifications */}
            <Link href="/notifications" style={{ textDecoration:'none', position:'relative' }}>
              <button style={{ width:'38px', height:'38px', borderRadius:'50%', background:'#F9FAFB', border:'1px solid #E5E7EB', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Bell size={18} color="#374151" />
                {unread > 0 && (
                  <span style={{ position:'absolute', top:'-2px', left:'-2px', width:'18px', height:'18px', borderRadius:'50%', background:'#EF4444', color:'#fff', fontSize:'10px', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #F8F9FA' }}>
                    {unread}
                  </span>
                )}
              </button>
            </Link>

            {/* Avatar */}
            <Link href="/profile" style={{ textDecoration:'none' }}>
              <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#064E3B,#065F46)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'2px solid #fff', boxShadow:'0 2px 8px rgba(6,78,59,0.2)' }}>
                <User size={18} color="#fff" />
              </div>
            </Link>
          </>
        )}

        {/* Sub-page: show title on left side */}
        {isSubpage && title && (
          <span style={{ fontSize:'16px', fontWeight:800, color:'#111827' }}>{title}</span>
        )}
      </div>
    </header>
  )
}
