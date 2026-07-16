import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import EmptyState from '@/components/ui/EmptyState'

export default function EventsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-4"
            >
              Upcoming Events
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-navy-900 font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Join Us in Building<br />
              <em className="not-italic text-navy-600">a Better World</em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#"
            className="self-start md:self-end text-gold-600 text-sm font-bold hover:text-gold-700 transition-colors group"
          >
            Full Event Calendar
            <span className="ml-1 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </motion.a>
        </div>

        <EmptyState
          title="No upcoming events"
          description="Check back soon for new events."
          className="bg-slate-50 rounded-sm"
        />
      </div>
    </section>
  )
}
