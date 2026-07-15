import { Navbar } from '@/components/layout/Navbar'
import { BottomNav } from '@/components/layout/BottomNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth:'480px', margin:'0 auto', minHeight:'100vh', background:'#FAFAF8', position:'relative' }}>
      <Navbar />
      <main style={{ paddingBottom:'90px' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
