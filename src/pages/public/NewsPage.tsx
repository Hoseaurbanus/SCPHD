import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'

export default function NewsPage() {
  const [email, setEmail] = useState('')
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <>
      <Helmet>
        <title>News & Publications — SCPHD | Stories from the Field</title>
        <meta name="description" content="Read the latest field reports, research findings, partnership announcements, and impact stories from SCPHD's work." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-950" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            News & Publications
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Stories from<br />
            <em className="not-italic gradient-text">the Field</em>
          </motion.h1>
        </div>
      </section>

      {/* Editorial Grid */}
      <section ref={headerRef} className="bg-white dark:bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {/* Featured placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="lg:col-span-2 bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden border border-navy-100 dark:border-navy-700"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <EmptyState
                title="No featured article"
                description="Featured articles will appear here once published."
              />
            </motion.div>

            {/* Side panel placeholder */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden border border-navy-100 dark:border-navy-700"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <EmptyState
                  title="No recent articles"
                  description="Recent articles will appear here."
                />
              </motion.div>

              {/* Newsletter signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="bg-navy-900 rounded-sm p-5 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.5) 0%, transparent 70%)' }}
                />
                <div className="relative z-10">
                  <div className="text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-2">Monthly Digest</div>
                  <p className="text-white text-sm font-semibold mb-3 leading-snug">Get field reports and impact stories in your inbox.</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/8 border border-white/15 text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                    <motion.button whileHover={{ scale: 1.05, backgroundColor: '#D4AA45' }} whileTap={{ scale: 0.95 }} className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-2.5 rounded-sm">→</motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* All articles grid */}
          <EmptyState
            title="No news articles published yet"
            description="News and updates will appear here."
          />

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="md" disabled>Load More Articles</Button>
          </div>
        </div>
      </section>
    </>
  )
}
