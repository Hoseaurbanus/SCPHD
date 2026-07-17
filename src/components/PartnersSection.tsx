import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PartnersSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-3 mb-3 section-label justify-center">
              Trusted Partners
            </div>
            <p className="text-slate-400 text-sm">Partnering with organizations, governments, and foundations to extend our reach.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-sm bg-slate-50"
          >
            <img
              src="/images/partners/3.jpg"
              alt="SCPHD partner organizations"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-white/70 text-sm">Official partnerships will be displayed here.</p>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <div className="section-label justify-center mb-3">What Partners Say</div>
            <h2 className="text-navy-900 font-display font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              Trusted by Those Who Know the Field
            </h2>
          </motion.div>

          <div className="bg-cream-100 rounded-sm p-8 text-center">
            <p className="text-slate-500 text-sm">Testimonials from our partners will appear here.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
