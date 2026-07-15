'use client'
import { useState } from 'react'
import { Target, CheckCircle, ChevronLeft, Calendar, Flame, Play, Clock, BookOpen, Star, Plus } from 'lucide-react'

const GOALS = [
  { id:1, title:'حفظ سورة البقرة',     progress:65, target:286, unit:'آية',  type:'quran',  Icon: BookOpen, color:'#064E3B' },
  { id:2, title:'ختمة شهر رمضان',      progress:15, target:30,  unit:'جزء', type:'quran',  Icon: Star,     color:'#D4A017' },
  { id:3, title:'أذكار الصباح يومياً',  progress:12, target:30,  unit:'يوم', type:'azkar',  Icon: Clock,    color:'#6366F1' },
  { id:4, title:'500 تسبيحة',         progress:350,target:500, unit:'مرة',  type:'tasbeeh',Icon: Target,   color:'#059669' },
]

export default function GoalsPage() {
  const [filter, setFilter] = useState<'all'|'quran'|'azkar'|'tasbeeh'>('all')

  const filtered = GOALS.filter(g => filter === 'all' || g.type === filter)

  return (
    <div style={{ fontFamily:'Cairo,sans-serif', direction:'rtl', padding:'16px', paddingBottom:'100px' }}>

      {/* Header Stats */}
      <div style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
        <div style={{ flex:1, background:'linear-gradient(135deg,#064E3B,#065F46)', borderRadius:'16px', padding:'16px', color:'#fff', boxShadow:'0 6px 20px rgba(6,78,59,0.2)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', opacity:0.8, marginBottom:'4px' }}>
            <CheckCircle size={14} /> أهداف مكتملة
          </div>
          <div style={{ fontSize:'24px', fontWeight:900 }}>12</div>
        </div>
        <div style={{ flex:1, background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'#9CA3AF', marginBottom:'4px' }}>
            <Flame size={14} color="#D97706" /> أهداف نشطة
          </div>
          <div style={{ fontSize:'24px', fontWeight:900, color:'#1A1A1A' }}>4</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'6px', marginBottom:'16px', overflowX:'auto', scrollbarWidth:'none', paddingBottom:'4px' }}>
        {[
          { id:'all',     label:'الكل' },
          { id:'quran',   label:'القرآن' },
          { id:'tasbeeh', label:'التسبيح' },
          { id:'azkar',   label:'الأذكار' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id as any)}
            style={{ flexShrink:0, padding:'8px 16px', borderRadius:'10px', border: filter===f.id ? '1px solid #064E3B' : '1px solid #E5E7EB', background: filter===f.id ? '#F0FDF4' : '#fff', color: filter===f.id ? '#064E3B' : '#6B7280', fontFamily:'Cairo,sans-serif', fontSize:'13px', fontWeight: filter===f.id ? 700 : 500, cursor:'pointer', transition:'all 0.2s' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {filtered.map((g, i) => {
          const pct = Math.round((g.progress / g.target) * 100)
          return (
            <div key={g.id} style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB', animation:`fadeSlideUp 0.3s ease-out ${i*0.05}s both`, opacity:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:`${g.color}15`, display:'flex', alignItems:'center', justifyContent:'center', color:g.color }}>
                    <g.Icon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:'15px', fontWeight:800, color:'#1A1A1A', margin:'0 0 2px' }}>{g.title}</h3>
                    <div style={{ fontSize:'12px', color:'#9CA3AF' }}>{g.progress} من {g.target} {g.unit}</div>
                  </div>
                </div>
                <div style={{ fontSize:'14px', fontWeight:800, color:g.color }}>{pct}%</div>
              </div>

              {/* Progress Bar */}
              <div style={{ height:'6px', background:'#F3F4F6', borderRadius:'99px', overflow:'hidden', marginBottom:'12px' }}>
                <div style={{ height:'100%', background:g.color, width:`${pct}%`, borderRadius:'99px', transition:'width 0.5s ease-out' }} />
              </div>

              <div style={{ display:'flex', gap:'8px' }}>
                <button style={{ flex:1, padding:'10px', borderRadius:'10px', background:`${g.color}10`, color:g.color, border:'none', fontFamily:'Cairo,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
                  <Play size={14} fill={g.color} /> متابعة
                </button>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'40px 0' }}>
            <Target size={40} color="#E5E7EB" style={{ margin:'0 auto 12px' }} />
            <p style={{ color:'#9CA3AF', fontWeight:600 }}>لا توجد أهداف هنا</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button style={{ position:'fixed', bottom:'90px', left:'20px', width:'52px', height:'52px', borderRadius:'50%', background:'linear-gradient(135deg,#064E3B,#065F46)', color:'#fff', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(6,78,59,0.3)', zIndex:100 }}>
        <Plus size={24} />
      </button>

      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
