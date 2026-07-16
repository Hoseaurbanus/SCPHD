import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { toast } from 'react-toastify'

interface RecurringGift {
  id: number
  amount: number
  campaign: string
  frequency: string
  nextDate: string
  startDate: string
  status: string
  paymentMethod: string
}

const recurringGifts: RecurringGift[] = [
  {
    id: 1,
    amount: 250,
    campaign: 'Education for Refugees',
    frequency: 'Monthly',
    nextDate: '2026-08-01',
    startDate: '2026-01-01',
    status: 'active',
    paymentMethod: 'Visa ending in 4242',
  },
  {
    id: 2,
    amount: 100,
    campaign: 'Clean Water Initiative',
    frequency: 'Monthly',
    nextDate: '2026-08-15',
    startDate: '2026-03-15',
    status: 'active',
    paymentMethod: 'PayPal',
  },
]

const frequencyOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
]

export default function DonorRecurring() {
  const { ref, isInView } = useScrollReveal()
  const [cancelModal, setCancelModal] = useState<RecurringGift | null>(null)
  const [gifts, setGifts] = useState(recurringGifts)

  const handleCancel = (gift: RecurringGift) => {
    setGifts((prev) => prev.filter((g) => g.id !== gift.id))
    setCancelModal(null)
    toast.success('Recurring gift cancelled successfully.')
  }

  return (
    <>
      <Helmet>
        <title>Recurring Gifts | SCPHD</title>
        <meta name="description" content="Manage your recurring donation subscriptions." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Recurring Gifts
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Manage your automatic donation subscriptions</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4"
        >
          {gifts.map((gift) => (
            <motion.div key={gift.id} variants={fadeUp}>
              <Card hover>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-gold-500/10 flex items-center justify-center text-gold-400 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-navy-900 dark:text-white">{formatCurrency(gift.amount)}</span>
                        <Badge variant="success" size="sm">{gift.frequency}</Badge>
                      </div>
                      <p className="text-sm text-navy-500 dark:text-white/50">{gift.campaign}</p>
                      <p className="text-xs text-navy-400 dark:text-white/40 mt-1">{gift.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-navy-400 dark:text-white/40">Next gift</div>
                      <div className="text-sm font-medium text-navy-900 dark:text-white">{formatDate(gift.nextDate)}</div>
                      <div className="text-[10px] text-navy-300 dark:text-white/30">Since {formatDate(gift.startDate)}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-navy-200 dark:border-navy-600">
                        Update
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => setCancelModal(gift)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {gifts.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-navy-400 dark:text-white/40 mb-4">No active recurring gifts.</p>
              <Button>Set Up a Recurring Gift</Button>
            </Card>
          )}
        </motion.div>
      </div>

      <Modal
        isOpen={!!cancelModal}
        onClose={() => setCancelModal(null)}
        title="Cancel Recurring Gift"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-navy-600 dark:text-white/60">
            Are you sure you want to cancel your <strong>{formatCurrency(cancelModal?.amount || 0)}</strong> {cancelModal?.frequency?.toLowerCase()} gift to{' '}
            <strong>{cancelModal?.campaign}</strong>?
          </p>
          <p className="text-xs text-navy-400 dark:text-white/40">
            This will stop all future automatic donations. You can set up a new recurring gift at any time.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setCancelModal(null)}>
              Keep Gift
            </Button>
            <Button variant="danger" onClick={() => cancelModal && handleCancel(cancelModal)}>
              Cancel Gift
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
