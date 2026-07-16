import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Page } from '../App'

interface NavProps {
  currentPage: Page
  navigate: (p: Page) => void
}

const links: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Programs', page: 'programs' },
  { label: 'Donate', page: 'donate' },
  { label: 'Contact', page: 'contact' },
]

export default function Nav({ currentPage, navigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = currentPage === 'home'
  const showSolid = scrolled || !isHome

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? 'bg-navy-900/98 backdrop-blur-md shadow-lg shadow-navy-950/30'
          : 'bg-transparent'
      }`}
    >
      {showSolid && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <motion.button
          onClick={() => { navigate('home'); setMobileOpen(false) }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 group flex-shrink-0"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="w-9 h-9 bg-gold-500 rounded-sm flex items-center justify-center flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="#0B1D3A"/>
            </svg>
          </motion.div>
          <div className="text-left">
            <div className="text-white font-display font-bold text-sm leading-tight tracking-wide">SCPHD</div>
            <div className="text-white/50 text-[10px] leading-tight tracking-widest uppercase hidden sm:block">Springfield Center</div>
          </div>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group pb-1 ${
                currentPage === page ? 'text-gold-400' : 'text-white/75 hover:text-white'
              }`}
            >
              {label}
              <motion.span
                className="absolute -bottom-0.5 left-0 h-0.5 bg-gold-500 rounded-full"
                animate={{ width: currentPage === page ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              {currentPage !== page && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 bg-white/30 rounded-full w-0 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={() => navigate('login')}
            whileHover={{ scale: 1.03, borderColor: 'rgba(196,154,46,0.6)', color: '#C49A2E' }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-2 border text-xs font-bold rounded-sm tracking-wide transition-colors ${
              currentPage === 'portal'
                ? 'border-gold-500 text-gold-400'
                : 'border-white/20 text-white/70'
            }`}
          >
            {currentPage === 'portal' ? '◉ Portal' : 'Sign In'}
          </motion.button>
          <motion.button
            onClick={() => navigate('donate')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(196,154,46,0.4)' }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary px-5 lg:px-6 py-2.5 bg-gold-500 text-navy-900 text-sm font-bold rounded-sm tracking-wide"
          >
            Donate Now
          </motion.button>
        </div>

        {/* Mobile: donate + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            onClick={() => navigate('donate')}
            whileTap={{ scale: 0.95 }}
            className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-2 rounded-sm"
          >
            Donate
          </motion.button>
          <motion.button
            className="text-white p-2 relative z-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-white origin-left"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block h-0.5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-white origin-left"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/8 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map(({ label, page }, i) => (
                <motion.button
                  key={page}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { navigate(page); setMobileOpen(false) }}
                  className={`flex items-center justify-between w-full text-left px-4 py-3.5 rounded-sm text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'text-gold-400 bg-white/5'
                      : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                  {currentPage === page && <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />}
                </motion.button>
              ))}
              <div className="border-t border-white/8 pt-3 mt-3 space-y-2">
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  onClick={() => { navigate('login'); setMobileOpen(false) }}
                  className="w-full py-3 border border-white/20 text-white/70 text-sm font-semibold rounded-sm"
                >
                  Sign In / Volunteer Portal
                </motion.button>
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.34 }}
                  onClick={() => { navigate('donate'); setMobileOpen(false) }}
                  className="w-full py-3.5 bg-gold-500 text-navy-900 text-sm font-bold rounded-sm"
                >
                  Donate Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
