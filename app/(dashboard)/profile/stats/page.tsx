import type { Metadata } from 'next'
import { formatNumber } from '@/lib/utils'

export const metadata: Metadata = { title: 'إحصائياتي' }

const DAILY_DATA = [
  { day:'الأحد',    val:450,  full:500 },
  { day:'الاثنين', val:500,  full:500 },
  { day:'الثلاثاء',val:380,  full:500 },
  { day:'الأربعاء',val:500,  full:500 },
  { day:'الخميس',  val:500,  full:500 },
  { day:'الجمعة',  val:490,  full:500 },
  { day:'السبت',   val:345,  full:500 },
]

const WEEKLY_TOTALS = [
  { week:'الأسبوع 1', val:2800 },
  { week:'الأسبوع 2', val:3200 },
  { week:'الأسبوع 3', val:3500 },
  { week:'هذا الأسبوع', val:3165 },
]

const DHIKR_STATS = [
  { label:'سبحان الله',         count:43521, pct:42, color:'#059669' },
  { label:'الحمد لله',          count:28100, pct:27, color:'#6366F1' },
  { label:'الله أكبر',          count:21350, pct:21, color:'#F59E0B' },
  { label:'لا إله إلا الله',    count:7000,  pct:7,  color:'#EF4444' },
  { label:'أستغفر الله',        count:3500,  pct:3,  color:'#8B5CF6' },
]

export default function ProfileStatsPage() {
  const maxBar = Math.max(...WEEKLY_TOTALS.map(w => w.val))

  return (
    <div style={{ fontFamily:'Cairo,sans-serif', direction:'rtl', padding:'16px', paddingBottom:'100px' }}>

      {/* Overview Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px' }}>
        {[
          { icon:'📿', label:'إجمالي التسبيح',    val:formatNumber(103471), color:'#059669', bg:'#F0FDF4' },
          { icon:'🔥', label:'أطول سلسلة',         val:'14 يوم',            color:'#F59E0B', bg:'#FFFBEB' },
          { icon:'📅', label:'أيام النشاط',        val:'45 يوم',            color:'#6366F1', bg:'#EEF2FF' },
          { icon:'⭐', label:'الجلسة المتميزة',    val:'1,200 تسبيحة',     color:'#D4A017', bg:'#FDF8F0' },
        ].map(c => (
          <div key={c.label} style={{ background:c.bg, borderRadius:'14px', padding:'14px', border:`1px solid ${c.color}22` }}>
            <div style={{ fontSize:'24px', marginBottom:'6px' }}>{c.icon}</div>
            <div style={{ fontSize:'20px', fontWeight:900, color:c.color, marginBottom:'3px' }}>{c.val}</div>
            <div style={{ fontSize:'12px', color:'#6B7280' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Daily Chart */}
      <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB', marginBottom:'14px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'#374151', margin:'0 0 14px' }}>📊 النشاط اليومي — هذا الأسبوع</h2>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', height:'100px', marginBottom:'8px' }}>
          {DAILY_DATA.map(d => (
            <div key={d.day} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', flex:1 }}>
              <div style={{ width:'28px', height:`${(d.val / d.full) * 90}px`, borderRadius:'6px 6px 0 0', background: d.val >= d.full ? 'linear-gradient(180deg,#059669,#047857)' : '#BBF7D0', transition:'height 0.6s', minHeight:'6px' }} />
              <span style={{ fontSize:'10px', color:'#9CA3AF' }}>{d.day.slice(0,3)}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:'8px', fontSize:'12px', color:'#9CA3AF' }}>
          <span style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            <span style={{ width:'10px', height:'10px', borderRadius:'2px', background:'#059669', display:'inline-block' }} /> هدف مكتمل
          </span>
          <span style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            <span style={{ width:'10px', height:'10px', borderRadius:'2px', background:'#BBF7D0', display:'inline-block' }} /> جزئي
          </span>
        </div>
      </div>

      {/* Weekly Totals */}
      <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB', marginBottom:'14px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'#374151', margin:'0 0 14px' }}>📈 الأسابيع الأخيرة</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {WEEKLY_TOTALS.map(w => (
            <div key={w.week}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
                <span style={{ fontSize:'13px', color:'#374151' }}>{w.week}</span>
                <span style={{ fontSize:'13px', fontWeight:700, color:'#059669' }}>{formatNumber(w.val)}</span>
              </div>
              <div style={{ height:'8px', borderRadius:'99px', background:'#E5E7EB', overflow:'hidden' }}>
                <div style={{ width:`${(w.val/maxBar)*100}%`, height:'100%', background:'linear-gradient(90deg,#059669,#10B981)', borderRadius:'99px', transition:'width 0.6s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dhikr Breakdown */}
      <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB', marginBottom:'14px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'#374151', margin:'0 0 14px' }}>📿 توزيع الأذكار</h2>
        {DHIKR_STATS.map(d => (
          <div key={d.label} style={{ marginBottom:'12px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
              <span style={{ fontSize:'13px', color:'#374151' }}>{d.label}</span>
              <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                <span style={{ fontSize:'12px', color:'#9CA3AF' }}>{formatNumber(d.count)}</span>
                <span style={{ fontSize:'12px', fontWeight:700, color:d.color }}>{d.pct}%</span>
              </div>
            </div>
            <div style={{ height:'6px', borderRadius:'99px', background:'#E5E7EB', overflow:'hidden' }}>
              <div style={{ width:`${d.pct}%`, height:'100%', background:d.color, borderRadius:'99px', transition:'width 0.6s' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Best times */}
      <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB' }}>
        <h2 style={{ fontSize:'15px', fontWeight:700, color:'#374151', margin:'0 0 14px' }}>🕒 أفضل أوقات نشاطك</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px' }}>
          {[
            { time:'الفجر',    pct:38, icon:'☀️' },
            { time:'الصباح',   pct:31, icon:'🌤️' },
            { time:'المساء',   pct:19, icon:'🌅' },
            { time:'الظهر',    pct:8,  icon:'☀️' },
            { time:'العشاء',   pct:3,  icon:'🌙' },
            { time:'الليل',    pct:1,  icon:'⭐' },
          ].map(t => (
            <div key={t.time} style={{ textAlign:'center', padding:'10px', borderRadius:'10px', background:'#F9FAFB', border:'1px solid #E5E7EB' }}>
              <div style={{ fontSize:'20px', marginBottom:'4px' }}>{t.icon}</div>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#059669' }}>{t.pct}%</div>
              <div style={{ fontSize:'11px', color:'#9CA3AF' }}>{t.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
