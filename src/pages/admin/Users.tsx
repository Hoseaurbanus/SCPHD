import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'

const users: never[] = []

export default function AdminUsers() {
  const { ref, isInView } = useScrollReveal()
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = users

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
                0 users
              </div>
            </div>

            <EmptyState title="No users registered yet" description="Users will appear here once they create accounts." />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
