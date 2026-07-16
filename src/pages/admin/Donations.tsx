import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const summaryCards = [
  { label: 'Total Donations', value: '$0', icon: '💰' },
  { label: 'Avg. Donation', value: '$0', icon: '📊' },
  { label: 'Donors', value: '0', icon: '👥' },
  { label: 'Recurring', value: '$0', icon: '↻' },
]

const donations: never[] = []

const campaignOptions = [
  { value: 'all', label: 'All Campaigns' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
]

export default function AdminDonations() {
  const { ref, isInView } = useScrollReveal()
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = donations

  const handleExportCSV = () => {
    const headers = ['Donor', 'Email', 'Amount', 'Campaign', 'Date', 'Method', 'Status']
    const csv = [headers.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet>
        <title>Donations | SCPHD Admin</title>
        <meta name="description" content="Manage and track all donations to SCPHD." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Donations
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Track and manage all donations</p>
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
              <Card hover className="h-full">
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{card.value}</div>
                <div className="text-sm text-navy-500 dark:text-white/50">{card.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sm:w-48"
                />
                <Select
                  options={campaignOptions}
                  value={campaignFilter}
                  onChange={(e) => setCampaignFilter(e.target.value)}
                />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
              </div>
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </Button>
            </div>

            <EmptyState title="No donations recorded yet" description="Donations will appear here once supporters contribute." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
