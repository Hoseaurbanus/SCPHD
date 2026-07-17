import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { articles } from '@/data/articles'

export default function NewsPage() {
  const [email, setEmail] = useState('')
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const featured = articles[0]
  const recent = articles[1]
  const remainingArticles = articles.slice(2)

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
      {featured && (
      <section ref={headerRef} className="bg-white dark:bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {/* Featured article */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="lg:col-span-2 bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden border border-navy-100 dark:border-navy-700 card-lift"
            >
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm bg-gold-500 text-navy-900">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 dark:text-white/35 mb-2">{featured.date}</p>
                <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl font-bold mb-3 leading-snug">
                  {featured.title}
                </h3>
                <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-navy-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 rounded-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Side panel */}
            <div className="flex flex-col gap-4">
              {/* Recent article */}
              {recent && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden border border-navy-100 dark:border-navy-700 card-lift"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={recent.image} alt={recent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm bg-navy-900/80 text-gold-400">
                      {recent.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-400 dark:text-white/35 mb-1.5">{recent.date}</p>
                  <h4 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-sm font-bold leading-snug mb-2">
                    {recent.title}
                  </h4>
                  <p className="text-slate-400 dark:text-white/40 text-xs leading-relaxed line-clamp-2">
                    {recent.excerpt}
                  </p>
                </div>
              </motion.div>
              )}

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
          {remainingArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {remainingArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-cream-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-sm overflow-hidden card-lift"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm bg-gold-100 dark:bg-gold-500/15 text-gold-700 dark:text-gold-400">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-white/35">{article.date}</span>
                  </div>
                  <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-lg font-bold mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs bg-navy-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 rounded-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          )}
        </div>
      </section>
      )}
    </>
  )
}
