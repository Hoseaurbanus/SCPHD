import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const hoursData = [
  { month: 'Jan', hours: 0 },
  { month: 'Feb', hours: 0 },
  { month: 'Mar', hours: 0 },
  { month: 'Apr', hours: 0 },
  { month: 'May', hours: 0 },
  { month: 'Jun', hours: 0 },
  { month: 'Jul', hours: 0 },
  { month: 'Aug', hours: 0 },
  { month: 'Sep', hours: 0 },
  { month: 'Oct', hours: 0 },
  { month: 'Nov', hours: 0 },
  { month: 'Dec', hours: 0 },
]

const impactMetrics = [
  { label: 'People Helped', value: '0', icon: '🤝' },
  { label: 'Events Attended', value: '0', icon: '📅' },
  { label: 'Communities Served', value: '0', icon: '🏘' },
  { label: 'Skills Acquired', value: '0', icon: '🎓' },
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
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
            Certificates
          </h3>
          <Card>
            <EmptyState title="No certificates earned yet" description="Keep volunteering to earn certificates for your achievements." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
