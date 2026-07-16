import { useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import EmptyState from '@/components/ui/EmptyState'

const coreValues = [
  {
    title: 'Human Dignity',
    description: 'Every person deserves respect, safety, and the opportunity to thrive regardless of circumstance.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: 'from-rose-500/20 to-transparent',
  },
  {
    title: 'Transparency',
    description: 'We maintain rigorous financial accountability and openly share our impact data with all stakeholders.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: 'from-blue-500/20 to-transparent',
  },
  {
    title: 'Community First',
    description: 'Sustainable change starts from within. We empower local leadership and honor indigenous knowledge.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'from-emerald-500/20 to-transparent',
  },
  {
    title: 'Evidence & Learning',
    description: 'Data-driven decision making and continuous learning inform every program and policy we implement.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'from-amber-500/20 to-transparent',
  },
  {
    title: 'Inclusiveness',
    description: 'We actively seek out and center the voices of marginalized populations in all our work.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: 'from-purple-500/20 to-transparent',
  },
  {
    title: 'Sustainability',
    description: 'We build programs that outlast our presence, creating self-sustaining systems of support.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: 'from-teal-500/20 to-transparent',
  },
]

interface CoreValueCardProps {
  value: (typeof coreValues)[number]
  index: number
}

function CoreValueCard({ value, index }: CoreValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="bg-cream-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-sm p-8 relative overflow-hidden group"
    >
      <motion.div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <motion.div
          className="h-0.5 bg-gold-500 mb-5 origin-left"
          initial={{ scaleX: 0 }}
          animate={cardInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
        />
        <div className="text-gold-500 mb-4">{value.icon}</div>
        <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl font-bold mb-3">{value.title}</h3>
        <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed">{value.description}</p>
      </div>
    </motion.div>
  )
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-white dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="section-label mb-5">
          Our Journey
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Our Journey
        </motion.h2>

        <EmptyState
          title="Timeline coming soon"
          description="Our organizational milestones and history will be displayed here."
        />
      </div>
    </section>
  )
}

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null)
  const missionInView = useInView(missionRef, { once: true, margin: '-80px' })
  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })
  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <>
      <Helmet>
        <title>About Us — SCPHD | Peace, Justice & Human Dignity</title>
        <meta name="description" content="Learn about SCPHD's mission, vision, and core values for humanitarian impact and peacebuilding." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-950" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            About SCPHD
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Peace, Justice &<br />
            <em className="not-italic gradient-text">Human Dignity</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
            SCPHD is committed to peace and humanitarian development, working at the intersection of peacebuilding, humanitarian aid, and community development.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <div className="section-label mb-5">Our Mission</div>
              <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold leading-tight mb-6">
                Empowering Communities to Build <em className="not-italic text-navy-600 dark:text-gold-400">Lasting Peace</em>
              </h2>
              <p className="text-slate-600 dark:text-white/55 text-base leading-relaxed mb-6">
                SCPHD exists to bridge the gap between humanitarian need and sustainable development. We partner with communities, governments, and international organizations to deliver programs that transform lives and strengthen the fabric of peace.
              </p>
              <p className="text-slate-600 dark:text-white/55 text-base leading-relaxed">
                Our approach integrates emergency response with long-term development, ensuring that every intervention builds local capacity, promotes justice, and upholds the dignity of every person we serve.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <div className="section-label mb-5">Our Vision</div>
              <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold leading-tight mb-6">
                A World Where <em className="not-italic text-navy-600 dark:text-gold-400">Every Life Thrives</em>
              </h2>
              <p className="text-slate-600 dark:text-white/55 text-base leading-relaxed mb-6">
                We envision a world where conflict is resolved through dialogue, where every community has access to quality healthcare and education, and where the most vulnerable are protected and empowered.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="bg-white dark:bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} className="section-label justify-center mb-4">
              Core Values
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              The Principles That <em className="not-italic text-navy-600 dark:text-gold-400">Guide Us</em>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <CoreValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* Leadership Team */}
      <section ref={teamRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} className="section-label justify-center mb-4">
              Leadership Team
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Guided by <em className="not-italic text-navy-600 dark:text-gold-400">Experience</em>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-slate-500 dark:text-white/40 text-sm mt-4 max-w-lg mx-auto">
              Our leadership brings decades of combined experience in humanitarian aid, peacebuilding, and organizational management.
            </motion.p>
          </div>

          <EmptyState
            title="Team information coming soon"
            description="Our leadership team profiles will be available here once published by administrators."
          />
        </div>
      </section>
    </>
  )
}
