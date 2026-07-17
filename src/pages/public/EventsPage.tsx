import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const eventPhotos = [
  { src: '/images/events/women-skills-1.jpg', alt: 'Women displaying handmade flip-flops from the skills acquisition program' },
  { src: '/images/events/women-skills-2.jpg', alt: 'Participant crafting footwear at the workshop in Billiri' },
  { src: '/images/events/women-skills-3.jpg', alt: 'Group of women showing their finished products' },
  { src: '/images/events/women-skills-4.jpg', alt: 'Participants with handmade sandals they produced' },
]

export default function EventsPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const eventRef = useRef<HTMLDivElement>(null)
  const eventInView = useInView(eventRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <>
      <Helmet>
        <title>Events — SCPHD | Conferences, Workshops & Programmes</title>
        <meta name="description" content="SCP HD events — skills acquisition, peace forums, workshops, and community development programmes across Nigeria." />
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
            Events
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Join Us in Building<br />
            <em className="not-italic gradient-text">a Better World</em>
          </motion.h1>
        </div>
      </section>

      {/* Event: Women Skills Acquisition */}
      <section ref={headerRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Event Header */}
          <div ref={eventRef} className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-5"
            >
              Past Event
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Women Skills Acquisition &<br />
              <em className="not-italic text-navy-600 dark:text-gold-400">Empowerment Programme</em>
            </motion.h2>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-sm bg-gold-500/15 text-gold-600 dark:text-gold-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Completed
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-sm bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Billiri, Gombe State
              </span>
            </div>

            <p className="text-slate-600 dark:text-white/55 text-base leading-relaxed max-w-3xl">
              A community-driven skills acquisition programme designed to empower women in Billiri with practical vocational skills in footwear production. Participants learned to craft handmade flip-flops and sandals, equipping them with sustainable livelihoods and economic independence.
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {eventPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-sm overflow-hidden bg-navy-100 dark:bg-navy-800 group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-sm p-8"
          >
            <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl font-bold mb-4">
              Programme Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-gold-500 font-[family-name:var(--font-display)] text-2xl font-bold mb-1">Women Trained</div>
                <p className="text-slate-500 dark:text-white/45 text-sm">Multiple women gained hands-on skills in footwear production and business fundamentals.</p>
              </div>
              <div>
                <div className="text-gold-500 font-[family-name:var(--font-display)] text-2xl font-bold mb-1">Skills Taught</div>
                <p className="text-slate-500 dark:text-white/45 text-sm">Handmade flip-flop and sandal crafting, material sourcing, and product finishing.</p>
              </div>
              <div>
                <div className="text-gold-500 font-[family-name:var(--font-display)] text-2xl font-bold mb-1">Community Impact</div>
                <p className="text-slate-500 dark:text-white/45 text-sm">Participants gained a sustainable source of income to support their families and communities.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
