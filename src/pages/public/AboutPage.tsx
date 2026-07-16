import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useScrollReveal, fadeUp, fadeIn, slideLeft, slideRight, staggerContainer, staggerFast } from '@/hooks/useScrollReveal'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

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

const timeline = [
  { year: '2005', title: 'Foundation', description: 'SCPHD founded in Springfield with a mission to bridge peace, justice, and human dignity in post-conflict regions.' },
  { year: '2008', title: 'First Country Program', description: 'Launched our inaugural program in Northern Uganda, reaching 3,200 beneficiaries in the first year.' },
  { year: '2011', title: 'Global Expansion', description: 'Expanded operations to 12 countries across Africa and the Middle East, establishing permanent field offices.' },
  { year: '2014', title: 'Peace Education Initiative', description: 'Launched our flagship education program, training 50,000 students in conflict resolution and civic engagement.' },
  { year: '2017', title: '$50M Milestone', description: 'Surpassed $50 million in total funds deployed, with 96% going directly to programs.' },
  { year: '2020', title: 'Pandemic Response', description: 'Mobilized emergency COVID-19 response across 28 countries, supporting 1.2M vulnerable individuals.' },
  { year: '2023', title: '47 Countries', description: 'Reached operations in 47 countries with 380+ active programs and 2.1M lives impacted.' },
  { year: '2025', title: 'Vision 2030', description: 'Launched our strategic roadmap to impact 5 million lives by 2030 through scalable, community-led programs.' },
]

const leadership = [
  { name: 'Dr. Katherine Mensah', role: 'Executive Director', bio: 'Former UNHCR senior advisor with 20+ years in humanitarian leadership.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format' },
  { name: 'James Okonkwo', role: 'Deputy Director, Programs', bio: 'Oxford-trained development economist specializing in post-conflict reconstruction.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format' },
  { name: 'Dr. Fatima Al-Rashidi', role: 'Director of Research', bio: 'Leading authority on peace education measurement and impact evaluation.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format' },
  { name: 'Sarah Mitchell', role: 'Director of Development', bio: 'Former European Commission peace program director with deep institutional partnerships.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format' },
  { name: 'Dr. Amara Diallo', role: 'Chief Medical Officer', bio: 'Physician and public health expert who led mobile clinic programs across the Sahel.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format' },
  { name: 'David Nakamura', role: 'CFO & Head of Operations', bio: 'CPA with 15 years in nonprofit financial management and regulatory compliance.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format' },
]

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
          Two Decades of<br />
          <em className="not-italic text-navy-600 dark:text-gold-400">Impact</em>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const itemRef = useRef<HTMLDivElement>(null)
              const itemInView = useInView(itemRef, { once: true, margin: '-50px' })
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.year}
                  ref={itemRef}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={itemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className={cn('relative flex items-start gap-8 md:gap-0', isLeft ? 'md:flex-row' : 'md:flex-row-reverse')}
                >
                  <div className="hidden md:block md:w-1/2" />

                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-500 rounded-full border-4 border-white dark:border-navy-950 z-10 mt-6" />

                  <div className="md:w-1/2 md:pl-12 ml-12 md:ml-0">
                    <div className="bg-cream-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-gold-500 font-[family-name:var(--font-display)] text-3xl font-bold mb-2">{item.year}</div>
                      <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
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
        <meta name="description" content="Learn about SCPHD's mission, vision, core values, and two decades of humanitarian impact across 47 countries." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=900&fit=crop&auto=format" alt="About SCPHD" className="w-full h-full object-cover" />
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
            Since 2005, we have worked at the intersection of peacebuilding, humanitarian aid, and community development — delivering measurable, lasting change.
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
              <div className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-6">
                <div className="text-gold-500 font-[family-name:var(--font-display)] text-5xl font-bold mb-2 number-glow">2030</div>
                <p className="text-navy-900 dark:text-white font-semibold text-sm">Our Vision 2030 goal: Impact 5 million lives through scalable, community-led programs across 60 countries.</p>
              </div>
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
            {coreValues.map((value, i) => {
              const cardRef = useRef<HTMLDivElement>(null)
              const cardInView = useInView(cardRef, { once: true, margin: '-50px' })
              return (
                <motion.div
                  key={value.title}
                  ref={cardRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="bg-cream-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-sm p-8 relative overflow-hidden group"
                >
                  <motion.div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <motion.div
                      className="h-0.5 bg-gold-500 mb-5 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={cardInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.08 + 0.3 }}
                    />
                    <div className="text-gold-500 mb-4">{value.icon}</div>
                    <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              )
            })}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, i) => {
              const personRef = useRef<HTMLDivElement>(null)
              const personInView = useInView(personRef, { once: true, margin: '-50px' })
              return (
                <motion.div
                  key={person.name}
                  ref={personRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={personInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm overflow-hidden group"
                >
                  <div className="relative h-64 bg-navy-100 overflow-hidden">
                    <motion.img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <motion.div className="h-0.5 bg-gold-500 mb-4 origin-left" initial={{ scaleX: 0 }} animate={personInView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.08 + 0.3 }} />
                    <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-lg font-bold mb-1">{person.name}</h3>
                    <div className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-3">{person.role}</div>
                    <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">{person.bio}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
