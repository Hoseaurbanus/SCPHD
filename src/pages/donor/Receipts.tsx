import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'

export default function DonorReceipts() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Tax Receipts | SCPHD</title>
        <meta name="description" content="Download your annual tax receipts for donation deductions." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Tax Receipts
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Download annual receipts for your tax deductions</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="bg-gold-500/5 border-gold-500/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-navy-900 dark:text-white text-sm">Tax Deduction Information</h4>
                <p className="text-xs text-navy-500 dark:text-white/50 mt-1">
                  SCPHD is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.
                  Save your receipts for tax filing purposes.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <EmptyState title="No tax receipts available yet" description="Tax receipts will be generated annually and appear here." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
