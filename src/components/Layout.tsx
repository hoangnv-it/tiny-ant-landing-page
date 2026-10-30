import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import LeadModal from './LeadModal'
import PrivacyModal from './PrivacyModal'

export default function Layout() {
  return (
    // Footer luôn nằm ở đáy màn hình
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Pop-up dùng chung: đăng ký demo, chính sách bảo mật */}
      <LeadModal />
      <PrivacyModal />
    </div>
  )
}
