import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const roles = [
  { role: 'Field Work', desc: 'On-the-ground delivery', icon: '🏕', count: '3,200+' },
  { role: 'Education', desc: 'Teaching & training', icon: '📚', count: '2,800+' },
  { role: 'Healthcare', desc: 'Medical support', icon: '🏥', count: '1,400+' },
  { role: 'Digital & Tech', desc: 'Remote assistance', icon: '💻', count: '1,900+' },
  { role: 'Legal Aid', desc: 'Rights & advocacy', icon: '⚖', count: '620+' },
  { role: 'Fundraising', desc: 'Events & outreach', icon: '🤝', count: '2,480+' },
]

export default function VolunteerSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=900&fit=crop&auto=format"
          alt="Volunteers"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-navy-950/88" />
      <div className="absolute inset-0 lines-bg opacity-20" />

      {/* Gold gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-5"
            >
              Volunteer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-white font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Your Time Is the<br />
              <em className="not-italic gradient-text">Greatest Gift</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/55 text-base leading-relaxed mb-10 max-w-md"
            >
              Whether you can spare a weekend or a year, your skills and energy help us reach further. Join 12,400+ volunteers making a tangible difference in 47 countries.
            </motion.p>

            {/* Role grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {roles.map((r, i) => (
                <motion.div
                  key={r.role}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(196,154,46,0.4)', transition: { duration: 0.2 } }}
                  className="glass border border-white/8 rounded-sm px-4 py-4 cursor-pointer group transition-all duration-300"
                >
                  <div className="text-xl mb-2">{r.icon}</div>
                  <div className="text-white text-xs font-bold group-hover:text-gold-400 transition-colors duration-300">{r.role}</div>
                  <div className="text-white/40 text-[10px] mt-0.5">{r.desc}</div>
                  <div className="text-gold-500/60 text-[10px] font-semibold mt-1">{r.count}</div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(196,154,46,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-8 py-3.5 bg-gold-500 text-navy-900 font-bold text-sm tracking-wide rounded-sm"
              >
                Apply to Volunteer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 border border-white/25 text-white font-semibold text-sm tracking-wide rounded-sm transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '12,400+', label: 'Active volunteers' },
                { value: '840K+', label: 'Hours contributed' },
                { value: '47', label: 'Countries represented' },
                { value: '94%', label: 'Volunteer satisfaction' },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.04 }}
                  className="glass border border-white/8 rounded-sm px-5 py-6 text-center"
                >
                  <div className="text-gold-400 font-display text-3xl font-bold number-glow mb-1">{value}</div>
                  <div className="text-white/45 text-xs">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="glass border border-white/8 rounded-sm p-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/60 to-gold-500/0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              />
              <svg className="text-gold-500/50 w-8 h-6 mb-4 fill-current" viewBox="0 0 40 28">
                <path d="M0 28V17.5C0 12.3 1.5 8.1 4.5 4.9 7.5 1.6 11.5 0 16.5 0v5C14 5 12 5.8 10.5 7.4 9 9 8.3 11 8.3 13.5h8.2V28H0zm22 0V17.5c0-5.2 1.5-9.4 4.5-12.6C29.5 1.6 33.5 0 38.5 0v5C36 5 34 5.8 32.5 7.4 31 9 30.3 11 30.3 13.5h8.2V28H22z"/>
              </svg>
              <p className="text-white/65 text-sm leading-relaxed italic mb-5">
                "Volunteering with SCPHD in Northern Uganda was the most transformative experience of my life. The organization's commitment to community-led change is unlike anything I've seen elsewhere."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
                  alt="Dr. Amara Diallo"
                  className="w-10 h-10 rounded-full object-cover border border-gold-500/30"
                />
                <div>
                  <div className="text-white text-sm font-semibold">Dr. Amara Diallo</div>
                  <div className="text-white/35 text-xs">Physician Volunteer, Gulu Program 2024</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-500 text-xs">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
