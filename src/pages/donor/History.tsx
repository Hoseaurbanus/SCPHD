import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const summaryCards = [
  { label: 'Total Given', value: '$0', icon: '💰' },
  { label: 'This Year', value: '$0', icon: '📅' },
  { label: 'Avg. Gift', value: '$0', icon: '📊' },
  { label: 'Last Gift', value: '$0', icon: '🎁' },
]

const transactions: never[] = []

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
            <EmptyState title="No donation history yet" description="Your donation history will appear here once you make a gift." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
