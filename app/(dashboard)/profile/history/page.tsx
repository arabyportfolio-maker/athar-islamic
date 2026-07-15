'use client'
import { useState } from 'react'

type ActivityType = 'all'|'tasbeeh'|'quran'|'azkar'|'legacy'

const ALL_HISTORY = [
  { id:'h1',  icon:'📿', type:'tasbeeh', action:'سبّحت 500 مرة — سبحان الله',        date:'اليوم',   time:'10:30 ص', color:'#059669' },
  { id:'h2',  icon:'🌿', type:'azkar',   action:'أكملت أذكار الصباح كاملة',          date:'اليوم',   time:'06:15 ص', color:'#D4A017' },
  { id:'h3',  icon:'📖', type:'quran',   action:'قرأت سورة البقرة — الآية 45 ← 70',  date:'أمس',     time:'09:00 م', color:'#6366F1' },
  { id:'h4',  icon:'📿', type:'tasbeeh', action:'سبّحت 200 مرة — الله أكبر',         date:'أمس',     time:'04:45 ص', color:'#059669' },
  { id:'h5',  icon:'🤲', type:'legacy',  action:'شاركت في صفحة محمد عبد الله',       date:'أمس',     time:'08:00 م', color:'#6366F1' },
  { id:'h6',  icon:'🌿', type:'azkar',   action:'أذكار المساء — 12/12 ذكر',          date:'أمس',     time:'06:30 م', color:'#D4A017' },
  { id:'h7',  icon:'📖', type:'quran',   action:'ختمت سورة الكهف كاملة',             date:'الأربعاء', time:'03:00 م', color:'#6366F1' },
  { id:'h8',  icon:'📿', type:'tasbeeh', action:'سبّحت 1000 مرة — جلسة طويلة',      date:'الثلاثاء', time:'11:00 م', color:'#059669' },
  { id:'h9',  icon:'📜', type:'legacy',  action:'أنشأت صفحة أثر لفاطمة علي',        date:'الاثنين', time:'07:00 م', color:'#F59E0B' },
  { id:'h10', icon:'🌿', type:'azkar',   action:'أذكار الصباح — كاملة',              date:'الأحد',   time:'05:30 ص', color:'#D4A017' },
]

const FILTERS: {id: ActivityType; label:string; icon:string}[] = [
  { id:'all',     label:'الكل',    icon:'🌟' },
  { id:'tasbeeh', label:'التسبيح', icon:'📿' },
  { id:'quran',   label:'القرآن',  icon:'📖' },
  { id:'azkar',   label:'الأذكار', icon:'🌿' },
  { id:'legacy',  label:'الأثر',   icon:'📜' },
]

export default function HistoryPage() {
  const [filter, setFilter] = useState<ActivityType>('all')

  const filtered = ALL_HISTORY.filter(h => filter === 'all' || h.type === filter)
  const grouped  = filtered.reduce<Record<string, typeof ALL_HISTORY>>((acc, h) => {
    acc[h.date] = acc[h.date] || []
    acc[h.date].push(h)
    return acc
  }, {})

  return (
    <div style={{ fontFamily:'Cairo,sans-serif', direction:'rtl', padding:'16px', paddingBottom:'100px' }}>

      {/* Filter Pills */}
      <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'8px', marginBottom:'16px' }}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            style={{ flexShrink:0, padding:'7px 14px', borderRadius:'20px', border: f.id===filter ? '1.5px solid #059669' : '1px solid #E5E7EB', background: f.id===filter ? '#F0FDF4' : '#fff', fontFamily:'Cairo,sans-serif', fontSize:'13px', fontWeight: f.id===filter ? 700 : 400, color: f.id===filter ? '#059669' : '#6B7280', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Grouped by date */}
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} style={{ marginBottom:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
            <span style={{ fontSize:'13px', fontWeight:700, color:'#9CA3AF' }}>{date}</span>
            <div style={{ flex:1, height:'1px', background:'#E5E7EB' }} />
            <span style={{ fontSize:'12px', color:'#9CA3AF' }}>{items.length} أنشطة</span>
          </div>

          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #E5E7EB', overflow:'hidden' }}>
            {items.map((h, i) => (
              <div key={h.id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 14px', borderBottom: i < items.length-1 ? '1px solid #F3F4F6' : 'none', transition:'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#F9FAFB'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='transparent'}
              >
                <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:`${h.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>
                  {h.icon}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:'13px', fontWeight:600, color:'#374151', margin:'0 0 2px', lineHeight:1.4 }}>{h.action}</p>
                  <p style={{ fontSize:'11px', color:'#9CA3AF', margin:0 }}>{h.time}</p>
                </div>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:h.color, flexShrink:0 }} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'48px 0', color:'#9CA3AF' }}>
          <div style={{ fontSize:'48px', marginBottom:'12px' }}>📋</div>
          <p style={{ fontWeight:600, fontSize:'15px' }}>لا توجد أنشطة من هذا النوع</p>
        </div>
      )}
    </div>
  )
}
