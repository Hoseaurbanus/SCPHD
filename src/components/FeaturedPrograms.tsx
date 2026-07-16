import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Page } from '../App'

interface FeaturedProgramsProps {
  navigate: (p: Page) => void
}

const programs = [
  {
    id: '01', category: 'Education',
    title: 'Peace Education Initiative',
    description: 'Equipping 240,000 students across conflict zones with critical thinking, conflict resolution, and civic engagement.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '240,000 students',
    countries: '18 countries',
    status: 'Active', statusColor: 'bg-emerald-500',
    progress: 72,
    tagColor: 'bg-blue-900/60 text-blue-300',
  },
  {
    id: '02', category: 'Healthcare',
    title: 'Community Health Access',
    description: 'Mobile health clinics and telemedicine reaching remote and displaced populations with primary and maternal care.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '890,000 patients',
    countries: '12 countries',
    status: 'Active', statusColor: 'bg-emerald-500',
    progress: 58,
    tagColor: 'bg-red-900/60 text-red-300',
  },
  {
    id: '03', category: 'Livelihoods',
    title: "Women's Economic Empowerment",
    description: 'Micro-financing, vocational training, and market linkages enabling 45,000 women entrepreneurs to flourish.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '45,000 women',
    countries: '9 countries',
    status: 'Active', statusColor: 'bg-emerald-500',
    progress: 84,
    tagColor: 'bg-purple-900/60 text-purple-300',
  },
  {
    id: '04', category: 'Conflict Resolution',
    title: 'Dialogue for Peace',
    description: 'Structured community dialogue and truth-and-reconciliation processes in 320 post-conflict communities.',
    image: 'https://images.unsplash.com/photo-1573495803045-33a9e46f8d6a?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '320 communities',
    countries: '14 countries',
    status: 'Ongoing', statusColor: 'bg-blue-500',
    progress: 45,
    tagColor: 'bg-emerald-900/60 text-emerald-300',
  },
]

function ProgramCard({ prog, index }: { prog: typeof programs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
      className="group bg-white rounded-sm overflow-hidden cursor-pointer relative"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)' }}
    >
      {/* Image with parallax */}
      <div className="relative h-56 bg-navy-100 overflow-hidden">
        <motion.img
          src={prog.image}
          alt={prog.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${prog.tagColor} text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase backdrop-blur-sm rounded-sm`}>
            {prog.category}
          </span>
          <span className={`${prog.statusColor} text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded-sm flex items-center gap-1.5`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            {prog.status}
          </span>
        </div>

        {/* Number */}
        <span className="absolute bottom-3 left-4 text-white/15 font-display text-5xl font-bold leading-none">
          {prog.id}
        </span>

        {/* Hover CTA overlay */}
        <motion.div
          className="absolute inset-0 bg-navy-900/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-white font-semibold text-sm border border-white/40 px-5 py-2.5 rounded-sm hover:bg-white/10 transition-colors">
            View Program Details →
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Top accent line */}
        <motion.div
          className="h-0.5 bg-gold-500 mb-4 origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        />

        <h3 className="text-navy-900 font-display text-xl font-bold mb-2.5 group-hover:text-navy-600 transition-colors duration-300 leading-snug">
          {prog.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{prog.description}</p>

        {/* Meta */}
        <div className="flex gap-5 text-xs mb-5">
          <div>
            <div className="text-slate-400 mb-0.5">Beneficiaries</div>
            <div className="text-navy-900 font-bold">{prog.beneficiaries}</div>
          </div>
          <div className="w-px bg-slate-100" />
          <div>
            <div className="text-slate-400 mb-0.5">Active In</div>
            <div className="text-navy-900 font-bold">{prog.countries}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Progress</span>
            <span className="text-navy-900 font-bold">{prog.progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
              initial={{ width: '0%' }}
              animate={inView ? { width: `${prog.progress}%` } : {}}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedPrograms({ navigate }: FeaturedProgramsProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-cream-100 py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-5"
            >
              Featured Programs
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-navy-900 font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Where Your Support<br />
              <em className="not-italic text-navy-600">Goes to Work</em>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate('programs')}
            whileHover={{ scale: 1.03, backgroundColor: '#0B1D3A', color: '#fff' }}
            whileTap={{ scale: 0.97 }}
            className="self-start md:self-end px-7 py-3 border-2 border-navy-900 text-navy-900 text-sm font-bold tracking-wide rounded-sm transition-all duration-300"
          >
            View All 380+ Programs →
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((prog, i) => (
            <ProgramCard key={prog.id} prog={prog} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
