import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'

const allEvents = [
  {
    id: 1,
    date: { day: '18', month: 'Feb', year: '2025', full: 'February 18, 2025' },
    category: 'Conference',
    categoryColor: 'bg-navy-800 text-navy-200',
    title: 'International Peace Forum 2025',
    location: 'Springfield Convention Center',
    description: '500+ peace practitioners, policymakers, and academics for three days of dialogue and strategy on global peacebuilding challenges.',
    longDescription: 'The International Peace Forum is our flagship annual gathering bringing together 500+ peace practitioners, policymakers, and academics. This three-day event features keynote addresses, panel discussions, workshops, and networking opportunities focused on emerging peacebuilding challenges and innovative solutions.',
    seats: 48,
    totalSeats: 500,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-navy-700 text-navy-200',
    type: 'In-Person',
  },
  {
    id: 2,
    date: { day: '03', month: 'Mar', year: '2025', full: 'March 3, 2025' },
    category: 'Workshop',
    categoryColor: 'bg-gold-100 text-gold-800',
    title: 'Trauma-Informed Community Leadership',
    location: 'Virtual + Springfield HQ',
    description: 'A two-day intensive on trauma-sensitive approaches to post-conflict reconciliation for community leaders.',
    longDescription: 'This workshop equips community leaders with practical tools for trauma-informed leadership in post-conflict settings. Participants learn evidence-based approaches to supporting community healing while building their own resilience.',
    seats: 12,
    totalSeats: 60,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-gold-100 text-gold-800',
    type: 'Hybrid',
  },
  {
    id: 3,
    date: { day: '22', month: 'Mar', year: '2025', full: 'March 22, 2025' },
    category: 'Fundraiser',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    title: 'Annual Gala for Humanity',
    location: 'Grand Ballroom, Springfield',
    description: 'Our flagship fundraising dinner — keynote speakers, live entertainment, and the SCPHD Impact Awards.',
    longDescription: 'Join us for an evening of inspiration, celebration, and generosity. The Annual Gala features keynote addresses from global leaders, live entertainment, the presentation of the SCPHD Impact Awards, and a live auction benefiting our programs.',
    seats: 120,
    totalSeats: 350,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-emerald-50 text-emerald-700',
    type: 'In-Person',
  },
  {
    id: 4,
    date: { day: '08', month: 'Apr', year: '2025', full: 'April 8, 2025' },
    category: 'Webinar',
    categoryColor: 'bg-blue-50 text-blue-700',
    title: 'Data-Driven Peacebuilding: Lessons from the Field',
    location: 'Virtual',
    description: 'How SCPHD uses real-time data analytics to improve program outcomes and measure peace sustainability.',
    longDescription: "This webinar explores SCPHD's innovative approach to data-driven peacebuilding, including our real-time monitoring systems, outcome measurement frameworks, and how data insights have shaped program design across 14 post-conflict zones.",
    seats: 245,
    totalSeats: 500,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-blue-50 text-blue-700',
    type: 'Virtual',
  },
  {
    id: 5,
    date: { day: '15', month: 'May', year: '2025', full: 'May 15, 2025' },
    category: 'Training',
    categoryColor: 'bg-purple-50 text-purple-700',
    title: 'Emergency Response Certification Program',
    location: 'Nairobi Regional Office',
    description: 'A 5-day intensive certification program for humanitarian workers in emergency response protocols.',
    longDescription: 'This certification program provides hands-on training in emergency response protocols, including needs assessment, logistics coordination, camp management, and first aid. Participants receive SCPHD Emergency Response Certification upon completion.',
    seats: 24,
    totalSeats: 30,
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-purple-50 text-purple-700',
    type: 'In-Person',
  },
  {
    id: 6,
    date: { day: '20', month: 'Jun', year: '2025', full: 'June 20, 2025' },
    category: 'Conference',
    categoryColor: 'bg-navy-800 text-navy-200',
    title: 'Global Youth Peace Summit',
    location: 'Geneva, Switzerland',
    description: '200 young peacebuilders from 40 countries convene to share strategies and build cross-cultural coalitions.',
    longDescription: 'The Global Youth Peace Summit brings together 200 young peacebuilders aged 18-30 from 40 countries. The summit features workshops, cultural exchanges, collaborative project development, and mentorship from seasoned peace practitioners.',
    seats: 86,
    totalSeats: 200,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&auto=format',
    tagColor: 'bg-navy-700 text-navy-200',
    type: 'In-Person',
  },
]

const eventTypes = ['All', 'In-Person', 'Virtual', 'Hybrid']
const eventCategories = ['All', 'Conference', 'Workshop', 'Fundraiser', 'Webinar', 'Training']

export default function EventsPage() {
  const [activeType, setActiveType] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<typeof allEvents[0] | null>(null)
  const [registered, setRegistered] = useState<Set<number>>(new Set())
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const filteredEvents = allEvents.filter(e =>
    (activeType === 'All' || e.type === activeType) &&
    (activeCategory === 'All' || e.category === activeCategory)
  )

  const handleRegister = (eventId: number) => {
    setRegistered(prev => {
      const next = new Set(prev)
      if (next.has(eventId)) next.delete(eventId)
      else next.add(eventId)
      return next
    })
    setSelectedEvent(null)
  }

  return (
    <>
      <Helmet>
        <title>Events — SCPHD | Conferences, Workshops & Fundraisers</title>
        <meta name="description" content="Join SCPHD events — peace forums, workshops, webinars, and fundraising galas. Connect with peacebuilders and humanitarian leaders worldwide." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=900&fit=crop&auto=format" alt="Events" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            Events
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Join Us in Building<br />
            <em className="not-italic gradient-text">a Better World</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
            Forums, workshops, galas, and training programs — connect with peacebuilders and humanitarian leaders.
          </motion.p>
        </div>
      </section>

      {/* Filters & Events */}
      <section ref={headerRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Type filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} className="flex flex-wrap gap-2 mb-4">
            {eventTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setActiveType(type)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-300 border',
                  activeType === type
                    ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 border-navy-900 dark:border-gold-500'
                    : 'bg-white dark:bg-navy-900 text-navy-700 dark:text-white/50 border-navy-200 dark:border-navy-700 hover:border-navy-400'
                )}
              >
                {type}
              </motion.button>
            ))}
          </motion.div>

          {/* Category filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 mb-10">
            {eventCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-300 border',
                  activeCategory === cat
                    ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 border-navy-900 dark:border-gold-500'
                    : 'bg-white dark:bg-navy-900 text-navy-700 dark:text-white/50 border-navy-200 dark:border-navy-700 hover:border-navy-400'
                )}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-slate-500 dark:text-white/40 text-sm mb-8">
            Showing <strong className="text-navy-900 dark:text-white">{filteredEvents.length}</strong> event{filteredEvents.length !== 1 ? 's' : ''}
          </motion.p>

          {/* Events list */}
          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, i) => {
                const eventRef = useRef<HTMLDivElement>(null)
                const eventInView = useInView(eventRef, { once: true, margin: '-50px' })
                const spotsLeft = event.seats
                const isLow = spotsLeft < 20
                const isRegistered = registered.has(event.id)
                const fillPct = Math.round(((event.totalSeats - spotsLeft) / event.totalSeats) * 100)

                return (
                  <motion.div
                    key={event.id}
                    ref={eventRef}
                    initial={{ opacity: 0, x: -40 }}
                    animate={eventInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="group grid grid-cols-1 sm:grid-cols-[90px_1fr] md:grid-cols-[100px_200px_1fr] bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm overflow-hidden hover:border-navy-300 dark:hover:border-navy-600 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Date block */}
                    <div className="bg-navy-900 flex sm:flex-col items-center justify-center px-6 py-4 sm:p-5 gap-4 sm:gap-0 sm:text-center">
                      <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                        <div className="text-gold-400 font-[family-name:var(--font-display)] text-3xl font-bold leading-none">{event.date.day}</div>
                        <div className="text-white/50 text-xs tracking-widest uppercase mt-1">{event.date.month} {event.date.year}</div>
                      </motion.div>
                    </div>

                    {/* Image */}
                    <div className="relative hidden md:block h-auto overflow-hidden bg-navy-100">
                      <motion.img src={event.image} alt={event.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} />
                      <div className="absolute inset-0 bg-navy-900/30 group-hover:bg-navy-900/10 transition-colors duration-300" />
                      <div className="absolute top-3 left-3">
                        <Badge variant={event.type === 'Virtual' ? 'info' : event.type === 'Hybrid' ? 'warning' : 'default'} size="sm">{event.type}</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-5 flex flex-col justify-center bg-white dark:bg-navy-900 group-hover:bg-cream-50 dark:group-hover:bg-navy-800 transition-colors duration-300">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm', event.tagColor)}>{event.category}</span>
                        <span className="text-slate-400 dark:text-white/30 text-xs flex items-center gap-1.5">📍 {event.location}</span>
                      </div>
                      <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-lg font-bold mb-1.5 group-hover:text-navy-700 dark:group-hover:text-gold-400 transition-colors leading-snug">{event.title}</h3>
                      <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed mb-3 line-clamp-2">{event.description}</p>

                      {/* Progress bar for seats */}
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-slate-400 dark:text-white/30">{event.totalSeats - spotsLeft} registered</span>
                          <span className="text-slate-400 dark:text-white/30">{spotsLeft} spots left</span>
                        </div>
                        <div className="h-1 bg-slate-100 dark:bg-navy-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-500 rounded-full" style={{ width: `${fillPct}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            animate={{ opacity: isLow ? [1, 0.4, 1] : 1 }}
                            transition={{ duration: 1.2, repeat: isLow ? Infinity : 0 }}
                            className={cn('w-1.5 h-1.5 rounded-full', isLow ? 'bg-red-500' : 'bg-emerald-500')}
                          />
                          <span className="text-xs text-slate-500 dark:text-white/40">
                            <strong className="text-navy-900 dark:text-white">{spotsLeft}</strong> seats remaining
                          </span>
                        </div>

                        <div className="flex gap-2 ml-auto">
                          <motion.button
                            onClick={() => setSelectedEvent(event)}
                            whileHover={{ x: 4 }}
                            className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-gold-700 transition-colors"
                          >
                            Details →
                          </motion.button>
                          <motion.button
                            onClick={() => handleRegister(event.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              'text-xs font-bold px-3 py-1.5 rounded-sm transition-all',
                              isRegistered
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gold-500 text-navy-900 hover:bg-gold-400'
                            )}
                          >
                            {isRegistered ? '✓ Registered' : 'Register'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-slate-400 dark:text-white/30 text-sm">No events found matching your filters.</p>
              <Button variant="ghost" size="sm" onClick={() => { setActiveType('All'); setActiveCategory('All') }} className="mt-4">Clear Filters</Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title={selectedEvent?.title} size="lg">
        {selectedEvent && (
          <div>
            <div className="relative h-52 -m-5 mb-5 overflow-hidden">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              <div className="absolute bottom-4 left-5 flex gap-2">
                <span className={cn('text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm', selectedEvent.tagColor)}>{selectedEvent.category}</span>
                <Badge variant={selectedEvent.type === 'Virtual' ? 'info' : selectedEvent.type === 'Hybrid' ? 'warning' : 'default'} size="sm">{selectedEvent.type}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Date</div>
                <div className="text-navy-900 dark:text-white font-semibold text-sm">{selectedEvent.date.full}</div>
              </div>
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Location</div>
                <div className="text-navy-900 dark:text-white font-semibold text-sm">{selectedEvent.location}</div>
              </div>
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Seats Available</div>
                <div className="text-navy-900 dark:text-white font-semibold text-sm">{selectedEvent.seats} of {selectedEvent.totalSeats}</div>
              </div>
              <div className="bg-cream-50 dark:bg-navy-800 rounded-sm p-4">
                <div className="text-slate-400 dark:text-white/30 text-xs mb-1">Fill Rate</div>
                <div className="text-navy-900 dark:text-white font-semibold text-sm">{Math.round(((selectedEvent.totalSeats - selectedEvent.seats) / selectedEvent.totalSeats) * 100)}%</div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-white/55 text-sm leading-relaxed mb-6">{selectedEvent.longDescription}</p>

            {/* Seat availability bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400 dark:text-white/30">Registration Progress</span>
                <span className="text-navy-900 dark:text-white font-bold">{selectedEvent.seats} spots remaining</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.round(((selectedEvent.totalSeats - selectedEvent.seats) / selectedEvent.totalSeats) * 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" size="md" className="flex-1 btn-primary" onClick={() => handleRegister(selectedEvent.id)}>
                {registered.has(selectedEvent.id) ? '✓ Registered — Cancel' : 'Register Now'}
              </Button>
              <Button variant="outline" size="md" onClick={() => setSelectedEvent(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
