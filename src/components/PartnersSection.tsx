import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import EmptyState from '@/components/ui/EmptyState'

export default function PartnersSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden z-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div ref={headerRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-3 mb-3 section-label justify-center">
              Trusted Partners
            </div>
            <p className="text-slate-400 text-sm">Partnering with leading international organizations, governments, and foundations worldwide.</p>
          </motion.div>

          <EmptyState
            title="Partners coming soon"
            description="Official partnerships will be displayed here."
            className="bg-slate-50 rounded-sm"
          />
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <div className="section-label justify-center mb-3">What Partners Say</div>
            <h2 className="text-navy-900 font-display font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              Trusted by Those Who Know the Field
            </h2>
          </motion.div>

          <EmptyState
            title="Testimonials coming soon"
            description="Official partnerships will be displayed here."
            className="bg-cream-100 rounded-sm"
          />
        </div>
      </div>
    </section>
  )
}
