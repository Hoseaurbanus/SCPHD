import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatDate } from '@/utils/helpers'

const auditEntries = [
  { id: 1, action: 'user.login', user: 'Admin User', detail: 'Successful login from IP 192.168.1.1', timestamp: '2026-07-15T14:32:00', type: 'info', module: 'Auth' },
  { id: 2, action: 'donation.created', user: 'James Wilson', detail: 'New donation: $500 to Education for Refugees campaign', timestamp: '2026-07-15T13:45:00', type: 'success', module: 'Donations' },
  { id: 3, action: 'volunteer.approved', user: 'Admin User', detail: 'Approved volunteer application for David Kim', timestamp: '2026-07-15T12:20:00', type: 'success', module: 'Volunteers' },
  { id: 4, action: 'program.updated', user: 'Michael Chang', detail: 'Updated budget allocation for Clean Water Initiative from $80k to $85k', timestamp: '2026-07-15T11:10:00', type: 'info', module: 'Programs' },
  { id: 5, action: 'user.role_changed', user: 'Admin User', detail: 'Changed Emily Watson role from Editor to Volunteer Manager', timestamp: '2026-07-15T10:05:00', type: 'warning', module: 'Users' },
  { id: 6, action: 'settings.updated', user: 'Admin User', detail: 'Updated site contact phone number and address', timestamp: '2026-07-14T16:30:00', type: 'info', module: 'Settings' },
  { id: 7, action: 'donation.failed', user: 'System', detail: 'Payment processing failed for transaction txn_abc123 - card declined', timestamp: '2026-07-14T15:22:00', type: 'danger', module: 'Donations' },
  { id: 8, action: 'user.registered', user: 'Lisa Anderson', detail: 'New user registered with role: Member', timestamp: '2026-07-14T14:15:00', type: 'info', module: 'Auth' },
  { id: 9, action: 'report.generated', user: 'Carlos Mendez', detail: 'Generated Q2 2026 financial summary report', timestamp: '2026-07-14T11:00:00', type: 'info', module: 'Reports' },
  { id: 10, action: 'volunteer.hours_logged', user: 'Sarah Mitchell', detail: 'Logged 4 hours for Community Health Outreach mission', timestamp: '2026-07-14T09:30:00', type: 'success', module: 'Volunteers' },
  { id: 11, action: 'user.password_reset', user: 'Emily Davis', detail: 'Password reset requested via email', timestamp: '2026-07-13T18:45:00', type: 'warning', module: 'Auth' },
  { id: 12, action: 'program.created', user: 'Michael Chang', detail: 'Created new program: Youth Empowerment Program', timestamp: '2026-07-13T14:20:00', type: 'info', module: 'Programs' },
  { id: 13, action: 'donation.refunded', user: 'Admin User', detail: 'Refunded $250 donation from Robert Taylor - duplicate charge', timestamp: '2026-07-13T11:15:00', type: 'danger', module: 'Donations' },
  { id: 14, action: 'user.deactivated', user: 'Admin User', detail: 'Deactivated user account for olduser@example.com', timestamp: '2026-07-12T16:00:00', type: 'warning', module: 'Users' },
  { id: 15, action: 'volunteer.mission_joined', user: 'Amanda Foster', detail: 'Joined Emergency Relief Distribution mission', timestamp: '2026-07-12T10:30:00', type: 'success', module: 'Volunteers' },
]

const typeColors: Record<string, string> = {
  info: 'bg-blue-500/10 text-blue-400',
  success: 'bg-emerald-500/10 text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-400',
  danger: 'bg-red-500/10 text-red-400',
}

const typeDotColors: Record<string, string> = {
  info: 'bg-blue-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger: 'bg-red-400',
}

const moduleOptions = [
  { value: 'all', label: 'All Modules' },
  { value: 'auth', label: 'Auth' },
  { value: 'donations', label: 'Donations' },
  { value: 'volunteers', label: 'Volunteers' },
  { value: 'programs', label: 'Programs' },
  { value: 'users', label: 'Users' },
  { value: 'settings', label: 'Settings' },
  { value: 'reports', label: 'Reports' },
]

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'info', label: 'Info' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' },
]

export default function AdminAudit() {
  const { ref, isInView } = useScrollReveal()
  const [moduleFilter, setModuleFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = auditEntries.filter((entry) => {
    if (moduleFilter !== 'all' && entry.module.toLowerCase() !== moduleFilter) return false
    if (typeFilter !== 'all' && entry.type !== typeFilter) return false
    if (searchQuery && !entry.action.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.user.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.detail.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: auditEntries.length,
    info: auditEntries.filter((e) => e.type === 'info').length,
    success: auditEntries.filter((e) => e.type === 'success').length,
    warning: auditEntries.filter((e) => e.type === 'warning').length,
    danger: auditEntries.filter((e) => e.type === 'danger').length,
  }

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
            { label: 'Total', value: stats.total, color: 'text-navy-900 dark:text-white' },
            { label: 'Info', value: stats.info, color: 'text-blue-500' },
            { label: 'Success', value: stats.success, color: 'text-emerald-500' },
            { label: 'Warning', value: stats.warning, color: 'text-amber-500' },
            { label: 'Danger', value: stats.danger, color: 'text-red-500' },
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
                {filtered.length} entries
              </div>
            </div>

            <div className="space-y-0">
              {filtered.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 py-4 border-b border-navy-50 dark:border-navy-800/50 last:border-0 hover:bg-navy-50 dark:hover:bg-navy-800/20 transition-colors px-2 -mx-2 rounded-sm"
                >
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${typeDotColors[entry.type]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider ${typeColors[entry.type]}`}>
                        {entry.type}
                      </span>
                      <span className="text-xs font-mono text-navy-600 dark:text-white/70">{entry.action}</span>
                      <Badge variant="outline" size="sm" className="text-[9px]">{entry.module}</Badge>
                    </div>
                    <p className="text-sm text-navy-700 dark:text-white/60">{entry.detail}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-navy-400 dark:text-white/40">by {entry.user}</span>
                      <span className="text-[10px] text-navy-300 dark:text-white/30">
                        {formatDate(entry.timestamp, 'MMM D, YYYY [at] HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-8 text-navy-400 dark:text-white/40 text-sm">
                  No audit entries match your filters.
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
