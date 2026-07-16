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
import { ROLE_LABELS, USER_ROLES, type UserRole } from '@/utils/constants'

const users = [
  { id: 1, name: 'Admin User', email: 'admin@scphd.org', role: USER_ROLES.SUPER_ADMIN, joined: '2024-01-15', lastActive: '2026-07-15', status: 'active' },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah@example.com', role: USER_ROLES.VOLUNTEER, joined: '2025-03-15', lastActive: '2026-07-14', status: 'active' },
  { id: 3, name: 'James Wilson', email: 'james@example.com', role: USER_ROLES.DONOR, joined: '2025-06-01', lastActive: '2026-07-13', status: 'active' },
  { id: 4, name: 'Emily Watson', email: 'emily@example.com', role: USER_ROLES.VOLUNTEER_MANAGER, joined: '2024-08-20', lastActive: '2026-07-15', status: 'active' },
  { id: 5, name: 'Michael Chang', email: 'michael@example.com', role: USER_ROLES.PROGRAM_MANAGER, joined: '2025-01-10', lastActive: '2026-07-12', status: 'active' },
  { id: 6, name: 'Amanda Foster', email: 'amanda@example.com', role: USER_ROLES.VOLUNTEER, joined: '2026-01-05', lastActive: '2026-07-10', status: 'active' },
  { id: 7, name: 'David Kim', email: 'david@example.com', role: USER_ROLES.DONOR, joined: '2026-04-01', lastActive: '2026-07-08', status: 'inactive' },
  { id: 8, name: 'Rachel Green', email: 'rachel@example.com', role: USER_ROLES.EDITOR, joined: '2025-06-12', lastActive: '2026-07-15', status: 'active' },
  { id: 9, name: 'Carlos Mendez', email: 'carlos@example.com', role: USER_ROLES.FINANCE_OFFICER, joined: '2024-09-18', lastActive: '2026-07-14', status: 'active' },
  { id: 10, name: 'Lisa Anderson', email: 'lisa@example.com', role: USER_ROLES.MEMBER, joined: '2026-02-20', lastActive: '2026-07-05', status: 'active' },
]

const roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }))

const roleBadgeVariant: Record<string, 'danger' | 'success' | 'info' | 'warning' | 'default'> = {
  super_admin: 'danger',
  administrator: 'danger',
  program_manager: 'info',
  volunteer_manager: 'info',
  finance_officer: 'info',
  editor: 'default',
  donor: 'success',
  volunteer: 'success',
  member: 'default',
  viewer: 'default',
}

export default function AdminUsers() {
  const { ref, isInView } = useScrollReveal()
  const [searchQuery, setSearchQuery] = useState('')
  const [userRoles, setUserRoles] = useState<Record<number, string>>(
    Object.fromEntries(users.map((u) => [u.id, u.role]))
  )

  const filtered = users.filter((u) => {
    if (searchQuery && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.email.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleRoleChange = (userId: number, newRole: string) => {
    setUserRoles((prev) => ({ ...prev, [userId]: newRole }))
  }

  return (
    <>
      <Helmet>
        <title>Users | SCPHD Admin</title>
        <meta name="description" content="Manage user accounts and role assignments." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            User Management
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Manage accounts and role assignments</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sm:w-64"
              />
              <div className="text-sm text-navy-400 dark:text-white/40">
                {filtered.length} user{filtered.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">User</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Joined</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Last Active</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-navy-500 dark:text-white/40 uppercase tracking-wider">Assign Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold flex-shrink-0">
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-navy-900 dark:text-white">{user.name}</div>
                            <div className="text-xs text-navy-400 dark:text-white/40">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={roleBadgeVariant[userRoles[user.id]] || 'default'} size="sm">
                          {ROLE_LABELS[userRoles[user.id] as UserRole] || userRoles[user.id]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{formatDate(user.joined)}</td>
                      <td className="py-3 px-4 text-sm text-navy-400 dark:text-white/40">{formatDate(user.lastActive)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={user.status === 'active' ? 'success' : 'default'} size="sm" dot>{user.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={userRoles[user.id]}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="text-xs px-2 py-1 rounded-sm border bg-white text-navy-900 dark:bg-navy-900 dark:text-white dark:border-navy-700 border-navy-200 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
                        >
                          {roleOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-8 text-navy-400 dark:text-white/40 text-sm">
                  No users match your search.
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
