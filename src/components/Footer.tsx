import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Page } from '../App'

interface FooterProps {
  navigate: (p: Page) => void
}

export default function Footer({ navigate }: FooterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="bg-navy-950 text-white relative overflow-hidden">
      {/* Animated gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Background orbs */}
      <motion.div
        className="absolute -left-40 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <button onClick={() => navigate('home')} className="flex items-center gap-3 mb-5 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-9 h-9 bg-gold-500 rounded-sm flex items-center justify-center flex-shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="#0B1D3A"/>
                </svg>
              </motion.div>
              <div>
                <div className="font-display font-bold text-sm leading-tight">SCPHD</div>
                <div className="text-white/35 text-[10px] tracking-widest uppercase">Springfield Center</div>
              </div>
            </button>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Building a more just and peaceful world through community action, education, and advocacy across 47 countries.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'F', title: 'Facebook' },
                { label: 'X', title: 'Twitter/X' },
                { label: 'in', title: 'LinkedIn' },
                { label: '▶', title: 'YouTube' },
              ].map(({ label, title }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(196,154,46,0.7)', color: '#C49A2E' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 border border-white/15 rounded-sm flex items-center justify-center text-white/35 text-xs transition-all duration-200"
                  aria-label={title}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Organization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-gold-500 mb-5">Organization</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', page: 'about' as Page },
                { label: 'Our Programs', page: 'programs' as Page },
                { label: 'Contact', page: 'contact' as Page },
              ].map(({ label, page }) => (
                <li key={label}>
                  <motion.button
                    onClick={() => navigate(page)}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200 gold-underline"
                  >
                    {label}
                  </motion.button>
                </li>
              ))}
              {['Leadership Team', 'Annual Reports', 'Media Center', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors duration-200 gold-underline">{item}</a>
                </li>
              ))}
              <li>
                <motion.button
                  onClick={() => navigate('login')}
                  className="text-gold-400 hover:text-gold-300 text-sm transition-colors duration-200 gold-underline font-semibold"
                >
                  Volunteer Portal →
                </motion.button>
              </li>
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-gold-500 mb-5">Programs</h4>
            <ul className="space-y-3">
              {['Peace Education', 'Humanitarian Aid', 'Community Health', 'Youth Development', "Women's Empowerment", 'Refugee Support', 'Conflict Resolution', 'Clean Water'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors duration-200 gold-underline">{item}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-gold-500 mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50 mb-7">
              <li className="flex gap-3">
                <span className="text-gold-500 flex-shrink-0 mt-0.5">📍</span>
                <span>123 Peace Boulevard, Springfield, IL 62701</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500">✉</span>
                <a href="mailto:info@scphd.org" className="hover:text-white transition-colors">info@scphd.org</a>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500">☎</span>
                <a href="tel:+12175550100" className="hover:text-white transition-colors">+1 (217) 555-0100</a>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">⚡</span>
                <div>
                  <a href="tel:+12175550911" className="text-white font-semibold hover:text-gold-400 transition-colors">+1 (217) 555-0911</a>
                  <div className="text-white/30 text-[10px]">Emergency 24/7</div>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-gold-500 mb-2">Newsletter</div>
              <p className="text-white/40 text-xs mb-3">Monthly impact stories and field updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-white/6 border border-white/12 text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#D4AA45' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-2.5 rounded-sm flex-shrink-0"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 Springfield Center for Peace and Humanitarian Development. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Cookie Settings'].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
