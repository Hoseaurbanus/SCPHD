import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Select from '@/components/ui/Select'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'

const missions: never[] = []

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
]

export default function VolunteerMissions() {
  const { ref, isInView } = useScrollReveal()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = missions

  return (
    <>
      <Helmet>
        <title>My Missions | SCPHD</title>
        <meta name="description" content="View and manage your volunteer missions." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            My Missions
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Browse and join volunteer missions</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="w-full sm:w-48">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Category"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Status"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <EmptyState title="No missions assigned yet" description="Missions will appear here once they are assigned to you." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
