import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import ScrollProgress from '@/components/layout/ScrollProgress'

interface SidebarLink {
  label: string
  path: string
  icon: string
}

const adminLinks: SidebarLink[] = [
  { label: 'Overview', path: '/admin/overview', icon: '◎' },
  { label: 'Donations', path: '/admin/donations', icon: '💰' },
  { label: 'Volunteers', path: '/admin/volunteers', icon: '◉' },
  { label: 'Programs', path: '/admin/programs', icon: '◈' },
  { label: 'Users', path: '/admin/users', icon: '♦' },
  { label: 'Reports', path: '/admin/reports', icon: '▣' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙' },
  { label: 'Audit Logs', path: '/admin/audit', icon: '▤' },
]

const volunteerLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/volunteer/dashboard', icon: '◎' },
  { label: 'My Missions', path: '/volunteer/missions', icon: '◈' },
  { label: 'My Impact', path: '/volunteer/impact', icon: '★' },
  { label: 'Resources', path: '/volunteer/resources', icon: '▣' },
  { label: 'Profile', path: '/volunteer/profile', icon: '♦' },
]

const donorLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/donor/dashboard', icon: '◎' },
  { label: 'Donation History', path: '/donor/history', icon: '💰' },
  { label: 'Recurring Gifts', path: '/donor/recurring', icon: '↻' },
  { label: 'My Impact', path: '/donor/impact', icon: '★' },
  { label: 'Tax Receipts', path: '/donor/receipts', icon: '▣' },
]

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const isAdmin = location.pathname.startsWith('/admin')
  const isDonor = location.pathname.startsWith('/donor')
  const links = isAdmin ? adminLinks : isDonor ? donorLinks : volunteerLinks
  const basePath = isAdmin ? '/admin' : isDonor ? '/donor' : '/volunteer'

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn('flex flex-col h-full', className)}>
      <div className="p-4 border-b border-navy-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold-500 rounded-sm flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-navy-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          {!collapsed && (
            <div>
              <span className="text-white font-bold text-sm">SCPHD</span>
              <span className="block text-[9px] text-gold-400 tracking-widest uppercase">
                {isAdmin ? 'Admin Panel' : isDonor ? 'Donor Portal' : 'Volunteer Portal'}
              </span>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all',
              location.pathname === link.path
                ? 'bg-gold-500/10 text-gold-400 border-l-2 border-gold-500'
                : 'text-white/50 hover:text-white hover:bg-navy-800'
            )}
          >
            <span className="text-base flex-shrink-0">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-navy-800 space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm text-white/50 hover:text-white hover:bg-navy-800 transition-all"
        >
          <span>{theme === 'dark' ? '☀' : '☾'}</span>
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm text-white/50 hover:text-red-400 hover:bg-navy-800 transition-all"
        >
          <span>⏻</span>
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-navy-950 flex">
      <ScrollProgress />

      <div className="hidden lg:block">
        <div
          className={cn(
            'fixed inset-y-0 left-0 bg-navy-900 border-r border-navy-800 transition-all duration-300 z-30',
            collapsed ? 'w-16' : 'w-64'
          )}
        >
          <Sidebar />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-navy-900 border-r border-navy-800 z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className={cn('flex-1 transition-all duration-300', collapsed ? 'lg:ml-16' : 'lg:ml-64')}>
        <header className="sticky top-0 z-20 bg-navy-950/80 backdrop-blur-xl border-b border-navy-800">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => (window.innerWidth >= 1024 ? setCollapsed(!collapsed) : setMobileOpen(true))}
                className="p-2 text-white/50 hover:text-white rounded-sm hover:bg-navy-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-sm font-semibold text-white">
                  {links.find((l) => l.path === location.pathname)?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 text-white/50 hover:text-white rounded-sm hover:bg-navy-800 transition-colors relative">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    3
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold">
                  {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-white">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-white/40 capitalize">{user?.role?.replace('_', ' ') || 'Member'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
