import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'
import { formatCurrency } from '@/utils/helpers'

const campaignBreakdown = [
  { name: 'Education for Refugees', value: 0, color: '#3b82f6' },
  { name: 'Clean Water Initiative', value: 0, color: '#06b6d4' },
  { name: 'Emergency Relief Fund', value: 0, color: '#ef4444' },
  { name: 'Where Most Needed', value: 0, color: '#C49A2E' },
]

export default function DonorImpact() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>My Impact | SCPHD</title>
        <meta name="description" content="See the impact of your donations through field stories and giving breakdown." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Card variant="dark" className="bg-gradient-to-r from-navy-800 via-navy-900 to-navy-950 border-navy-700/50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                🌍
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                  Your Impact Story
                </h2>
                <p className="text-white/60 mt-1">
                  Your donations are making a difference. Impact data will appear here as you give.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
                Giving Breakdown by Campaign
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={campaignBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {campaignBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B1D3A',
                        border: '1px solid #1a3050',
                        borderRadius: '4px',
                        color: '#fff',
                      }}
                      formatter={((value: number) => formatCurrency(value)) as any}
                    />
                    <Legend
                      formatter={(value: string) => <span className="text-navy-600 dark:text-white/60 text-xs">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {campaignBreakdown.map((campaign) => (
                  <div key={campaign.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: campaign.color }} />
                      <span className="text-sm text-navy-600 dark:text-white/60">{campaign.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-900 dark:text-white">{formatCurrency(campaign.value)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
                Field Stories
              </h3>
              <Card>
                <EmptyState title="Impact data not yet available" description="Field stories and impact reports will appear here as your donations create change." />
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
