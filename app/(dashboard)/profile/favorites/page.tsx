'use client'
import Link from 'next/link'
import { useState } from 'react'
import { AZKAR } from '@/data/azkar'
import { SURAHS } from '@/data/quran-surahs'

type FavTab = 'azkar' | 'surahs' | 'legacy'

const FAV_SURAHS = SURAHS.filter(s => [1,18,36,67,112].includes(s.number))
const FAV_AZKAR  = AZKAR.filter(a => ['m3','p1','g1','g4'].includes(a.id))
const FAV_PAGES  = [
  { name:'محمد عبد الله', slug:'mohammed-abdullah', icon:'🕊️' },
  { name:'ختمة لأهل غزة',  slug:'quran-for-gaza',   icon:'💚' },
]

export default function FavoritesPage() {
  const [tab, setTab] = useState<FavTab>('azkar')

  return (
    <div style={{ fontFamily:'Cairo,sans-serif', direction:'rtl', padding:'16px', paddingBottom:'100px' }}>

      {/* Tabs */}
      <div style={{ display:'flex', background:'#F3F4F6', borderRadius:'12px', padding:'4px', marginBottom:'16px', gap:'2px' }}>
        {[{id:'azkar',label:'أذكار ⭐'},{id:'surahs',label:'سور ⭐'},{id:'legacy',label:'أثر ⭐'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as FavTab)}
            style={{ flex:1, padding:'9px 4px', borderRadius:'9px', background: t.id===tab ? '#fff' : 'transparent', border:'none', fontFamily:'Cairo,sans-serif', fontSize:'13px', fontWeight: t.id===tab ? 700 : 500, color: t.id===tab ? '#1A1A1A' : '#9CA3AF', cursor:'pointer', boxShadow: t.id===tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition:'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Azkar Favorites */}
      {tab === 'azkar' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {FAV_AZKAR.map(d => (
            <div key={d.id} style={{ background:'#fff', borderRadius:'14px', padding:'14px', border:'1.5px solid #FDE68A', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                <span style={{ fontSize:'11px', color:'#D4A017', fontWeight:700, background:'#FFFBEB', padding:'2px 8px', borderRadius:'6px' }}>⭐ مفضلة</span>
                <span style={{ fontSize:'11px', color:'#9CA3AF' }}>{d.reference}</span>
              </div>
              <p style={{ fontSize:'18px', lineHeight:1.9, textAlign:'center', color:'#1A1A1A', margin:'0 0 8px' }}>{d.arabic}</p>
              <p style={{ fontSize:'12px', color:'#9CA3AF', textAlign:'center', margin:0 }}>× {d.count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Surah Favorites */}
      {tab === 'surahs' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {FAV_SURAHS.map(s => (
            <Link key={s.number} href={`/quran/${s.number}`} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', borderRadius:'14px', padding:'14px', border:'1px solid #C7D2FE', display:'flex', alignItems:'center', gap:'14px', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:'linear-gradient(135deg,#EEF2FF,#C7D2FE)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:800, color:'#6366F1' }}>
                  {s.number}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:'16px', fontWeight:700, color:'#1A1A1A', margin:'0 0 3px' }}>{s.name}</p>
                  <p style={{ fontSize:'12px', color:'#9CA3AF', margin:0 }}>{s.verses} آية · {s.type}</p>
                </div>
                <span style={{ fontSize:'18px' }}>⭐</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Legacy Favorites */}
      {tab === 'legacy' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {FAV_PAGES.map(p => (
            <Link key={p.slug} href={`/legacy/${p.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', borderRadius:'14px', padding:'14px', border:'1px solid #E5E7EB', display:'flex', alignItems:'center', gap:'14px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:'#EEF2FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px' }}>
                  {p.icon}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:'15px', fontWeight:700, color:'#1A1A1A', margin:0 }}>{p.name}</p>
                </div>
                <span style={{ fontSize:'18px' }}>⭐</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
