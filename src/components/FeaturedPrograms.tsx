import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FeaturedProgramsProps {
  navigate: (p: string) => void
}

const featured = [
  {
    title: 'Gombe Peace Project',
    subtitle: 'Promoting Interfaith Harmony & Community Peacebuilding',
    description: 'A youth-led initiative founded in 2019 to promote peaceful coexistence and interfaith dialogue across Gombe State, following the tragic Easter crisis. Through community engagement, hospital visits, and grassroots advocacy, the project has become a model for peacebuilding in North-East Nigeria.',
    status: 'Active',
    year: '2019 \u2013 Present',
  },
  {
    title: 'P/CVE Coalition Building',
    subtitle: 'Preventing & Countering Violent Extremism',
    description: 'In collaboration with WANEP-Nigeria, a two-day capacity-building workshop training community stakeholders in coalition building, early warning systems, and countering extremist narratives to prevent radicalisation and violence.',
    status: 'Completed',
    year: 'February 2023',
  },
  {
    title: 'Tangale Cultural Heritage',
    subtitle: 'Restoration, Preservation & Protection',
    description: 'A Mellon Foundation-funded initiative to restore, preserve and protect the Tangale people\u2019s language, culinary traditions, festivals, religious diversity and settlement history in Gombe State.',
    status: 'Completed',
    year: '2023 \u2013 2024',
  },
]

export default function FeaturedPrograms({ navigate }: FeaturedProgramsProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-cream-100 py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
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
            View All Programs →
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              onClick={() => navigate('programs')}
              className="bg-white rounded-sm border border-navy-100 p-8 card-lift cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm ${program.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-600'}`}>
                  {program.status}
                </span>
                <span className="text-xs text-slate-400">{program.year}</span>
              </div>
              <h3 className="text-navy-900 font-display text-xl font-bold mb-1">{program.title}</h3>
              <p className="text-navy-500 text-sm mb-3">{program.subtitle}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{program.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
