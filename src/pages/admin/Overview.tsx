import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart, Pie, Cell, Legend } from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency, formatDate } from '@/utils/helpers'

const stats = [
  { label: 'Total Donations', value: '$284,500', change: '+12.3% vs last month', icon: '💰', trend: 'up' },
  { label: 'Active Volunteers', value: '156', change: '+8 this month', icon: '👥', trend: 'up' },
  { label: 'Active Programs', value: '12', change: '3 launching soon', icon: '🎯', trend: 'neutral' },
  { label: 'Beneficiaries', value: '4,820', change: '+340 this quarter', icon: '🤝', trend: 'up' },
]

const revenueData = [
  { month: 'Jan', revenue: 18500 },
  { month: 'Feb', revenue: 22000 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 28500 },
  { month: 'May', revenue: 24000 },
  { month: 'Jun', revenue: 31000 },
  { month: 'Jul', revenue: 26500 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dec', revenue: 0 },
]

const campaignSplit = [
  { name: 'Emergency Relief', value: 95000, color: '#ef4444' },
  { name: 'Education', value: 82000, color: '#3b82f6' },
  { name: 'Clean Water', value: 62000, color: '#06b6d4' },
  { name: 'Where Needed', value: 45500, color: '#C49A2E' },
]

const recentDonations = [
  { id: 1, donor: 'James Wilson', amount: 500, campaign: 'Education', date: '2026-07-15', status: 'completed' },
  { id: 2, donor: 'Sarah Chen', amount: 250, campaign: 'Clean Water', date: '2026-07-15', status: 'completed' },
  { id: 3, donor: 'Michael Brown', amount: 1000, campaign: 'Emergency Relief', date: '2026-07-14', status: 'completed' },
  { id: 4, donor: 'Emily Davis', amount: 150, campaign: 'Where Most Needed', date: '2026-07-14', status: 'completed' },
  { id: 5, donor: 'Robert Taylor', amount: 750, campaign: 'Education', date: '2026-07-13', status: 'pending' },
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
                <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-navy-400 dark:text-white/40'}`}>
                  {stat.change}
                </div>
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
                      formatter={(value: number) => [formatCurrency(value), 'Revenue']}
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
                      formatter={(value: number) => formatCurrency(value)}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Donor</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Campaign</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((d) => (
                    <tr key={d.id} className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-navy-900 dark:text-white">{d.donor}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-navy-900 dark:text-white">{formatCurrency(d.amount)}</td>
                      <td className="py-3 px-4 text-sm text-navy-500 dark:text-white/50">{d.campaign}</td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{formatDate(d.date)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={d.status === 'completed' ? 'success' : 'warning'} size="sm">{d.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
