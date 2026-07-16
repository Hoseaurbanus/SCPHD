import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency } from '@/utils/helpers'

const receipts = [
  {
    id: 1,
    year: 2026,
    totalAmount: 1200,
    donations: 6,
    status: 'available',
    generatedDate: '2026-07-01',
  },
  {
    id: 2,
    year: 2025,
    totalAmount: 3650,
    donations: 14,
    status: 'available',
    generatedDate: '2026-01-15',
  },
]

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
                  EIN: 12-3456789. Save your receipts for tax filing purposes.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {receipts.map((receipt) => (
            <motion.div key={receipt.id} variants={fadeUp}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
                      {receipt.year}
                    </div>
                    <p className="text-sm text-navy-500 dark:text-white/50">Annual Tax Receipt</p>
                  </div>
                  <Badge variant="success" size="md">Available</Badge>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-navy-100 dark:border-navy-800">
                    <span className="text-sm text-navy-500 dark:text-white/50">Total Donations</span>
                    <span className="text-sm font-semibold text-navy-900 dark:text-white">{formatCurrency(receipt.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-navy-100 dark:border-navy-800">
                    <span className="text-sm text-navy-500 dark:text-white/50">Number of Donations</span>
                    <span className="text-sm font-semibold text-navy-900 dark:text-white">{receipt.donations}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-navy-500 dark:text-white/50">Generated</span>
                    <span className="text-sm text-navy-400 dark:text-white/40">{receipt.generatedDate}</span>
                  </div>
                </div>
                <Button className="w-full" size="md">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Receipt (PDF)
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
