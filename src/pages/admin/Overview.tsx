import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart, Pie, Cell, Legend } from 'recharts'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency } from '@/utils/helpers'

const stats = [
  { label: 'Total Donations', value: '$0', icon: '💰' },
  { label: 'Active Volunteers', value: '0', icon: '👥' },
  { label: 'Active Programs', value: '0', icon: '🎯' },
  { label: 'Beneficiaries', value: '0', icon: '🤝' },
]

const revenueData = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
  { month: 'Jul', revenue: 0 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dec', revenue: 0 },
]

const campaignSplit = [
  { name: 'Emergency Relief', value: 0, color: '#ef4444' },
  { name: 'Education', value: 0, color: '#3b82f6' },
  { name: 'Clean Water', value: 0, color: '#06b6d4' },
  { name: 'Where Needed', value: 0, color: '#C49A2E' },
]

export default function AdminOverview() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Admin Overview | SCPHD</title>
        <meta name="description" content="SCPHD admin dashboard - key metrics and analytics." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Dashboard Overview
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Key metrics and recent activity</p>
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
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-2">
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
                Revenue (12 Months)
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fill: '#7aa5cc', fontSize: 12 }} axisLine={{ stroke: '#1a3050' }} tickLine={false} />
                    <YAxis tick={{ fill: '#7aa5cc', fontSize: 12 }} axisLine={{ stroke: '#1a3050' }} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B1D3A', border: '1px solid #1a3050', borderRadius: '4px', color: '#fff' }}
                      formatter={((value: number) => [formatCurrency(value), 'Revenue']) as any}
                      cursor={{ fill: 'rgba(196, 154, 46, 0.05)' }}
                    />
                    <Bar dataKey="revenue" fill="#C49A2E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
                Campaign Split
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={campaignSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                      {campaignSplit.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B1D3A', border: '1px solid #1a3050', borderRadius: '4px', color: '#fff' }}
                      formatter={((value: number) => formatCurrency(value)) as any}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {campaignSplit.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-navy-600 dark:text-white/60">{c.name}</span>
                    </div>
                    <span className="font-medium text-navy-900 dark:text-white">{formatCurrency(c.value)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
                Recent Donations
              </h3>
              <Button size="sm" variant="ghost">View All</Button>
            </div>
            <EmptyState title="No donations yet" description="Donations will appear here once they are recorded." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
