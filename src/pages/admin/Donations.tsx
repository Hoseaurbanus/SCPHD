import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency, formatDate } from '@/utils/helpers'

const summaryCards = [
  { label: 'Total Donations', value: '$284,500', change: '+12.3%', icon: '💰' },
  { label: 'Avg. Donation', value: '$285', change: '+5.2%', icon: '📊' },
  { label: 'Donors', value: '342', change: '+28 new', icon: '👥' },
  { label: 'Recurring', value: '$45,200', change: '32% of total', icon: '↻' },
]

const donations = [
  { id: 1, donor: 'James Wilson', email: 'james@example.com', amount: 500, campaign: 'Education', date: '2026-07-15', method: 'Credit Card', status: 'completed' },
  { id: 2, donor: 'Sarah Chen', email: 'sarah@example.com', amount: 250, campaign: 'Clean Water', date: '2026-07-15', method: 'PayPal', status: 'completed' },
  { id: 3, donor: 'Michael Brown', email: 'michael@example.com', amount: 1000, campaign: 'Emergency Relief', date: '2026-07-14', method: 'Bank Transfer', status: 'completed' },
  { id: 4, donor: 'Emily Davis', email: 'emily@example.com', amount: 150, campaign: 'Where Most Needed', date: '2026-07-14', method: 'Credit Card', status: 'completed' },
  { id: 5, donor: 'Robert Taylor', email: 'robert@example.com', amount: 750, campaign: 'Education', date: '2026-07-13', method: 'Credit Card', status: 'pending' },
  { id: 6, donor: 'Lisa Anderson', email: 'lisa@example.com', amount: 300, campaign: 'Clean Water', date: '2026-07-13', method: 'PayPal', status: 'completed' },
  { id: 7, donor: 'David Martinez', email: 'david@example.com', amount: 200, campaign: 'Emergency Relief', date: '2026-07-12', method: 'Credit Card', status: 'completed' },
  { id: 8, donor: 'Jennifer Lee', email: 'jennifer@example.com', amount: 450, campaign: 'Where Most Needed', date: '2026-07-12', method: 'Bank Transfer', status: 'completed' },
  { id: 9, donor: 'Thomas Garcia', email: 'thomas@example.com', amount: 1200, campaign: 'Education', date: '2026-07-11', method: 'Bank Transfer', status: 'completed' },
  { id: 10, donor: 'Amanda White', email: 'amanda@example.com', amount: 175, campaign: 'Clean Water', date: '2026-07-11', method: 'Credit Card', status: 'completed' },
]

const campaignOptions = [
  { value: 'all', label: 'All Campaigns' },
  { value: 'education', label: 'Education' },
  { value: 'clean-water', label: 'Clean Water' },
  { value: 'emergency-relief', label: 'Emergency Relief' },
  { value: 'where-most-needed', label: 'Where Most Needed' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
]

export default function AdminDonations() {
  const { ref, isInView } = useScrollReveal()
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = donations.filter((d) => {
    if (campaignFilter !== 'all' && d.campaign.toLowerCase().replace(/\s+/g, '-') !== campaignFilter) return false
    if (statusFilter !== 'all' && d.status !== statusFilter) return false
    if (searchQuery && !d.donor.toLowerCase().includes(searchQuery.toLowerCase()) && !d.email.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleExportCSV = () => {
    const headers = ['Donor', 'Email', 'Amount', 'Campaign', 'Date', 'Method', 'Status']
    const rows = filtered.map((d) => [d.donor, d.email, d.amount, d.campaign, d.date, d.method, d.status])
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
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
                <div className="text-xs text-emerald-500 mt-1">{card.change}</div>
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

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Donor</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Campaign</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Method</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium text-navy-900 dark:text-white">{d.donor}</div>
                        <div className="text-xs text-navy-400 dark:text-white/40">{d.email}</div>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-navy-900 dark:text-white">{formatCurrency(d.amount)}</td>
                      <td className="py-3 px-4 text-sm text-navy-500 dark:text-white/50">{d.campaign}</td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{formatDate(d.date)}</td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{d.method}</td>
                      <td className="py-3 px-4">
                        <Badge variant={d.status === 'completed' ? 'success' : 'warning'} size="sm">{d.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-8 text-navy-400 dark:text-white/40 text-sm">
                  No donations match your filters.
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
