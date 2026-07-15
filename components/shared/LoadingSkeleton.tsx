export function Skeleton({ w = '100%', h = '16px', r = '8px', mb = '0' }: { w?: string; h?: string; r?: string; mb?: string }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite',
    }} />
  )
}

export function CardSkeleton() {
  return (
    <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #E5E7EB', marginBottom:'12px' }}>
      <div style={{ display:'flex', gap:'12px', marginBottom:'12px' }}>
        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'#E5E7EB', animation:'shimmer 1.4s infinite', flexShrink:0 }} />
        <div style={{ flex:1 }}>
          <Skeleton h="15px" mb="6px" w="70%" />
          <Skeleton h="12px" w="45%" />
        </div>
      </div>
      <Skeleton h="12px" mb="6px" />
      <Skeleton h="12px" mb="6px" w="85%" />
      <Skeleton h="12px" w="60%" />
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div style={{ padding:'16px' }}>
      {[1,2,3].map(i => <CardSkeleton key={i} />)}
    </div>
  )
}
