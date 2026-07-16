import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const hoursData = [
  { month: 'Jan', hours: 18 },
  { month: 'Feb', hours: 22 },
  { month: 'Mar', hours: 16 },
  { month: 'Apr', hours: 28 },
  { month: 'May', hours: 20 },
  { month: 'Jun', hours: 25 },
  { month: 'Jul', hours: 14 },
  { month: 'Aug', hours: 0 },
  { month: 'Sep', hours: 0 },
  { month: 'Oct', hours: 0 },
  { month: 'Nov', hours: 0 },
  { month: 'Dec', hours: 0 },
]

const impactMetrics = [
  { label: 'People Helped', value: '342', icon: '🤝' },
  { label: 'Events Attended', value: '14', icon: '📅' },
  { label: 'Communities Served', value: '7', icon: '🏘' },
  { label: 'Skills Acquired', value: '5', icon: '🎓' },
]

const certificates = [
  {
    id: 1,
    title: 'Gold Volunteer Certificate',
    description: 'Awarded for logging 500+ volunteer hours.',
    level: 'Gold',
    earned: true,
    date: '2026-06-15',
    hours: 167,
    target: 500,
  },
  {
    id: 2,
    title: 'Platinum Volunteer Certificate',
    description: 'Awarded for logging 1000+ volunteer hours.',
    level: 'Platinum',
    earned: false,
    date: null,
    hours: 167,
    target: 1000,
  },
]

export default function VolunteerImpact() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>My Impact | SCPHD</title>
        <meta name="description" content="View your volunteer impact metrics and achievements." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            My Impact
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Track your contributions and achievements</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {impactMetrics.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp}>
              <Card hover className="text-center">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{metric.value}</div>
                <div className="text-sm text-navy-500 dark:text-white/50">{metric.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
              Hours Breakdown
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hoursData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#7aa5cc', fontSize: 12 }}
                    axisLine={{ stroke: '#1a3050' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#7aa5cc', fontSize: 12 }}
                    axisLine={{ stroke: '#1a3050' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1D3A',
                      border: '1px solid #1a3050',
                      borderRadius: '4px',
                      color: '#fff',
                    }}
                    cursor={{ fill: 'rgba(196, 154, 46, 0.05)' }}
                  />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                    {hoursData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.hours > 0 ? '#C49A2E' : '#1a3050'}
                        opacity={entry.hours > 0 ? 0.8 + (index * 0.03) : 0.3}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
              Certificates
            </h3>
          </motion.div>
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={fadeUp}>
              <Card hover>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0 ${
                      cert.earned
                        ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900'
                        : 'bg-navy-100 dark:bg-navy-800 text-navy-400 dark:text-white/30'
                    }`}>
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white">{cert.title}</h4>
                      <p className="text-sm text-navy-500 dark:text-white/50">{cert.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 max-w-xs h-2 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold-500 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((cert.hours / cert.target) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-navy-400 dark:text-white/40">
                          {cert.hours}/{cert.target} hours
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {cert.earned ? (
                      <Badge variant="success" size="md">
                        <span className="mr-1">✓</span> Earned
                      </Badge>
                    ) : (
                      <Badge variant="default" size="md">
                        In Progress
                      </Badge>
                    )}
                    {cert.earned && (
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
