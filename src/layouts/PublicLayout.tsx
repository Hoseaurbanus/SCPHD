import { Outlet } from 'react-router-dom'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
