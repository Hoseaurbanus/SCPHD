import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import type { Page } from '../App'

interface HeroProps {
  navigate: (p: Page) => void
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&auto=format',
    tag: 'Humanitarian Aid',
    headline: ['Building Peace,', 'One Community', 'at a Time'],
    sub: 'We work at the intersection of peace, justice, and human dignity — delivering measurable impact across 47 countries.',
    accent: '#C49A2E',
  },
  {
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=1080&fit=crop&auto=format',
    tag: 'Education & Development',
    headline: ['Empowering the', 'Next Generation', 'of Peacemakers'],
    sub: 'Through education and capacity building, we equip communities with the tools to resolve conflict and build lasting stability.',
    accent: '#C49A2E',
  },
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&auto=format',
    tag: 'Community Health',
    headline: ['Every Life', 'Deserves', 'Dignity'],
    sub: "Delivering essential healthcare, clean water, and nutritional support to the world's most vulnerable populations.",
    accent: '#C49A2E',
  },
]

const statsBar = [
  { value: '47+', label: 'Countries' },
  { value: '2.1M+', label: 'Lives Impacted' },
  { value: '380', label: 'Active Programs' },
  { value: '$124M+', label: 'Funds Deployed' },
]

export default function Hero({ navigate }: HeroProps) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, 180])
  const opacityScroll = useTransform(scrollY, [0, 400], [1, 0])

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 7000)
  }

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goTo = (idx: number) => {
    setCurrent(idx)
    startInterval()
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-navy-950"
    >
      {/* Parallax background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].tag}
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/75 to-navy-900/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-900/20 z-10" />

      {/* Vertical line grid decoration */}
      <div className="absolute inset-0 z-10 lines-bg opacity-40" />

      {/* Floating gold orb */}
      <motion.div
        className="absolute right-[15%] top-[20%] w-64 h-64 rounded-full z-10 pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(196,154,46,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity: opacityScroll }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex flex-col justify-center pt-24 pb-40"
      >
        {/* Slide tag */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-7"
            style={{ color: '#C49A2E' }}
          >
            {slides[current].tag}
          </motion.div>
        </AnimatePresence>

        {/* Headline — word by word */}
        <div className="mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={`headline-${current}`}>
              {slides[current].headline.map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.7, delay: li * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                    className="text-white font-display leading-[1.05] font-bold block"
                    style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
                  >
                    {li === 0 ? line : (
                      <em className="not-italic gradient-text">{line}</em>
                    )}
                  </motion.h1>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subheading */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/65 text-lg leading-relaxed max-w-xl mb-10 font-light"
          >
            {slides[current].sub}
          </motion.p>
        </AnimatePresence>

        {/* CTA buttons */}
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
            className="px-9 py-4 border border-white/25 text-white font-semibold text-sm tracking-wide rounded-sm transition-colors"
          >
            Explore Programs
          </motion.button>
          {/* Award badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            className="hidden lg:flex items-center gap-3 ml-4 glass rounded-sm px-4 py-2.5"
          >
            <div className="w-7 h-7 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xs">★</div>
            <div>
              <div className="text-white text-xs font-semibold">Charity Navigator</div>
              <div className="text-white/50 text-[10px]">4-Star Rated Organization</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-[120px] left-6 lg:left-12 z-20 flex items-center gap-4">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="flex items-center gap-1.5 group">
            <motion.div
              className="h-0.5 rounded-full bg-white/30 overflow-hidden"
              animate={{ width: i === current ? 40 : 16 }}
              transition={{ duration: 0.4 }}
            >
              {i === current && (
                <motion.div
                  className="h-full bg-gold-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                />
              )}
            </motion.div>
          </button>
        ))}
        <span className="text-white/30 text-xs ml-2">{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-[120px] right-6 lg:right-12 z-20 flex flex-col items-center gap-2"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-white/40 text-[10px] tracking-widest uppercase writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 glass-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4">
          {statsBar.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className={`py-4 md:py-5 px-3 md:px-4 text-center border-white/10 group cursor-default ${
                i % 2 !== 1 ? 'border-r' : ''
              } md:border-r md:last:border-0`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-gold-400 font-display text-2xl font-bold number-glow mb-0.5"
              >
                {value}
              </motion.div>
              <div className="text-white/45 text-[11px] tracking-wide">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
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
        <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase rotate-90 mt-2">Scroll</span>
      </motion.div>
    </section>
  )
}
