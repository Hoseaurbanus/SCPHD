import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import EmptyState from '@/components/ui/EmptyState'

export default function ProgramsPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <>
      <Helmet>
        <title>Our Programs — SCPHD | Education, Healthcare & Peacebuilding</title>
        <meta name="description" content="Explore SCPHD's active programs across education, healthcare, livelihoods, conflict resolution, emergency relief, and environment." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[360px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-950" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            Our Programs
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Where Support<br />
            <em className="not-italic gradient-text">Goes to Work</em>
          </motion.h1>
        </div>
      </section>

      {/* Filter & Grid */}
      <section ref={headerRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <EmptyState
            title="No programs available yet"
            description="Programs will be listed here once published by administrators."
          />
        </div>
      </section>
    </>
  )
}
