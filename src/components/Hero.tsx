import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroProps {
  navigate: (p: string) => void
}

const slides = [
  '/images/general/1.jpg',
  '/images/general/2.jpg',
]

export default function Hero({ navigate }: HeroProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-navy-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[current]}
            alt="SCPHD community event"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/30" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex flex-col justify-center pt-24 pb-28">
        <div className="section-label mb-7 text-gold-500">
          SCPHD
        </div>

        <div className="mb-8">
          <h1 className="text-white font-display leading-[1.05] font-bold drop-shadow-lg" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}>
            Building Peace,<br />
            <em className="not-italic gradient-text">One Community</em><br />
            at a Time
          </h1>
        </div>

        <p className="text-white/80 text-lg leading-relaxed max-w-xl mb-10 font-light drop-shadow">
          We work at the intersection of peace, justice, and human dignity — delivering measurable impact worldwide.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <motion.button
            onClick={() => navigate('donate')}
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(196,154,46,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary px-9 py-4 bg-gold-500 text-navy-900 font-bold text-sm tracking-wider rounded-sm"
          >
            Donate Now
          </motion.button>
          <motion.button
            onClick={() => navigate('programs')}
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-sm transition-colors backdrop-blur-sm bg-white/5"
          >
            Explore Programs
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 glass-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '100+', label: 'Partners' },
            { value: '4', label: 'Countries' },
            { value: '2', label: 'Programs' },
            { value: '21', label: 'States' },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-4 md:py-5 px-3 md:px-4 text-center border-white/10 cursor-default ${
                i % 2 !== 1 ? 'border-r' : ''
              } md:border-r md:last:border-0`}
            >
              <div className="text-gold-400 font-display text-2xl font-bold number-glow mb-0.5">
                {value}
              </div>
              <div className="text-white/60 text-[11px] tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-gold-500 w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-white/60"
        />
        <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase rotate-90 mt-2">Scroll</span>
      </motion.div>
    </section>
  )
}
