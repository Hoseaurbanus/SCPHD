import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const events = [
  {
    image: '/images/events/4.jpg',
    title: 'Community Peace Workshop',
    date: 'Coming Soon',
    location: 'Gombe State',
  },
  {
    image: '/images/events/5.jpg',
    title: 'Health Outreach Program',
    date: 'Coming Soon',
    location: 'Gombe State',
  },
]

export default function EventsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden z-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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
          <Link
            to="/events"
            className="self-start md:self-end text-gold-600 text-sm font-bold hover:text-gold-700 transition-colors group"
          >
            Full Event Calendar
            <span className="ml-1 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <Link
              key={event.title}
              to="/events"
            >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group relative overflow-hidden rounded-sm bg-navy-950"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-2">{event.date}</div>
                <h3 className="text-white font-display text-xl font-bold mb-1">{event.title}</h3>
                <p className="text-white/50 text-sm">{event.location}</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
