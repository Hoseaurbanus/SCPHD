import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const partners = [
  { name: 'United Nations', abbr: 'UN', type: 'Multilateral' },
  { name: 'UNHCR', abbr: 'UNHCR', type: 'UN Agency' },
  { name: 'USAID', abbr: 'USAID', type: 'Government' },
  { name: 'European Union', abbr: 'EU', type: 'Multilateral' },
  { name: 'World Bank', abbr: 'WB', type: 'Finance' },
  { name: 'ICRC', abbr: 'ICRC', type: 'Humanitarian' },
  { name: 'Gates Foundation', abbr: 'BGF', type: 'Foundation' },
  { name: 'Open Society', abbr: 'OSF', type: 'Foundation' },
]

const testimonials = [
  {
    quote: "SCPHD's field-level rigor and community trust made them an exceptional implementing partner for our conflict prevention portfolio. Their data quality is unmatched.",
    author: 'Sarah Mitchell',
    role: 'Director of Peace Programs, European Commission',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format',
  },
  {
    quote: "Their data-driven approach to measuring community impact is setting a new standard for accountability in the humanitarian sector. We're proud to partner with them.",
    author: 'James Okonkwo',
    role: 'Senior Adviser, USAID Bureau for Conflict & Stabilization',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
  },
  {
    quote: "SCPHD's work in the Sahel has been transformative. The trust they've built with local communities over decades enables the kind of access no other organization has.",
    author: 'Fatima Al-Rashidi',
    role: 'Regional Representative, UNHCR West Africa',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format',
  },
]

export default function PartnersSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Partners */}
        <div ref={headerRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-3 mb-3 section-label justify-center">
              Trusted Partners
            </div>
            <p className="text-slate-400 text-sm">Partnering with leading international organizations, governments, and foundations worldwide.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-px bg-slate-100 overflow-hidden rounded-sm">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ backgroundColor: '#f0f6fb', transition: { duration: 0.2 } }}
                className="bg-white flex flex-col items-center justify-center py-7 px-3 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, backgroundColor: '#1E3A5F' }}
                  className="w-12 h-12 bg-navy-900 rounded-sm flex items-center justify-center mb-2 transition-colors duration-300"
                >
                  <span className="text-white text-[9px] font-bold tracking-wide leading-tight text-center">{p.abbr}</span>
                </motion.div>
                <span className="text-slate-300 text-[10px] text-center group-hover:text-slate-400 transition-colors">{p.type}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
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

          {/* Testimonial carousel */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="bg-cream-100 rounded-sm p-8 lg:p-10 border-l-4 border-gold-500 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.08) 0%, transparent 70%)' }}
                />
                <svg className="text-gold-400 w-9 h-7 mb-6 fill-current" viewBox="0 0 40 28">
                  <path d="M0 28V17.5C0 12.3 1.5 8.1 4.5 4.9 7.5 1.6 11.5 0 16.5 0v5C14 5 12 5.8 10.5 7.4 9 9 8.3 11 8.3 13.5h8.2V28H0zm22 0V17.5c0-5.2 1.5-9.4 4.5-12.6C29.5 1.6 33.5 0 38.5 0v5C36 5 34 5.8 32.5 7.4 31 9 30.3 11 30.3 13.5h8.2V28H22z"/>
                </svg>
                <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold-300"
                  />
                  <div>
                    <div className="text-navy-900 font-bold text-sm">{testimonials[activeTestimonial].author}</div>
                    <div className="text-slate-400 text-xs leading-snug mt-0.5">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  whileHover={{ scale: 1.3 }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-gold-500 w-8' : 'bg-slate-300 w-3 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
