import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'

export default function AdminReports() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Reports | SCPHD Admin</title>
        <meta name="description" content="Access reports and audit logs for the SCPHD platform." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Reports & Audit
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Download reports and view system audit logs</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
              Downloadable Reports
            </h3>
            <EmptyState title="No reports available yet" description="Reports will be generated and appear here." />
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
              Audit Log
            </h3>
            <EmptyState title="No audit logs recorded yet" description="System activity will be logged here." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
