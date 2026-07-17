import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { articles } from '@/data/articles'

export default function NewsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')

  const latest = articles[0]

  return (
    <section className="bg-cream-100 py-24 lg:py-32 relative overflow-hidden z-10">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
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
          <Link
            to="/news"
            className="self-start md:self-end text-gold-600 text-sm font-bold hover:text-gold-700 transition-colors group"
          >
            All Publications
            <span className="ml-1 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured article */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-sm bg-navy-950 card-lift">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={latest.image}
                alt={latest.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-gold-500 text-navy-900">
                  {latest.category}
                </span>
                <span className="text-white/40 text-xs">{latest.date}</span>
              </div>
              <h3 className="text-white font-display text-xl font-bold mb-1">{latest.title}</h3>
              <p className="text-white/50 text-sm line-clamp-2">{latest.excerpt}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Recent article */}
            <Link to="/news" className="block bg-white rounded-sm border border-navy-100 p-5 card-lift flex-1">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-navy-100 text-navy-600">
                {articles[1].category}
              </span>
              <p className="text-xs text-slate-400 mt-2 mb-2">{articles[1].date}</p>
              <h4 className="text-navy-900 font-display text-sm font-bold leading-snug mb-1">
                {articles[1].title}
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                {articles[1].excerpt}
              </p>
            </Link>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address for newsletter"
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
