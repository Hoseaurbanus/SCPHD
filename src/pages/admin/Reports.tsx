import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatDate } from '@/utils/helpers'

const downloadableReports = [
  {
    id: 1,
    title: 'Annual Financial Report 2025',
    description: 'Complete financial overview including revenue, expenses, and fund allocation.',
    format: 'PDF',
    size: '4.2 MB',
    date: '2026-02-15',
    icon: '📊',
  },
  {
    id: 2,
    title: 'Volunteer Activity Report',
    description: 'Monthly volunteer hours, mission participation, and impact metrics.',
    format: 'PDF',
    size: '2.8 MB',
    date: '2026-07-01',
    icon: '👥',
  },
  {
    id: 3,
    title: 'Program Impact Assessment',
    description: 'Detailed analysis of program outcomes, beneficiary feedback, and KPIs.',
    format: 'PDF',
    size: '6.1 MB',
    date: '2026-06-15',
    icon: '🎯',
  },
  {
    id: 4,
    title: 'Donor Summary Report',
    description: 'Donor demographics, giving patterns, and retention analysis.',
    format: 'PDF',
    size: '3.5 MB',
    date: '2026-06-01',
    icon: '💰',
  },
]

const auditLog = [
  { id: 1, action: 'user.login', user: 'Admin User', detail: 'Successful login from 192.168.1.1', timestamp: '2026-07-15T14:32:00', type: 'info' },
  { id: 2, action: 'donation.created', user: 'James Wilson', detail: 'New donation: $500 to Education', timestamp: '2026-07-15T13:45:00', type: 'success' },
  { id: 3, action: 'volunteer.approved', user: 'Admin User', detail: 'Approved volunteer: David Kim', timestamp: '2026-07-15T12:20:00', type: 'success' },
  { id: 4, action: 'program.updated', user: 'Michael Chang', detail: 'Updated budget for Clean Water Initiative', timestamp: '2026-07-15T11:10:00', type: 'info' },
  { id: 5, action: 'user.role_changed', user: 'Admin User', detail: 'Changed role for Emily Watson to Volunteer Manager', timestamp: '2026-07-15T10:05:00', type: 'warning' },
  { id: 6, action: 'settings.updated', user: 'Admin User', detail: 'Updated site contact information', timestamp: '2026-07-14T16:30:00', type: 'info' },
  { id: 7, action: 'donation.failed', user: 'System', detail: 'Payment processing failed for txn_abc123', timestamp: '2026-07-14T15:22:00', type: 'danger' },
  { id: 8, action: 'user.registered', user: 'Lisa Anderson', detail: 'New user registration as Member', timestamp: '2026-07-14T14:15:00', type: 'info' },
  { id: 9, action: 'report.generated', user: 'Carlos Mendez', detail: 'Generated quarterly financial report', timestamp: '2026-07-14T11:00:00', type: 'info' },
  { id: 10, action: 'volunteer.hours_logged', user: 'Sarah Mitchell', detail: 'Logged 4 hours for Community Health Outreach', timestamp: '2026-07-14T09:30:00', type: 'success' },
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {downloadableReports.map((report) => (
            <motion.div key={report.id} variants={fadeUp}>
              <Card hover className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-2xl flex-shrink-0">
                    {report.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 dark:text-white text-sm">{report.title}</h3>
                    <p className="text-xs text-navy-500 dark:text-white/50 mt-1">{report.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="default" size="sm">{report.format}</Badge>
                      <span className="text-[10px] text-navy-300 dark:text-white/30">{report.size}</span>
                      <span className="text-[10px] text-navy-300 dark:text-white/30">{formatDate(report.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-navy-100 dark:border-navy-800">
                  <Button size="sm" className="w-full">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-6">
              Audit Log
            </h3>
            <div className="space-y-3">
              {auditLog.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 py-3 border-b border-navy-50 dark:border-navy-800/50 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${typeDotColors[entry.type]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${typeColors[entry.type]}`}>
                        {entry.action}
                      </span>
                      <span className="text-xs text-navy-400 dark:text-white/40">by {entry.user}</span>
                    </div>
                    <p className="text-sm text-navy-600 dark:text-white/60 mt-1">{entry.detail}</p>
                  </div>
                  <span className="text-[10px] text-navy-300 dark:text-white/30 whitespace-nowrap">
                    {formatDate(entry.timestamp, 'MMM D, HH:mm')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
