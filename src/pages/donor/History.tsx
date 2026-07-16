import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency, formatDate } from '@/utils/helpers'

const summaryCards = [
  { label: 'Total Given', value: '$4,850', icon: '💰' },
  { label: 'This Year', value: '$1,200', icon: '📅' },
  { label: 'Avg. Gift', value: '$202', icon: '📊' },
  { label: 'Last Gift', value: '$250', icon: '🎁' },
]

const transactions = [
  { id: 1, date: '2026-07-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0701' },
  { id: 2, date: '2026-06-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0601' },
  { id: 3, date: '2026-05-15', amount: 500, campaign: 'Emergency Relief Fund', method: 'Bank Transfer', status: 'completed', receiptId: 'RCP-2026-0515' },
  { id: 4, date: '2026-05-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0501' },
  { id: 5, date: '2026-04-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0401' },
  { id: 6, date: '2026-03-10', amount: 200, campaign: 'Clean Water Initiative', method: 'PayPal', status: 'completed', receiptId: 'RCP-2026-0310' },
  { id: 7, date: '2026-03-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0301' },
  { id: 8, date: '2026-02-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0201' },
  { id: 9, date: '2026-01-15', amount: 1000, campaign: 'Where Most Needed', method: 'Bank Transfer', status: 'completed', receiptId: 'RCP-2026-0115' },
  { id: 10, date: '2026-01-01', amount: 250, campaign: 'Education for Refugees', method: 'Credit Card', status: 'completed', receiptId: 'RCP-2026-0101' },
]

export default function DonorHistory() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Donation History | SCPHD</title>
        <meta name="description" content="View your complete donation history and download receipts." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Donation History
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">View all your past contributions</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {summaryCards.map((card) => (
            <motion.div key={card.label} variants={fadeUp}>
              <Card hover className="text-center">
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{card.value}</div>
                <div className="text-sm text-navy-500 dark:text-white/50">{card.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Campaign</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Method</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-navy-900 dark:text-white">{formatDate(tx.date)}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-navy-900 dark:text-white">{formatCurrency(tx.amount)}</td>
                      <td className="py-3 px-4 text-sm text-navy-500 dark:text-white/50">{tx.campaign}</td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{tx.method}</td>
                      <td className="py-3 px-4">
                        <Badge variant="success" size="sm">Completed</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button size="sm" variant="ghost" className="text-gold-500 hover:text-gold-400">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF
                        </Button>
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
