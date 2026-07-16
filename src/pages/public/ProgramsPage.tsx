import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/helpers'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { PROGRAM_CATEGORIES } from '@/utils/constants'

const programs = [
  {
    id: '1',
    category: 'Education',
    title: 'Peace Education Initiative',
    description: 'Equipping 240,000 students across conflict zones with critical thinking, conflict resolution, and civic engagement skills through integrated curricula.',
    longDescription: 'Our flagship Peace Education Initiative operates in 18 countries, working with local ministries of education to integrate peacebuilding principles into school curricula. The program has trained 4,200 teachers and developed culturally sensitive learning materials in 14 languages.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '240,000 students',
    countries: '18 countries',
    status: 'Active',
    progress: 72,
    budget: 12500000,
    tagColor: 'bg-blue-50 text-blue-700',
  },
  {
    id: '2',
    category: 'Healthcare',
    title: 'Community Health Access',
    description: 'Mobile health clinics and telemedicine reaching remote and displaced populations with primary and maternal care.',
    longDescription: 'Community Health Access deploys 48 mobile clinics and a telemedicine network serving 12 countries. The program provides maternal care, vaccinations, mental health support, and chronic disease management to populations with limited healthcare access.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '890,000 patients',
    countries: '12 countries',
    status: 'Active',
    progress: 58,
    budget: 18200000,
    tagColor: 'bg-red-50 text-red-700',
  },
  {
    id: '3',
    category: 'Livelihoods',
    title: "Women's Economic Empowerment",
    description: 'Micro-financing, vocational training, and market linkages enabling 45,000 women entrepreneurs to flourish.',
    longDescription: 'This program provides micro-loans, business training, and mentorship to women in post-conflict and underserved communities. Our graduates have launched 12,000+ businesses, creating over 35,000 jobs in their communities.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '45,000 women',
    countries: '9 countries',
    status: 'Active',
    progress: 84,
    budget: 8700000,
    tagColor: 'bg-purple-50 text-purple-700',
  },
  {
    id: '4',
    category: 'Conflict Resolution',
    title: 'Dialogue for Peace',
    description: 'Structured community dialogue and truth-and-reconciliation processes in 320 post-conflict communities.',
    longDescription: 'Dialogue for Peace facilitates community-led mediation and reconciliation processes in post-conflict settings. Our trained facilitators have helped resolve over 2,800 local disputes and established 320 community peace committees.',
    image: 'https://images.unsplash.com/photo-1573495803045-33a9e46f8d6a?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '320 communities',
    countries: '14 countries',
    status: 'Active',
    progress: 45,
    budget: 6400000,
    tagColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: '5',
    category: 'Emergency Relief',
    title: 'Rapid Response Network',
    description: 'Emergency shelter, food security, and medical aid deployed within 48 hours of crisis onset.',
    longDescription: 'Our Rapid Response Network maintains pre-positioned emergency supplies and trained response teams in 8 regional hubs. We can deploy within 48 hours of a crisis, providing shelter, clean water, food, and medical care.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '1.2M individuals',
    countries: '22 countries',
    status: 'Active',
    progress: 67,
    budget: 32000000,
    tagColor: 'bg-amber-50 text-amber-700',
  },
  {
    id: '6',
    category: 'Environment',
    title: 'Clean Water Initiative',
    description: 'Solar-powered water systems and sanitation infrastructure for 200 underserved communities.',
    longDescription: 'The Clean Water Initiative has installed 840 solar-powered water systems and built 1,200 sanitation facilities across 200 communities. Our community-managed approach ensures long-term sustainability with 98% system uptime.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&h=600&fit=crop&auto=format',
    beneficiaries: '380,000 people',
    countries: '11 countries',
    status: 'Active',
    progress: 53,
    budget: 9100000,
    tagColor: 'bg-teal-50 text-teal-700',
  },
]

export default function ProgramsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const filteredPrograms = activeFilter === 'All' ? programs : programs.filter(p => p.category === activeFilter)

  return (
    <>
      <Helmet>
        <title>Our Programs — SCPHD | Education, Healthcare & Peacebuilding</title>
        <meta name="description" content="Explore SCPHD's 380+ active programs across education, healthcare, livelihoods, conflict resolution, emergency relief, and environment in 47 countries." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[360px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=900&fit=crop&auto=format" alt="Programs" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            Our Programs
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Where Support<br />
            <em className="not-italic gradient-text">Goes to Work</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
            380+ active programs across 47 countries, each designed to create measurable, sustainable impact.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section ref={headerRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {PROGRAM_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'px-5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-300 border',
                  activeFilter === cat
                    ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 border-navy-900 dark:border-gold-500 shadow-lg'
                    : 'bg-white dark:bg-navy-900 text-navy-700 dark:text-white/60 border-navy-200 dark:border-navy-700 hover:border-navy-400 dark:hover:border-navy-500'
                )}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Program count */}
          <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="mb-8">
            <p className="text-slate-500 dark:text-white/40 text-sm">
              Showing <strong className="text-navy-900 dark:text-white">{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Programs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {filteredPrograms.map((prog, i) => {
                const cardRef = useRef<HTMLDivElement>(null)
                const cardInView = useInView(cardRef, { once: true, margin: '-50px' })
                return (
                  <motion.div
                    key={prog.id}
                    ref={cardRef}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="bg-white dark:bg-navy-900 rounded-sm overflow-hidden cursor-pointer group border border-navy-100 dark:border-navy-800"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                    onClick={() => setSelectedProgram(prog)}
                  >
                    <div className="relative h-52 bg-navy-100 overflow-hidden">
                      <motion.img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`${prog.tagColor} text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm`}>
                          {prog.category}
                        </span>
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded-sm flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                          </span>
                          {prog.status}
                        </span>
                      </div>
                      <motion.div className="absolute inset-0 bg-navy-900/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-semibold text-sm border border-white/40 px-5 py-2.5 rounded-sm">View Details →</span>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <motion.div className="h-0.5 bg-gold-500 mb-4 origin-left" initial={{ scaleX: 0 }} animate={cardInView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.08 + 0.3 }} />

                      <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl font-bold mb-2.5 group-hover:text-navy-600 dark:group-hover:text-gold-400 transition-colors leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed mb-5 line-clamp-2">{prog.description}</p>

                      <div className="flex gap-5 text-xs mb-5">
                        <div>
                          <div className="text-slate-400 dark:text-white/30 mb-0.5">Beneficiaries</div>
                          <div className="text-navy-900 dark:text-white font-bold">{prog.beneficiaries}</div>
                        </div>
                        <div className="w-px bg-slate-100 dark:bg-navy-700" />
                        <div>
                          <div className="text-slate-400 dark:text-white/30 mb-0.5">Active In</div>
                          <div className="text-navy-900 dark:text-white font-bold">{prog.countries}</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 dark:text-white/30">Progress</span>
                          <span className="text-navy-900 dark:text-white font-bold">{prog.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-navy-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                            initial={{ width: '0%' }}
                            animate={cardInView ? { width: `${prog.progress}%` } : {}}
                            transition={{ duration: 1.2, delay: i * 0.08 + 0.5, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedProgram} onClose={() => setSelectedProgram(null)} title={selectedProgram?.title} size="lg">
        {selectedProgram && (
          <div>
            <div className="relative h-56 -m-5 mb-5 overflow-hidden">
              <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              <div className="absolute bottom-4 left-5 flex gap-2">
                <span className={`${selectedProgram.tagColor} text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm`}>{selectedProgram.category}</span>
                <Badge variant="success" size="sm" dot>{selectedProgram.status}</Badge>
              </div>
            </div>

            <p className="text-slate-600 dark:text-white/55 text-sm leading-relaxed mb-6">{selectedProgram.longDescription}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Beneficiaries</div>
                <div className="text-navy-900 dark:text-white font-bold">{selectedProgram.beneficiaries}</div>
              </div>
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Countries</div>
                <div className="text-navy-900 dark:text-white font-bold">{selectedProgram.countries}</div>
              </div>
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Budget</div>
                <div className="text-navy-900 dark:text-white font-bold">{formatCurrency(selectedProgram.budget)}</div>
              </div>
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Progress</div>
                <div className="text-navy-900 dark:text-white font-bold">{selectedProgram.progress}%</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Program Completion</span>
                <span className="text-navy-900 font-bold">{selectedProgram.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${selectedProgram.progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <a href="/donate" className="flex-1">
                <Button variant="primary" size="md" className="w-full">Donate to This Program</Button>
              </a>
              <Button variant="outline" size="md" onClick={() => setSelectedProgram(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
