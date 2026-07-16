import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency, getStatusColor } from '@/utils/helpers'

const programs = [
  {
    id: 1,
    title: 'Education for Refugees',
    description: 'Providing quality education to displaced children and youth through formal schooling, vocational training, and digital literacy programs.',
    category: 'Education',
    status: 'active',
    budget: 120000,
    spent: 84000,
    beneficiaries: 1240,
    country: 'Jordan, Lebanon',
    progress: 70,
  },
  {
    id: 2,
    title: 'Clean Water Initiative',
    description: 'Installing water filtration systems and educating communities on water conservation and sanitation practices.',
    category: 'Environment',
    status: 'active',
    budget: 85000,
    spent: 62000,
    beneficiaries: 890,
    country: 'Kenya, Tanzania',
    progress: 73,
  },
  {
    id: 3,
    title: 'Emergency Relief Fund',
    description: 'Rapid response to humanitarian crises with emergency shelter, food, and medical supplies.',
    category: 'Emergency Relief',
    status: 'active',
    budget: 200000,
    spent: 156000,
    beneficiaries: 2100,
    country: 'Bangladesh, Syria',
    progress: 78,
  },
  {
    id: 4,
    title: 'Community Health Outreach',
    description: 'Mobile health clinics and preventive care programs for underserved communities.',
    category: 'Healthcare',
    status: 'active',
    budget: 95000,
    spent: 48000,
    beneficiaries: 620,
    country: 'Haiti, Guatemala',
    progress: 51,
  },
  {
    id: 5,
    title: 'Youth Empowerment Program',
    description: 'Mentorship and leadership development for at-risk youth through workshops and community projects.',
    category: 'Education',
    status: 'upcoming',
    budget: 60000,
    spent: 8000,
    beneficiaries: 150,
    country: 'Colombia',
    progress: 13,
  },
]

const statusVariant: Record<string, 'success' | 'info' | 'warning'> = {
  active: 'success',
  upcoming: 'info',
  completed: 'warning',
}

export default function AdminPrograms() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Programs | SCPHD Admin</title>
        <meta name="description" content="Manage SCPHD programs and track their progress." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
                Programs
              </h2>
              <p className="text-navy-500 dark:text-white/50 mt-1">Manage active and upcoming programs</p>
            </div>
            <Button>
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Program
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-4"
        >
          {programs.map((program) => (
            <motion.div key={program.id} variants={fadeUp}>
              <Card hover>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-navy-900 dark:text-white">{program.title}</h3>
                      <Badge variant={statusVariant[program.status] || 'default'} size="sm">{program.status}</Badge>
                      <Badge variant="outline" size="sm">{program.category}</Badge>
                    </div>
                    <p className="text-sm text-navy-500 dark:text-white/50 mb-3">{program.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-navy-400 dark:text-white/40">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {program.country}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {program.beneficiaries.toLocaleString()} beneficiaries
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0 w-full lg:w-48">
                    <div className="flex items-center justify-between w-full text-sm">
                      <span className="text-navy-400 dark:text-white/40">Budget</span>
                      <span className="font-semibold text-navy-900 dark:text-white">{formatCurrency(program.budget)}</span>
                    </div>
                    <div className="flex items-center justify-between w-full text-sm">
                      <span className="text-navy-400 dark:text-white/40">Spent</span>
                      <span className="text-navy-500 dark:text-white/50">{formatCurrency(program.spent)}</span>
                    </div>
                    <div className="w-full">
                      <div className="h-2 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            program.progress >= 90 ? 'bg-emerald-500' : program.progress >= 60 ? 'bg-gold-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-navy-400 dark:text-white/40 mt-1">
                        {program.progress}% used
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
