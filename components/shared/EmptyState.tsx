export function EmptyState({
  icon = '📭',
  title = 'لا يوجد شيء هنا',
  desc,
  action,
  actionLabel,
}: {
  icon?: string
  title?: string
  desc?: string
  action?: () => void
  actionLabel?: string
}) {
  return (
    <div style={{ textAlign:'center', padding:'48px 24px', fontFamily:'Cairo,sans-serif', direction:'rtl' }}>
      <div style={{ fontSize:'56px', marginBottom:'14px' }}>{icon}</div>
      <h3 style={{ fontSize:'17px', fontWeight:700, color:'#374151', margin:'0 0 6px' }}>{title}</h3>
      {desc && <p style={{ fontSize:'14px', color:'#9CA3AF', margin:'0 0 20px', lineHeight:1.6 }}>{desc}</p>}
      {action && actionLabel && (
        <button onClick={action}
          style={{ padding:'11px 24px', borderRadius:'12px', background:'#059669', color:'#fff', border:'none', fontFamily:'Cairo,sans-serif', fontSize:'14px', fontWeight:600, cursor:'pointer' }}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
