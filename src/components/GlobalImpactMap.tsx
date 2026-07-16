import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const regions = [
  { id: 'west-africa', name: 'West Africa', x: '42%', y: '56%', programs: 28, beneficiaries: '480K', focus: 'Peace Education, Healthcare' },
  { id: 'east-africa', name: 'East Africa', x: '56%', y: '60%', programs: 34, beneficiaries: '620K', focus: 'Emergency Relief, Livelihoods' },
  { id: 'north-africa', name: 'North Africa', x: '49%', y: '44%', programs: 18, beneficiaries: '210K', focus: 'Conflict Resolution, WASH' },
  { id: 'middle-east', name: 'Middle East', x: '60%', y: '42%', programs: 22, beneficiaries: '380K', focus: 'Emergency Relief, Education' },
  { id: 'south-asia', name: 'South Asia', x: '70%', y: '48%', programs: 16, beneficiaries: '190K', focus: 'Healthcare, Livelihoods' },
  { id: 'southeast-asia', name: 'SE Asia', x: '78%', y: '56%', programs: 12, beneficiaries: '94K', focus: 'Peacebuilding, Youth Dev' },
  { id: 'central-america', name: 'Central America', x: '22%', y: '54%', programs: 9, beneficiaries: '68K', focus: 'Women Empowerment' },
  { id: 'eastern-europe', name: 'Eastern Europe', x: '52%', y: '32%', programs: 14, beneficiaries: '105K', focus: 'Refugee Support, Education' },
]

export default function GlobalImpactMap() {
  const [hovered, setHovered] = useState<typeof regions[0] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden">
      {/* Grid lines background */}
      <div className="absolute inset-0 lines-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              Global Presence
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-white font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Operating Across<br />
              <em className="not-italic gradient-text">47 Countries</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-xs max-w-[260px] leading-relaxed"
          >
            Tap or hover a region to explore programs, beneficiaries, and focus areas.
          </motion.p>
        </div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-sm overflow-hidden"
          style={{ aspectRatio: '2/1', background: 'linear-gradient(180deg, #0B1D3A 0%, #040c18 100%)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* SVG World map simplified */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.12 }}
          >
            {/* Simplified continent outlines */}
            {/* North America */}
            <path d="M 80 80 L 220 60 L 260 100 L 240 180 L 200 220 L 160 240 L 100 200 L 60 150 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* South America */}
            <path d="M 170 260 L 240 250 L 260 320 L 240 400 L 200 430 L 160 400 L 150 320 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Europe */}
            <path d="M 430 60 L 540 50 L 560 120 L 510 150 L 450 140 L 420 100 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Africa */}
            <path d="M 430 160 L 530 150 L 570 220 L 560 340 L 500 400 L 440 380 L 400 300 L 410 220 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Middle East / Asia */}
            <path d="M 560 100 L 760 80 L 820 140 L 800 200 L 720 220 L 640 200 L 580 160 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* SE Asia / Oceania */}
            <path d="M 760 220 L 840 200 L 880 260 L 860 320 L 800 300 L 760 260 Z" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>

          {/* Connection lines between dots */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {regions.map((r, i) =>
              regions.slice(i + 1, i + 3).map((r2) => (
                <motion.line
                  key={`${r.id}-${r2.id}`}
                  x1={parseFloat(r.x)}
                  y1={parseFloat(r.y)}
                  x2={parseFloat(r2.x)}
                  y2={parseFloat(r2.y)}
                  stroke="rgba(196,154,46,0.12)"
                  strokeWidth="0.2"
                  strokeDasharray="1,1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 1 + i * 0.1 }}
                />
              ))
            )}
          </svg>

          {/* Region dots */}
          {regions.map((region, i) => (
            <motion.div
              key={region.id}
              className="absolute"
              style={{ left: region.x, top: region.y, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08, type: 'spring', stiffness: 300 }}
              onMouseEnter={() => setHovered(region)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered(h => h?.id === region.id ? null : region)}
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-500/40"
                animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold-500/20"
                animate={{ scale: [1, 3.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 + 0.5 }}
              />

              {/* Main dot */}
              <motion.div
                whileHover={{ scale: 1.5 }}
                className="relative w-3 h-3 rounded-full bg-gold-500 cursor-pointer z-10"
                style={{ boxShadow: '0 0 12px rgba(196,154,46,0.8)' }}
              />
            </motion.div>
          ))}

          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute z-30 glass rounded-sm px-4 py-3 min-w-[200px] pointer-events-none"
                style={{
                  left: hovered.x,
                  top: `calc(${hovered.y} - 10px)`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-1">{hovered.name}</div>
                <div className="text-white font-semibold text-sm mb-1">{hovered.programs} Active Programs</div>
                <div className="text-white/60 text-xs mb-1">{hovered.beneficiaries} beneficiaries</div>
                <div className="text-white/40 text-[10px]">{hovered.focus}</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/15" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Region summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { region: 'Africa', count: '24 countries', programs: 80 },
            { region: 'Middle East & Asia', count: '14 countries', programs: 50 },
            { region: 'Europe & CIS', count: '6 countries', programs: 14 },
            { region: 'The Americas', count: '3 countries', programs: 9 },
          ].map(({ region, count, programs }) => (
            <div key={region} className="glass rounded-sm px-4 py-3">
              <div className="text-gold-400 text-xs font-bold tracking-wide mb-0.5">{region}</div>
              <div className="text-white text-sm font-semibold">{count}</div>
              <div className="text-white/40 text-xs">{programs} programs</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
