import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const team = [
  { name: 'Dr. Miriam Osei', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format', bio: 'Former UN Special Adviser with 28 years in conflict transformation and peacebuilding across 30+ countries.' },
  { name: 'Dr. Rafael Monteiro', role: 'Director of Programs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format', bio: 'Expert in education in emergencies. Led UNESCO programs in South Sudan, Haiti, and Syria.' },
  { name: 'Amina Hassan', role: 'Director of Partnerships', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format', bio: 'Built strategic partnerships with governments and foundations totaling $78M in humanitarian funding.' },
  { name: 'Thomas Lindqvist', role: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format', bio: 'Certified nonprofit accountant ensuring 96¢ of every dollar reaches our programs directly.' },
  { name: 'Dr. Yuki Tanaka', role: 'Director of Research', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format', bio: 'Pioneering the evidence base for community-led peace. Published in Nature and The Lancet.' },
  { name: 'Ibrahim Al-Sayed', role: 'Regional Director, MENA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format', bio: 'Leading operations across 14 countries in the Middle East and North Africa since 2009.' },
]

const values = [
  { title: 'Human Dignity', icon: '◉', desc: 'Every person deserves to be treated with dignity and compassion, regardless of origin.' },
  { title: 'Transparency', icon: '◎', desc: 'We share our data, outcomes, and challenges openly with all stakeholders.' },
  { title: 'Community First', icon: '◈', desc: 'Solutions must come from within communities, not imposed from the outside.' },
  { title: 'Evidence & Learning', icon: '◇', desc: 'We measure what we do, learn from failure, and continuously improve our methods.' },
  { title: 'Inclusiveness', icon: '○', desc: 'Peace requires the participation of women, youth, and all marginalized voices.' },
  { title: 'Sustainability', icon: '●', desc: 'We build local capacity so our impact far outlasts our physical presence.' },
]

const timeline = [
  { year: '2005', event: 'Founded in Springfield by a coalition of educators and humanitarian workers.' },
  { year: '2008', event: 'First international program launched in post-conflict Liberia — 3,200 beneficiaries.' },
  { year: '2011', event: 'Expanded to 12 countries; received first USAID grant of $3.2M.' },
  { year: '2014', event: 'Launched Peace Education Initiative — now reaching 240,000 students annually.' },
  { year: '2017', event: 'Received ECOSOC consultative status at the United Nations.' },
  { year: '2020', event: 'COVID response program reached 1.8M people with emergency health and food support.' },
  { year: '2022', event: 'Crossed milestone: 2 million cumulative beneficiaries served since founding.' },
  { year: '2025', event: 'Operating in 47 countries with $124M+ total funds deployed. 12,400 active volunteers.' },
]

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {children}
    </motion.div>
  )
}

function ValueCard({ title, icon, desc, index }: { title: string; icon: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ backgroundColor: '#F8F7F4', transition: { duration: 0.2 } }}
      className="bg-white p-8 group cursor-default"
    >
      <motion.div whileHover={{ scale: 1.2 }} className="text-gold-500 text-2xl mb-4 inline-block">
        {icon}
      </motion.div>
      <h4 className="text-navy-900 font-display text-lg font-bold mb-2 group-hover:text-navy-600 transition-colors">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function TimelineItem({ year, event, index }: { year: string; event: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="flex gap-4 md:gap-6 items-start md:items-center"
    >
      <div className="w-14 sm:w-28 md:w-36 flex-shrink-0 text-left sm:text-right pr-0 sm:pr-4 pt-1 md:pt-0">
        <span className="text-navy-900 font-display text-base sm:text-xl font-bold">{year}</span>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.08 + 0.1, type: 'spring', stiffness: 400 }}
        className="relative flex-shrink-0 z-10 mt-1.5 md:mt-0"
      >
        <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-gold-500 rounded-full" style={{ boxShadow: '0 0 8px rgba(196,154,46,0.6)' }} />
      </motion.div>
      <motion.div
        whileHover={{ x: 4, backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(11,29,58,0.08)', transition: { duration: 0.2 } }}
        className="flex-1 bg-white/60 rounded-sm px-4 md:px-6 py-3 md:py-4 border border-slate-200/80 transition-all duration-300"
      >
        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{event}</p>
      </motion.div>
    </motion.div>
  )
}

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-sm mb-4 bg-navy-100 aspect-square">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white/80 text-xs leading-relaxed">{member.bio}</p>
        </div>
      </div>
      <h4 className="text-navy-900 font-display font-bold text-lg leading-snug mb-0.5 group-hover:text-navy-600 transition-colors">{member.name}</h4>
      <div className="text-gold-600 text-xs font-bold tracking-wide uppercase">{member.role}</div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=600&fit=crop&auto=format" alt="Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/88" />
          <div className="absolute inset-0 lines-bg opacity-20" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-5"
          >
            About SCPHD
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-white font-display font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Nearly Two Decades<br />
            <em className="not-italic gradient-text">of Peace in Action</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Founded in 2005, SCPHD has grown from a local initiative into a globally recognized humanitarian organization operating across 47 countries and 6 continents.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <FadeSection>
              <div className="border-l-4 border-gold-500 pl-8 py-2">
                <div className="text-gold-700 text-[10px] font-bold tracking-widest uppercase mb-3">Our Mission</div>
                <p className="text-navy-900 font-display text-2xl font-bold leading-snug">
                  To advance sustainable peace and human dignity through education, advocacy, humanitarian response, and community empowerment — with and for the world's most vulnerable people.
                </p>
              </div>
            </FadeSection>
            <FadeSection delay={0.1}>
              <div className="border-l-4 border-navy-600 pl-8 py-2">
                <div className="text-navy-600 text-[10px] font-bold tracking-widest uppercase mb-3">Our Vision</div>
                <p className="text-navy-900 font-display text-2xl font-bold leading-snug">
                  A world where every community has the capacity, resources, and freedom to live in peace, dignity, and shared prosperity — regardless of geography or circumstance.
                </p>
              </div>
            </FadeSection>
          </div>

          {/* Values */}
          <FadeSection>
            <h2 className="text-navy-900 font-display text-4xl font-bold mb-10">Core Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-100">
              {values.map(({ title, icon, desc }, i) => (
                <ValueCard key={title} title={title} icon={icon} desc={desc} index={i} />
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="section-label mb-5">Our Story</div>
            <h2 className="text-navy-900 font-display text-4xl font-bold mb-14">Two Decades of Impact</h2>
          </FadeSection>
          <div className="relative">
            <div className="absolute left-[72px] sm:left-[120px] md:left-[144px] top-0 bottom-0 w-px bg-gradient-to-b from-gold-500 via-navy-300 to-transparent" />
            <div className="space-y-6">
              {timeline.map(({ year, event }, i) => (
                <TimelineItem key={year} year={year} event={event} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeSection>
            <div className="section-label mb-4">Leadership</div>
            <h2 className="text-navy-900 font-display text-4xl font-bold mb-14">Our Leadership Team</h2>
          </FadeSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
