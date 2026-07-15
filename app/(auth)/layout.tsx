export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth:'480px', margin:'0 auto', minHeight:'100vh', background:'#FAFAF8' }}>
      {children}
    </div>
  )
}
