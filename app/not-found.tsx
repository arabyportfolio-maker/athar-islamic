'use client'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ fontFamily:'Cairo,sans-serif', direction:'rtl', minHeight:'100vh', background:'#F8F9FA', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px', textAlign:'center' }}>
      <div style={{ width:'80px', height:'80px', borderRadius:'20px', background:'linear-gradient(135deg,#064E3B,#065F46)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'24px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
      </div>
      <h1 style={{ fontSize:'64px', fontWeight:900, color:'#064E3B', margin:'0 0 8px', lineHeight:1 }}>404</h1>
      <h2 style={{ fontSize:'22px', fontWeight:800, color:'#1A1A1A', margin:'0 0 10px' }}>الصفحة غير موجودة</h2>
      <p style={{ fontSize:'15px', color:'#6B7280', lineHeight:1.7, margin:'0 0 28px', maxWidth:'280px' }}>
        الصفحة التي تبحث عنها غير متوفرة أو انتقلت
      </p>
      <Link href="/home" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 24px', borderRadius:'12px', background:'linear-gradient(135deg,#064E3B,#065F46)', color:'#fff', fontSize:'15px', fontWeight:700, boxShadow:'0 6px 20px rgba(6,78,59,0.3)' }}>
        <Home size={18} /> العودة للرئيسية
      </Link>
    </div>
  )
}
