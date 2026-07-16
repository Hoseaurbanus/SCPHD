import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import EmptyState from '@/components/ui/EmptyState'

interface FeaturedProgramsProps {
  navigate: (p: string) => void
}

export default function FeaturedPrograms({ navigate }: FeaturedProgramsProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-cream-100 py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-5"
            >
              Featured Programs
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-navy-900 font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Where Your Support<br />
              <em className="not-italic text-navy-600">Goes to Work</em>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate('programs')}
            whileHover={{ scale: 1.03, backgroundColor: '#0B1D3A', color: '#fff' }}
            whileTap={{ scale: 0.97 }}
            className="self-start md:self-end px-7 py-3 border-2 border-navy-900 text-navy-900 text-sm font-bold tracking-wide rounded-sm transition-all duration-300"
          >
            View All Programs →
          </motion.button>
        </div>

        <EmptyState
          title="No featured programs available"
          description="Programs will be displayed here once published."
          className="bg-white rounded-sm"
        />
      </div>
    </section>
  )
}
