import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { programs } from '@/data/programs'

export default function ProgramsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
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

      {/* Programs Grid */}
      <section ref={headerRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="space-y-6">
            {programs.map((program, i) => {
              const isExpanded = expandedId === program.id
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm overflow-hidden card-lift"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : program.id)}
                    className="w-full text-left p-6 lg:p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm ${program.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-navy-100 text-navy-600 dark:bg-navy-800 dark:text-navy-300'}`}>
                            {program.status}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-white/35">{program.year}</span>
                        </div>
                        <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold mb-1">
                          {program.title}
                        </h3>
                        <p className="text-navy-500 dark:text-white/50 text-sm mb-3">{program.subtitle}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-white/35">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {program.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            {program.type}
                          </span>
                          {program.partner && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              Partner: {program.partner}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full bg-navy-50 dark:bg-navy-800 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-navy-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8 border-t border-navy-100 dark:border-navy-800 pt-6">
                          <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-6">{program.summary}</p>

                          {program.activities && (
                            <div className="mb-6">
                              <h4 className="text-navy-900 dark:text-white font-bold text-sm mb-3">Key Activities</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {program.activities.map((activity) => (
                                  <div key={activity} className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                                    {activity}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {program.keyTopics && (
                            <div className="mb-6">
                              <h4 className="text-navy-900 dark:text-white font-bold text-sm mb-3">Training Topics</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {program.keyTopics.map((topic) => (
                                  <div key={topic} className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {program.partners && (
                            <div className="mb-6">
                              <h4 className="text-navy-900 dark:text-white font-bold text-sm mb-3">Partners & Stakeholders</h4>
                              <div className="flex flex-wrap gap-2">
                                {program.partners.map((p) => (
                                  <span key={p} className="px-3 py-1 text-xs font-medium bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-300 rounded-sm">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="text-navy-900 dark:text-white font-bold text-sm mb-3">Full Report</h4>
                            <div className="space-y-3">
                              {program.fullReport.map((paragraph, pi) => (
                                <p key={pi} className="text-slate-600 dark:text-white/50 text-sm leading-relaxed">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>

                          {program.mediaCoverage && program.mediaCoverage.length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-navy-900 dark:text-white font-bold text-sm mb-3">Media Coverage</h4>
                              <div className="space-y-2">
                                {program.mediaCoverage.map((mc) => (
                                  <a
                                    key={mc.url}
                                    href={mc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-2 text-sm text-gold-600 dark:text-gold-400 hover:underline"
                                  >
                                    <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-gold-500" />
                                    <span>{mc.source} \u2014 {mc.title} ({mc.date})</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
