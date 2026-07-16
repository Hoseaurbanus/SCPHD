import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const stats = [
  { label: 'Hours Logged', value: '0', icon: '⏱' },
  { label: 'Missions Completed', value: '0', icon: '✓' },
  { label: 'Impact Score', value: '0', icon: '★' },
  { label: 'Team Members', value: '0', icon: '👥' },
]

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
                  <ProgressRing percentage={0} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                    Welcome back!
                  </h2>
                  <p className="text-white/60 mt-1">
                    Start logging hours and joining missions to see your progress here.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                    <Button size="sm">Log Hours</Button>
                    <Button size="sm" variant="outline" className="border-navy-600 text-white/70 hover:bg-navy-700 hover:text-white">
                      Browse Missions
                    </Button>
                  </div>
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
            <motion.div variants={fadeUp}>
              <Card>
                <EmptyState title="No upcoming missions" description="Missions will appear here once they are assigned." />
              </Card>
            </motion.div>
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
                <EmptyState title="No recent activity" description="Your activity will appear here as you volunteer." />
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
