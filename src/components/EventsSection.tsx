import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const events = [
  {
    date: { day: '18', month: 'Feb', year: '2025' },
    category: 'Conference', categoryColor: 'bg-navy-800 text-navy-200',
    title: 'International Peace Forum 2025',
    location: 'Springfield Convention Center',
    description: '500+ peace practitioners, policymakers, and academics for three days of dialogue and strategy.',
    seats: 48,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-navy-700 text-navy-200',
  },
  {
    date: { day: '03', month: 'Mar', year: '2025' },
    category: 'Workshop', categoryColor: 'bg-gold-100 text-gold-800',
    title: 'Trauma-Informed Community Leadership',
    location: 'Virtual + Springfield HQ',
    description: 'A two-day intensive on trauma-sensitive approaches to post-conflict reconciliation for community leaders.',
    seats: 12,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-gold-100 text-gold-800',
  },
  {
    date: { day: '22', month: 'Mar', year: '2025' },
    category: 'Fundraiser', categoryColor: 'bg-emerald-50 text-emerald-700',
    title: 'Annual Gala for Humanity',
    location: 'Grand Ballroom, Springfield',
    description: 'Our flagship fundraising dinner — keynote speakers, live entertainment, and the SCPHD Impact Awards.',
    seats: 120,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-emerald-50 text-emerald-700',
  },
]

export default function EventsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-4"
            >
              Upcoming Events
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-navy-900 font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Join Us in Building<br />
              <em className="not-italic text-navy-600">a Better World</em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#"
            className="self-start md:self-end text-gold-600 text-sm font-bold hover:text-gold-700 transition-colors group"
          >
            Full Event Calendar
            <span className="ml-1 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </motion.a>
        </div>

        {/* Events */}
        <div className="space-y-5">
          {events.map((ev, i) => (
            <motion.article
              key={ev.title}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="group grid grid-cols-1 sm:grid-cols-[90px_1fr] md:grid-cols-[100px_160px_1fr] border border-slate-200 rounded-sm overflow-hidden hover:border-navy-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Date block */}
              <div className="bg-navy-900 flex sm:flex-col items-center justify-center px-6 py-4 sm:p-5 gap-4 sm:gap-0 sm:text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-gold-400 font-display text-3xl font-bold leading-none">{ev.date.day}</div>
                  <div className="text-white/50 text-xs tracking-widest uppercase mt-1">{ev.date.month} {ev.date.year}</div>
                </motion.div>
              </div>

              {/* Image — hidden on mobile, shown on sm+ */}
              <div className="relative hidden md:block h-auto overflow-hidden bg-navy-100">
                <motion.img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="flex-1 px-6 py-5 flex flex-col justify-center bg-white group-hover:bg-cream-50 transition-colors duration-300">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm ${ev.tagColor}`}>
                    {ev.category}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1.5">
                    <span>📍</span> {ev.location}
                  </span>
                </div>
                <h3 className="text-navy-900 font-display text-lg font-bold mb-1.5 group-hover:text-navy-700 transition-colors leading-snug">
                  {ev.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{ev.description}</p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: ev.seats < 20 ? [1, 0.4, 1] : 1 }}
                      transition={{ duration: 1.2, repeat: ev.seats < 20 ? Infinity : 0 }}
                      className={`w-1.5 h-1.5 rounded-full ${ev.seats < 20 ? 'bg-red-500' : 'bg-emerald-500'}`}
                    />
                    <span className="text-xs text-slate-500">
                      <strong className="text-navy-900">{ev.seats}</strong> seats remaining
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="text-xs font-bold text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    Register Now →
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
