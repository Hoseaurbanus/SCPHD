import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

export default function AdminPrograms() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Programs | SCPHD Admin</title>
        <meta name="description" content="Manage SCPHD programs and track their progress." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
                Programs
              </h2>
              <p className="text-navy-500 dark:text-white/50 mt-1">Manage active and upcoming programs</p>
            </div>
            <Button>
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Program
            </Button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <EmptyState title="No programs created yet" description="Programs will appear here once they are created." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
