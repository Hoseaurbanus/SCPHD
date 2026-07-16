import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/AuthContext'
import { ROLE_REDIRECTS } from '@/utils/constants'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Donate', path: '/donate' },
  { label: 'Contact', path: '/contact' },
]

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const isHome = location.pathname === '/'
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/volunteer') || location.pathname.startsWith('/donor')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  if (isDashboard) return null

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || !isHome
            ? 'bg-navy-900/95 backdrop-blur-xl shadow-xl shadow-navy-950/10'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:shadow-gold-500/50 transition-shadow">
                <svg className="w-6 h-6 text-navy-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">SCPHD</span>
                <span className="hidden sm:block text-[10px] text-gold-400 tracking-widest uppercase">Springfield Center</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors',
                    location.pathname === link.path
                      ? 'text-gold-400'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={user ? ROLE_REDIRECTS[user.role as keyof typeof ROLE_REDIRECTS] || '/volunteer/dashboard' : '#'}
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}
              <Link
                to="/donate"
                className="px-5 py-2.5 bg-gold-500 text-navy-900 text-sm font-bold rounded-sm hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40"
              >
                Donate Now
              </Link>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={cn('w-full h-0.5 bg-white transition-all origin-left', isMobileOpen && 'rotate-45 translate-y-[-2px]')} />
                <span className={cn('w-full h-0.5 bg-white transition-all', isMobileOpen && 'opacity-0')} />
                <span className={cn('w-full h-0.5 bg-white transition-all origin-left', isMobileOpen && '-rotate-45 translate-y-[2px]')} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-18 z-40 bg-navy-900/98 backdrop-blur-xl border-t border-navy-800 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'block px-4 py-3 text-base font-medium rounded-sm transition-colors',
                      location.pathname === link.path
                        ? 'text-gold-400 bg-navy-800'
                        : 'text-white/70 hover:text-white hover:bg-navy-800/50'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-navy-800 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={user ? ROLE_REDIRECTS[user.role as keyof typeof ROLE_REDIRECTS] || '/volunteer/dashboard' : '#'}
                      className="px-4 py-3 text-base font-medium text-white/70 hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="px-4 py-3 text-left text-base font-medium text-white/70 hover:text-white">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="px-4 py-3 text-base font-medium text-white/70 hover:text-white">
                    Sign In
                  </Link>
                )}
                <Link
                  to="/donate"
                  className="px-5 py-3 bg-gold-500 text-navy-900 text-sm font-bold rounded-sm text-center"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
