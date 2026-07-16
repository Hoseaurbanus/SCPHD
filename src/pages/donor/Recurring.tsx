import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'
import { formatCurrency } from '@/utils/helpers'
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

export default function DonorRecurring() {
  const { ref, isInView } = useScrollReveal()
  const [cancelModal, setCancelModal] = useState<RecurringGift | null>(null)
  const [gifts, setGifts] = useState<RecurringGift[]>([])

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

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <EmptyState
              title="No recurring gifts set up yet"
              description="Set up a recurring gift to automatically support your favorite programs."
              action={<Button>Set Up a Recurring Gift</Button>}
            />
          </Card>
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
