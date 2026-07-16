import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const articles = [
  {
    number: '01', category: 'Field Report', categoryColor: 'text-emerald-700 bg-emerald-50',
    date: 'January 28, 2025',
    title: 'Water Wells Transform Three Villages in Northern Mali',
    excerpt: 'After 18 months of construction and community training, SCPHD completed 12 solar-powered wells providing clean water to 8,400 residents in the Gao, Timbuktu, and Kidal regions.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=600&fit=crop&auto=format',
    readTime: '6 min read',
    featured: true,
    catColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    number: '02', category: 'Research', categoryColor: 'text-blue-700 bg-blue-50',
    date: 'January 15, 2025',
    title: 'Community-Led Mediation Reduces Conflict Recurrence by 68%',
    excerpt: 'Our five-year longitudinal study across 14 post-conflict zones reveals dramatically higher peace sustainability rates for SCPHD-trained communities.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format',
    readTime: '12 min read',
    featured: false,
    catColor: 'bg-blue-50 text-blue-700',
  },
  {
    number: '03', category: 'Partnership', categoryColor: 'text-gold-700 bg-gold-100',
    date: 'January 8, 2025',
    title: 'SCPHD Signs MOU with UNHCR to Expand Refugee Education',
    excerpt: 'A landmark agreement will extend our Peace Education Initiative to 12 new refugee camps across Sub-Saharan Africa, reaching 40,000 children.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&auto=format',
    readTime: '4 min read',
    featured: false,
    catColor: 'bg-gold-100 text-gold-800',
  },
]

export default function NewsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-cream-100 py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-4"
            >
              News & Publications
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-navy-900 font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Stories from<br />
              <em className="not-italic text-navy-600">the Field</em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#"
            className="self-start md:self-end text-gold-600 text-sm font-bold hover:text-gold-700 transition-colors group"
          >
            All Publications
            <span className="ml-1 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </motion.a>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured */}
          {articles.filter(a => a.featured).map((a) => (
            <motion.article
              key={a.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
              className="lg:col-span-2 group bg-white rounded-sm overflow-hidden cursor-pointer"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="relative h-72 bg-navy-100 overflow-hidden">
                <motion.img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white/12 font-display text-6xl font-bold leading-none">{a.number}</span>
              </div>
              <div className="p-7">
                {/* Top accent line */}
                <motion.div
                  className="h-0.5 bg-gold-500 mb-5 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider ${a.catColor}`}>
                    {a.category}
                  </span>
                  <span className="text-slate-400 text-xs">{a.date}</span>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className="text-slate-400 text-xs">{a.readTime}</span>
                </div>
                <h3 className="text-navy-900 font-display text-2xl font-bold mb-3 group-hover:text-navy-600 transition-colors leading-snug">
                  {a.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{a.excerpt}</p>
                <motion.span
                  whileHover={{ x: 4 }}
                  className="text-gold-600 text-sm font-bold hover:text-gold-700 transition-colors inline-block"
                >
                  Read Full Report →
                </motion.span>
              </div>
            </motion.article>
          ))}

          {/* Side panel */}
          <div className="flex flex-col gap-4">
            {articles.filter(a => !a.featured).map((a, i) => (
              <motion.article
                key={a.number}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                whileHover={{ x: -4, transition: { duration: 0.2 } }}
                className="group bg-white rounded-sm overflow-hidden cursor-pointer flex flex-row"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="w-24 flex-shrink-0 bg-navy-100 overflow-hidden">
                  <motion.img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-4 flex-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${a.catColor}`}>
                    {a.category}
                  </span>
                  <h3 className="text-navy-900 font-display text-sm font-bold leading-snug mt-1.5 mb-1 group-hover:text-navy-600 transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <div className="text-slate-400 text-xs">{a.date} · {a.readTime}</div>
                </div>
              </motion.article>
            ))}

            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
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
                <p className="text-white text-sm font-semibold mb-3 leading-snug">
                  Get field reports and impact stories in your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/8 border border-white/15 text-white placeholder-white/25 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#D4AA45' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gold-500 text-navy-900 text-xs font-bold px-3 py-2.5 rounded-sm"
                  >
                    →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
