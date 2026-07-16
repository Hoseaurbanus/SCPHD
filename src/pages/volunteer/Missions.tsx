import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatDate } from '@/utils/helpers'

const missions = [
  {
    id: 1,
    title: 'Community Health Outreach',
    date: '2026-07-20',
    location: 'Springfield Community Center',
    role: 'Team Lead',
    teamSize: 12,
    status: 'upcoming',
    priority: 'high',
    category: 'Healthcare',
    description: 'Lead a health screening event for underserved communities with focus on preventive care.',
    spotsAvailable: 4,
  },
  {
    id: 2,
    title: 'Education Workshop Series',
    date: '2026-07-25',
    location: 'Lincoln Elementary School',
    role: 'Facilitator',
    teamSize: 6,
    status: 'upcoming',
    priority: 'medium',
    category: 'Education',
    description: 'Facilitate STEM education workshops for middle school students from refugee families.',
    spotsAvailable: 2,
  },
  {
    id: 3,
    title: 'Emergency Relief Distribution',
    date: '2026-08-02',
    location: 'Downtown Relief Hub',
    role: 'Logistics Support',
    teamSize: 20,
    status: 'upcoming',
    priority: 'urgent',
    category: 'Emergency Relief',
    description: 'Assist with sorting and distributing emergency supplies to flood-affected families.',
    spotsAvailable: 8,
  },
  {
    id: 4,
    title: 'Clean Water Initiative',
    date: '2026-08-10',
    location: 'Riverside Park',
    role: 'Field Worker',
    teamSize: 10,
    status: 'upcoming',
    priority: 'medium',
    category: 'Environment',
    description: 'Help install water filtration systems and educate communities on water conservation.',
    spotsAvailable: 6,
  },
  {
    id: 5,
    title: 'Youth Mentorship Program',
    date: '2026-07-15',
    location: 'SCPHD Youth Center',
    role: 'Mentor',
    teamSize: 8,
    status: 'completed',
    priority: 'low',
    category: 'Education',
    description: 'Mentored at-risk youth through career guidance and life skills workshops.',
    spotsAvailable: 0,
  },
  {
    id: 6,
    title: 'Food Bank Volunteering',
    date: '2026-07-10',
    location: 'Springfield Food Bank',
    role: 'Volunteer',
    teamSize: 15,
    status: 'completed',
    priority: 'low',
    category: 'Livelihoods',
    description: 'Sorted and packaged food donations for distribution to low-income families.',
    spotsAvailable: 0,
  },
]

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'emergency-relief', label: 'Emergency Relief' },
  { value: 'environment', label: 'Environment' },
  { value: 'livelihoods', label: 'Livelihoods' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
]

const priorityVariant: Record<string, 'danger' | 'warning' | 'info' | 'default'> = {
  urgent: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'default',
}

export default function VolunteerMissions() {
  const { ref, isInView } = useScrollReveal()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = missions.filter((m) => {
    if (categoryFilter !== 'all' && m.category.toLowerCase().replace(/\s+/g, '-') !== categoryFilter) return false
    if (statusFilter !== 'all' && m.status !== statusFilter) return false
    return true
  })

  return (
    <>
      <Helmet>
        <title>My Missions | SCPHD</title>
        <meta name="description" content="View and manage your volunteer missions." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            My Missions
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Browse and join volunteer missions</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="w-full sm:w-48">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Category"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Status"
            />
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4"
        >
          {filtered.map((mission) => (
            <motion.div key={mission.id} variants={fadeUp}>
              <Card hover>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-navy-900 dark:text-white">{mission.title}</h3>
                      <Badge variant={priorityVariant[mission.priority] || 'default'} size="sm">
                        {mission.priority}
                      </Badge>
                      <Badge variant={mission.status === 'completed' ? 'success' : 'info'} size="sm">
                        {mission.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-navy-500 dark:text-white/50 mb-3">{mission.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-navy-400 dark:text-white/40">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(mission.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {mission.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {mission.role}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Team of {mission.teamSize}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    {mission.status === 'upcoming' ? (
                      <>
                        <Badge variant={mission.spotsAvailable <= 3 ? 'warning' : 'success'} size="sm">
                          {mission.spotsAvailable} spots left
                        </Badge>
                        <Button size="sm">Join Mission</Button>
                      </>
                    ) : (
                      <Badge variant="default" size="md">Completed</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-navy-400 dark:text-white/40">No missions match your filters.</p>
            </Card>
          )}
        </motion.div>
      </div>
    </>
  )
}
