import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatDate, getInitials } from '@/utils/helpers'
import { VOLUNTEER_LEVELS } from '@/utils/constants'

const stats = [
  { label: 'Total Volunteers', value: '156', change: '+8 this month', icon: '👥' },
  { label: 'Active This Month', value: '89', change: '57% rate', icon: '✓' },
  { label: 'Total Hours', value: '12,480', change: '+1,200 this quarter', icon: '⏱' },
  { label: 'Avg. Hours/Volunteer', value: '80', change: '+5 vs last month', icon: '📊' },
]

const volunteers = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@example.com', hours: 167, level: 'Gold', joined: '2025-03-15', status: 'active', missions: 14 },
  { id: 2, name: 'James Rodriguez', email: 'james.r@example.com', hours: 523, level: 'Gold', joined: '2024-11-02', status: 'active', missions: 28 },
  { id: 3, name: 'Emily Watson', email: 'emily@example.com', hours: 1042, level: 'Platinum', joined: '2024-06-20', status: 'active', missions: 45 },
  { id: 4, name: 'Michael Chang', email: 'michael@example.com', hours: 78, level: 'Bronze', joined: '2026-01-10', status: 'active', missions: 5 },
  { id: 5, name: 'Amanda Foster', email: 'amanda@example.com', hours: 312, level: 'Silver', joined: '2025-08-05', status: 'active', missions: 18 },
  { id: 6, name: 'David Kim', email: 'david@example.com', hours: 45, level: 'Bronze', joined: '2026-04-01', status: 'pending', missions: 3 },
  { id: 7, name: 'Rachel Green', email: 'rachel@example.com', hours: 256, level: 'Silver', joined: '2025-06-12', status: 'active', missions: 15 },
  { id: 8, name: 'Carlos Mendez', email: 'carlos@example.com', hours: 890, level: 'Gold', joined: '2024-09-18', status: 'active', missions: 38 },
]

const levelColors: Record<string, string> = {
  Platinum: 'text-slate-300',
  Gold: 'text-gold-500',
  Silver: 'text-gray-400',
  Bronze: 'text-amber-600',
}

const levelBadge: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  Platinum: 'info',
  Gold: 'success',
  Silver: 'default',
  Bronze: 'warning',
}

const levelOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
  { value: 'bronze', label: 'Bronze' },
]

export default function AdminVolunteers() {
  const { ref, isInView } = useScrollReveal()
  const [levelFilter, setLevelFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = volunteers.filter((v) => {
    if (levelFilter !== 'all' && v.level.toLowerCase() !== levelFilter) return false
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.email.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

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
                <div className="text-xs text-emerald-500 mt-1">{stat.change}</div>
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

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Volunteer</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Level</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Hours</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Missions</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Joined</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr key={v.id} className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold flex-shrink-0">
                            {getInitials(v.name)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-navy-900 dark:text-white">{v.name}</div>
                            <div className="text-xs text-navy-400 dark:text-white/40">{v.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={levelBadge[v.level] || 'default'} size="sm">{v.level}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-navy-900 dark:text-white">{v.hours}</td>
                      <td className="py-3 px-4 text-sm text-navy-500 dark:text-white/50">{v.missions}</td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{formatDate(v.joined)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={v.status === 'active' ? 'success' : 'warning'} size="sm" dot>{v.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {v.status === 'pending' && (
                            <Button size="sm" variant="ghost" className="text-emerald-500 hover:text-emerald-400">
                              Approve
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-8 text-navy-400 dark:text-white/40 text-sm">
                  No volunteers match your filters.
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
