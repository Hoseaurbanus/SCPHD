import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const allArticles = [
  {
    id: 1,
    number: '01',
    category: 'Field Report',
    catColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    date: 'January 28, 2025',
    title: 'Water Wells Transform Three Villages in Northern Mali',
    excerpt: 'After 18 months of construction and community training, SCPHD completed 12 solar-powered wells providing clean water to 8,400 residents in the Gao, Timbuktu, and Kidal regions.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=600&fit=crop&auto=format',
    readTime: '6 min read',
    featured: true,
    author: 'Dr. Fatima Al-Rashidi',
  },
  {
    id: 2,
    number: '02',
    category: 'Research',
    catColor: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    date: 'January 15, 2025',
    title: 'Community-Led Mediation Reduces Conflict Recurrence by 68%',
    excerpt: 'Our five-year longitudinal study across 14 post-conflict zones reveals dramatically higher peace sustainability rates for SCPHD-trained communities.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format',
    readTime: '12 min read',
    featured: false,
    author: 'James Okonkwo',
  },
  {
    id: 3,
    number: '03',
    category: 'Partnership',
    catColor: 'bg-gold-100 text-gold-800 dark:bg-gold-500/10 dark:text-gold-400',
    date: 'January 8, 2025',
    title: 'SCPHD Signs MOU with UNHCR to Expand Refugee Education',
    excerpt: 'A landmark agreement will extend our Peace Education Initiative to 12 new refugee camps across Sub-Saharan Africa, reaching 40,000 children.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&auto=format',
    readTime: '4 min read',
    featured: false,
    author: 'Sarah Mitchell',
  },
  {
    id: 4,
    number: '04',
    category: 'Field Report',
    catColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    date: 'December 18, 2024',
    title: 'Mobile Clinics Reach 50,000 Patients in South Sudan',
    excerpt: 'Our Rapid Response medical teams deployed to 14 newly accessible areas in Unity and Upper Nile states, providing critical healthcare to displaced populations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format',
    readTime: '8 min read',
    featured: false,
    author: 'Dr. Amara Diallo',
  },
  {
    id: 5,
    number: '05',
    category: 'Impact Report',
    catColor: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    date: 'December 10, 2024',
    title: '2024 Year in Review: Record-Breaking Impact',
    excerpt: 'SCPHD reached 430,000 new beneficiaries in 2024, deployed $38M in programs, and expanded to 3 new countries — our most impactful year to date.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop&auto=format',
    readTime: '10 min read',
    featured: false,
    author: 'Dr. Katherine Mensah',
  },
  {
    id: 6,
    number: '06',
    category: 'Education',
    catColor: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    date: 'November 22, 2024',
    title: 'Peace Education Curriculum Adopted by 8 National Governments',
    excerpt: 'Following a successful pilot in 4 countries, our peace education framework has been formally adopted into national school curricula across Sub-Saharan Africa.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&auto=format',
    readTime: '7 min read',
    featured: false,
    author: 'James Okonkwo',
  },
]

const categories = ['All', 'Field Report', 'Research', 'Partnership', 'Impact Report', 'Education']

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const featured = allArticles.find(a => a.featured)!
  const sideArticles = allArticles.filter(a => !a.featured)
  const filteredArticles = activeCategory === 'All' ? allArticles : allArticles.filter(a => a.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>News & Publications — SCPHD | Stories from the Field</title>
        <meta name="description" content="Read the latest field reports, research findings, partnership announcements, and impact stories from SCPHD's work across 47 countries." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=900&fit=crop&auto=format" alt="News" className="w-full h-full object-cover" />
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

      {/* Editorial Grid - Featured + Side */}
      <section ref={headerRef} className="bg-white dark:bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {/* Featured */}
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="lg:col-span-2 group bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden cursor-pointer border border-navy-100 dark:border-navy-700"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="relative h-72 bg-navy-100 overflow-hidden">
                <motion.img src={featured.image} alt={featured.title} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white/12 font-[family-name:var(--font-display)] text-6xl font-bold leading-none">{featured.number}</span>
              </div>
              <div className="p-7">
                <motion.div className="h-0.5 bg-gold-500 mb-5 origin-left" initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} />
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={cn('text-[10px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider', featured.catColor)}>{featured.category}</span>
                  <span className="text-slate-400 dark:text-white/30 text-xs">{featured.date}</span>
                  <span className="text-slate-300 dark:text-white/20 text-xs">·</span>
                  <span className="text-slate-400 dark:text-white/30 text-xs">{featured.readTime}</span>
                </div>
                <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-2xl font-bold mb-3 group-hover:text-navy-600 dark:group-hover:text-gold-400 transition-colors leading-snug">{featured.title}</h2>
                <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gold-600 dark:text-gold-400 text-sm font-bold group-hover:text-gold-700 transition-colors">Read Full Report →</span>
                  <span className="text-slate-400 dark:text-white/30 text-xs">By {featured.author}</span>
                </div>
              </div>
            </motion.article>

            {/* Side panel */}
            <div className="flex flex-col gap-4">
              {sideArticles.slice(0, 2).map((a, i) => (
                <motion.article
                  key={a.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={headerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ x: -4, transition: { duration: 0.2 } }}
                  className="group bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden cursor-pointer flex flex-row border border-navy-100 dark:border-navy-700"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div className="w-24 flex-shrink-0 bg-navy-100 overflow-hidden">
                    <motion.img src={a.image} alt={a.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                  </div>
                  <div className="p-4 flex-1">
                    <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider', a.catColor)}>{a.category}</span>
                    <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-sm font-bold leading-snug mt-1.5 mb-1 group-hover:text-navy-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">{a.title}</h3>
                    <div className="text-slate-400 dark:text-white/30 text-xs">{a.date} · {a.readTime}</div>
                  </div>
                </motion.article>
              ))}

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

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-300 border',
                  activeCategory === cat
                    ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 border-navy-900 dark:border-gold-500'
                    : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-white/50 border-navy-200 dark:border-navy-700 hover:border-navy-400'
                )}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* All articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((a, i) => {
              const cardRef = useRef<HTMLDivElement>(null)
              const cardInView = useInView(cardRef, { once: true, margin: '-50px' })
              return (
                <motion.article
                  key={a.id}
                  ref={cardRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group bg-cream-50 dark:bg-navy-800 rounded-sm overflow-hidden cursor-pointer border border-navy-100 dark:border-navy-700"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div className="relative h-48 bg-navy-100 overflow-hidden">
                    <motion.img src={a.image} alt={a.title} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-white/12 font-[family-name:var(--font-display)] text-4xl font-bold leading-none">{a.number}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider', a.catColor)}>{a.category}</span>
                      <span className="text-slate-400 dark:text-white/30 text-xs">{a.date}</span>
                    </div>
                    <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-lg font-bold leading-snug mb-2 group-hover:text-navy-600 dark:group-hover:text-gold-400 transition-colors">{a.title}</h3>
                    <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed line-clamp-2 mb-3">{a.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-600 dark:text-gold-400 text-xs font-bold group-hover:text-gold-700 transition-colors">Read More →</span>
                      <span className="text-slate-400 dark:text-white/25 text-[10px]">{a.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="md">Load More Articles</Button>
          </div>
        </div>
      </section>
    </>
  )
}
