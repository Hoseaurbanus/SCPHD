import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const stats = [
  { label: 'Total Volunteers', value: '0', icon: '👥' },
  { label: 'Active This Month', value: '0', icon: '✓' },
  { label: 'Total Hours', value: '0', icon: '⏱' },
  { label: 'Avg. Hours/Volunteer', value: '0', icon: '📊' },
]

const volunteers: never[] = []

const levelOptions = [
  { value: 'all', label: 'All Levels' },
]

export default function AdminVolunteers() {
  const { ref, isInView } = useScrollReveal()
  const [levelFilter, setLevelFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = volunteers

  return (
    <>
      <Helmet>
        <title>Volunteers | SCPHD Admin</title>
        <meta name="description" content="Manage your volunteer roster and track contributions." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Volunteers
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Manage and track your volunteer roster</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <Card hover className="h-full">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-navy-500 dark:text-white/50">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                  placeholder="Search volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sm:w-48"
                />
                <Select
                  options={levelOptions}
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                />
              </div>
            </div>

            <EmptyState title="No volunteers registered yet" description="Volunteers will appear here once they sign up." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
