import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, slideLeft } from '../hooks/useScrollReveal'

const categories = ['All', 'Education', 'Healthcare', 'Livelihoods', 'Conflict Resolution', 'Emergency Relief', 'Environment']

const programs = [
  { id: '01', category: 'Education', title: 'Peace Education Initiative', location: '18 countries', beneficiaries: '240,000 students', budget: '$8.4M', status: 'Active', progress: 72, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop&auto=format', description: 'Equipping students in conflict zones with conflict resolution, critical thinking, and civic skills through a structured curriculum in 1,240 schools.' },
  { id: '02', category: 'Healthcare', title: 'Mobile Health Clinics', location: '12 countries', beneficiaries: '890,000 patients', budget: '$12.2M', status: 'Active', progress: 58, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&auto=format', description: 'Solar-powered mobile clinics providing primary care, maternal health, vaccinations, and disease screening to remote populations.' },
  { id: '03', category: 'Livelihoods', title: "Women's Economic Empowerment", location: '9 countries', beneficiaries: '45,000 women', budget: '$5.1M', status: 'Active', progress: 84, image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop&auto=format', description: 'Micro-financing, business skills training, and market linkages enabling women entrepreneurs to achieve financial independence.' },
  { id: '04', category: 'Conflict Resolution', title: 'Dialogue for Peace', location: '14 countries', beneficiaries: '320 communities', budget: '$3.8M', status: 'Ongoing', progress: 45, image: 'https://images.unsplash.com/photo-1573495803045-33a9e46f8d6a?w=800&h=500&fit=crop&auto=format', description: 'Structured community dialogue processes for facilitated mediation, truth-telling, and reconciliation in post-conflict societies.' },
  { id: '05', category: 'Emergency Relief', title: 'Rapid Response Fund', location: 'Global', beneficiaries: '180,000 displaced', budget: '$22M', status: 'Active', progress: 91, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop&auto=format', description: 'Pre-positioned supplies and rapid deployment teams providing life-saving assistance within 72 hours of a crisis onset.' },
  { id: '06', category: 'Environment', title: 'Green Futures Initiative', location: '8 countries', beneficiaries: '94,000 farmers', budget: '$6.7M', status: 'Active', progress: 34, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&auto=format', description: 'Climate-smart agriculture, reforestation, and water management addressing the nexus of environmental degradation and conflict.' },
]

const statusColor: Record<string, string> = {
  Active: 'bg-emerald-500', Ongoing: 'bg-blue-500', Completed: 'bg-slate-400',
}

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  const filtered = activeCategory === 'All' ? programs : programs.filter(p => p.category === activeCategory)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-navy-900 py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/70" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ originX: 0, display: 'block' }} className="w-6 h-0.5 bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase">Programs & Projects</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h1 variants={slideLeft} className="text-white font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Every Program,<br />
              <em className="text-gold-400 not-italic">a Lifeline</em>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-sm max-w-xs leading-relaxed">
              380+ active programs across 47 countries, spanning education, health, livelihoods, and peace.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-sm tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-navy-300 hover:text-navy-900'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <div ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((prog, i) => (
                  <motion.article
                    key={prog.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(11,29,58,0.12)' }}
                    onClick={() => setSelectedProgram(prog)}
                    className="group bg-white rounded-sm overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-44 bg-navy-100 overflow-hidden">
                      <motion.img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-navy-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 tracking-wider uppercase">{prog.category}</span>
                        <span className={`${statusColor[prog.status]} text-white text-[10px] font-semibold px-2 py-0.5 tracking-wider uppercase`}>{prog.status}</span>
                      </div>
                      <span className="absolute bottom-3 left-3 text-white/20 font-display text-3xl font-bold">{prog.id}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-navy-900 font-display text-lg font-bold mb-2 leading-snug group-hover:text-navy-700 transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{prog.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                        {[{ l: 'Location', v: prog.location }, { l: 'Reach', v: prog.beneficiaries }, { l: 'Budget', v: prog.budget }].map(({ l, v }) => (
                          <div key={l}><div className="text-slate-400">{l}</div><div className="text-navy-900 font-semibold text-[11px]">{v}</div></div>
                        ))}
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-navy-900 font-semibold">{prog.progress}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${prog.progress}%` } : {}}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.08 + 0.3 }}
                            className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-navy-950/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="bg-white max-w-2xl w-full rounded-sm overflow-hidden max-h-[90svh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 to-transparent" />
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.4)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 text-white rounded-sm flex items-center justify-center text-sm"
                >
                  ✕
                </motion.button>
                <div className="absolute bottom-4 left-6">
                  <span className="text-white/20 font-display text-5xl font-bold">{selectedProgram.id}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-navy-100 text-navy-800 text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">{selectedProgram.category}</span>
                  <span className={`${statusColor[selectedProgram.status]} text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider`}>{selectedProgram.status}</span>
                </div>
                <h2 className="text-navy-900 font-display text-3xl font-bold mb-3">{selectedProgram.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{selectedProgram.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 border-t border-slate-100 pt-6">
                  {[{ l: 'Location', v: selectedProgram.location }, { l: 'Beneficiaries', v: selectedProgram.beneficiaries }, { l: 'Budget', v: selectedProgram.budget }].map(({ l, v }) => (
                    <div key={l}><div className="text-slate-400 text-xs mb-1">{l}</div><div className="text-navy-900 font-semibold text-sm">{v}</div></div>
                  ))}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Overall progress</span>
                    <span className="text-navy-900 font-semibold">{selectedProgram.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedProgram.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#D4AA45' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 bg-gold-500 text-navy-900 font-semibold text-sm rounded-sm"
                  >
                    Support This Program
                  </motion.button>
                  <motion.button
                    whileHover={{ borderColor: '#0B1D3A', color: '#0B1D3A' }}
                    className="px-5 py-3 border border-slate-200 text-slate-600 text-sm rounded-sm transition-colors"
                  >
                    Download Report
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
