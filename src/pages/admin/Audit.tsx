import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const auditEntries: never[] = []

const moduleOptions = [
  { value: 'all', label: 'All Modules' },
]

const typeOptions = [
  { value: 'all', label: 'All Types' },
]

export default function AdminAudit() {
  const { ref, isInView } = useScrollReveal()
  const [moduleFilter, setModuleFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = auditEntries

  return (
    <>
      <Helmet>
        <title>Audit Log | SCPHD Admin</title>
        <meta name="description" content="View system audit log entries with color-coded actions." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Audit Log
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">System activity and security audit trail</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-3"
        >
          {[
            { label: 'Total', value: 0, color: 'text-navy-900 dark:text-white' },
            { label: 'Info', value: 0, color: 'text-blue-500' },
            { label: 'Success', value: 0, color: 'text-emerald-500' },
            { label: 'Warning', value: 0, color: 'text-amber-500' },
            { label: 'Danger', value: 0, color: 'text-red-500' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <Card hover className="text-center py-3">
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] text-navy-400 dark:text-white/40 uppercase tracking-wider">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sm:w-48"
                />
                <Select
                  options={moduleOptions}
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                />
                <Select
                  options={typeOptions}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                />
              </div>
              <div className="text-sm text-navy-400 dark:text-white/40">
                0 entries
              </div>
            </div>

            <EmptyState title="No audit logs recorded yet" description="System activity will be logged here as it occurs." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
