import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import EmptyState from '@/components/ui/EmptyState'

export default function GlobalImpactMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 lines-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              Global Presence
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-white font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Our Reach in<br />
              <em className="not-italic gradient-text">Gombe State, Nigeria</em>
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-sm overflow-hidden"
          style={{ aspectRatio: '2/1', background: 'linear-gradient(180deg, #0B1D3A 0%, #040c18 100%)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <EmptyState
            title="Impact map data not yet available"
            description="Regional data will be displayed here once verified."
            className="h-full text-white"
          />
        </motion.div>
      </div>
    </section>
  )
}
