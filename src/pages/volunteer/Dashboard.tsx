import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, fadeIn, staggerContainer, staggerFast } from '@/hooks/useScrollReveal'
import { formatDate } from '@/utils/helpers'

const stats = [
  { label: 'Hours Logged', value: '167', change: '+12 this week', icon: '⏱' },
  { label: 'Missions Completed', value: '14', change: '+2 this month', icon: '✓' },
  { label: 'Impact Score', value: '92', change: 'Top 5%', icon: '★' },
  { label: 'Team Members', value: '8', change: '3 active', icon: '👥' },
]

const upcomingMissions = [
  {
    id: 1,
    title: 'Community Health Outreach',
    date: '2026-07-20',
    location: 'Springfield Community Center',
    role: 'Team Lead',
    teamSize: 12,
    status: 'upcoming',
    priority: 'high',
    description: 'Lead a health screening event for underserved communities with focus on preventive care.',
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
    description: 'Facilitate STEM education workshops for middle school students from refugee families.',
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
    description: 'Assist with sorting and distributing emergency supplies to flood-affected families.',
  },
]

const activityFeed = [
  { action: 'Logged 4 hours', detail: 'Community Health Outreach', time: '2 hours ago', type: 'hours' },
  { action: 'Completed training', detail: 'First Aid Certification', time: '1 day ago', type: 'training' },
  { action: 'Received badge', detail: '100 Hours Club', time: '3 days ago', type: 'badge' },
  { action: 'Joined mission', detail: 'Education Workshop Series', time: '5 days ago', type: 'mission' },
  { action: 'Updated profile', detail: 'Added new skills', time: '1 week ago', type: 'profile' },
]

const activityColors: Record<string, string> = {
  hours: 'bg-blue-500/10 text-blue-400',
  training: 'bg-emerald-500/10 text-emerald-400',
  badge: 'bg-gold-500/10 text-gold-400',
  mission: 'bg-purple-500/10 text-purple-400',
  profile: 'bg-gray-500/10 text-gray-400',
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8"
          className="text-navy-800" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference} className="text-gold-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-[10px] text-white/40 uppercase tracking-wider">Hours Goal</span>
      </div>
    </div>
  )
}

export default function VolunteerDashboard() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Volunteer Dashboard | SCPHD</title>
        <meta name="description" content="Your volunteer dashboard - track hours, missions, and impact." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <Card variant="dark" className="bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border-navy-700/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <ProgressRing percentage={84.7} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                    Welcome back, Sarah!
                  </h2>
                  <p className="text-white/60 mt-1">
                    You&apos;ve logged <span className="text-gold-400 font-semibold">167 hours</span> of your{' '}
                    <span className="text-white font-medium">200-hour</span> annual goal. You&apos;re making a real difference.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                    <Button size="sm">Log Hours</Button>
                    <Button size="sm" variant="outline" className="border-navy-600 text-white/70 hover:bg-navy-700 hover:text-white">
                      Browse Missions
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-center gap-2 text-center">
                  <div className="text-3xl font-bold text-gold-400 number-glow">92</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Impact Score</div>
                  <Badge variant="success" size="md">Top 5%</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <Card hover className="h-full">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-navy-500 dark:text-white/50">{stat.label}</div>
                <div className="text-xs text-emerald-500 mt-1">{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-2 space-y-4"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Upcoming Missions
              </h3>
            </motion.div>
            {upcomingMissions.map((mission) => (
              <motion.div key={mission.id} variants={fadeUp}>
                <Card hover>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-semibold text-navy-900 dark:text-white">{mission.title}</h4>
                        <Badge variant={mission.priority === 'urgent' ? 'danger' : mission.priority === 'high' ? 'warning' : 'info'} size="sm">
                          {mission.priority}
                        </Badge>
                        <Badge variant="success" size="sm">{mission.status}</Badge>
                      </div>
                      <p className="text-sm text-navy-500 dark:text-white/50 mb-3">{mission.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-navy-400 dark:text-white/40">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(mission.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {mission.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {mission.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Team of {mission.teamSize}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="flex-shrink-0 border-navy-200 dark:border-navy-600">
                      Join
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-4"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Recent Activity
              </h3>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card>
                <div className="space-y-4">
                  {activityFeed.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${activityColors[item.type] || 'bg-navy-100 dark:bg-navy-800'}`}>
                        {item.type === 'hours' ? '⏱' : item.type === 'training' ? '📚' : item.type === 'badge' ? '🏅' : item.type === 'mission' ? '🎯' : '👤'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900 dark:text-white">{item.action}</p>
                        <p className="text-xs text-navy-400 dark:text-white/40 truncate">{item.detail}</p>
                      </div>
                      <span className="text-[10px] text-navy-300 dark:text-white/30 whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
