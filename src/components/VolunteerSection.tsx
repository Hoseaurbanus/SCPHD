import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import EmptyState from '@/components/ui/EmptyState'

export default function VolunteerSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-navy-950 z-10">
      <div className="absolute inset-0 lines-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-5"
            >
              Volunteer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-white font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Your Time Is the<br />
              <em className="not-italic gradient-text">Greatest Gift</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/55 text-base leading-relaxed mb-10 max-w-md"
            >
              Whether you can spare a weekend or a year, your skills and energy help us reach further. Join our team to make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(196,154,46,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary px-8 py-3.5 bg-gold-500 text-navy-900 font-bold text-sm tracking-wide rounded-sm"
                >
                  Apply to Volunteer
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 border border-white/25 text-white font-semibold text-sm tracking-wide rounded-sm transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="space-y-4">
            <EmptyState
              title="Volunteer opportunities coming soon"
              description="Join our team to make a difference."
              className="glass border border-white/8 rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
