import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '2019', label: 'Year Founded', icon: '◉', color: 'from-gold-500/20 to-transparent' },
  { value: '10+', label: 'Office Locations', icon: '◎', color: 'from-blue-500/20 to-transparent' },
  { value: '2', label: 'Active Programs', icon: '◈', color: 'from-emerald-500/20 to-transparent' },
  { value: '4', label: 'Countries', icon: '◇', color: 'from-purple-500/20 to-transparent' },
  { value: '100+', label: 'Partner Organisations', icon: '◈', color: 'from-amber-500/20 to-transparent' },
  { value: '21', label: 'States Reached', icon: '◉', color: 'from-rose-500/20 to-transparent' },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative bg-navy-900 border border-white/5 p-8 lg:p-10 cursor-default group overflow-hidden"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gold-500"
        initial={{ width: 0 }}
        animate={inView ? { width: '40%' } : { width: 0 }}
        transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
      />

      <div className="relative z-10">
        <div className="text-gold-500/25 text-3xl mb-5 group-hover:text-gold-500/60 transition-colors duration-500">
          {stat.icon}
        </div>
        <div className="text-white font-display font-bold number-glow mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
          {stat.value}
        </div>
        <div className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-3">{stat.label}</div>
      </div>
    </motion.div>
  )
}

export default function ImpactStats() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden z-10">
      <div className="absolute inset-0 lines-bg opacity-30" />

      <motion.div
        className="absolute -left-40 top-20 w-80 h-80 rounded-full pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.08) 0%, transparent 70%)' }}
      />
      <motion.div
        className="absolute -right-40 bottom-20 w-96 h-96 rounded-full pointer-events-none"
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ background: 'radial-gradient(circle, rgba(74,125,181,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label mb-5"
          >
            Our Impact
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-white font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Measured in Lives Changed,<br />
              <em className="not-italic gradient-text">Not Just Numbers</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-right"
            >
              <p className="text-white/40 text-xs max-w-[240px] leading-relaxed">
                Every metric represents a real person, a transformed community, a future made possible.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
