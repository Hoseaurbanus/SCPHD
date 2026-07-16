import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency, formatDate } from '@/utils/helpers'

const stats = [
  { label: 'Total Given', value: '$4,850', change: '+$250 this month', icon: '💰' },
  { label: 'This Year', value: '$1,200', change: '60% of goal', icon: '📅' },
  { label: 'Programs Supported', value: '3', change: '1 new', icon: '🎯' },
  { label: 'Lives Impacted', value: '234', change: '+48 this quarter', icon: '🤝' },
]

const suggestedPrograms = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    description: 'Providing clean drinking water to communities in need.',
    progress: 72,
    raised: 36000,
    goal: 50000,
    category: 'Environment',
  },
  {
    id: 2,
    title: 'Education for Refugees',
    description: 'Supporting education programs for displaced children.',
    progress: 45,
    raised: 27000,
    goal: 60000,
    category: 'Education',
  },
  {
    id: 3,
    title: 'Emergency Relief Fund',
    description: 'Rapid response to humanitarian crises.',
    progress: 88,
    raised: 44000,
    goal: 50000,
    category: 'Emergency Relief',
  },
]

export default function DonorDashboard() {
  const { ref, isInView } = useScrollReveal()

  const annualGoal = 2000
  const annualGiven = 1200
  const annualPercentage = Math.round((annualGiven / annualGoal) * 100)

  return (
    <>
      <Helmet>
        <title>Donor Dashboard | SCPHD</title>
        <meta name="description" content="Your donor dashboard - track giving, impact, and more." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <Card variant="dark" className="bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border-navy-700/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                    Welcome back, James!
                  </h2>
                  <p className="text-white/60 mt-1">
                    Thank you for your generous support. Your contributions are making a real difference.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                    <Button>Make a Gift</Button>
                    <Button variant="outline" className="border-navy-600 text-white/70 hover:bg-navy-700 hover:text-white">
                      View Impact
                    </Button>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <Card className="bg-navy-800/50 border-navy-700/50 text-center">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Annual Giving Goal</div>
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-navy-700" />
                        <motion.circle
                          cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8"
                          strokeLinecap="round" strokeDasharray={2 * Math.PI * 50}
                          className="text-gold-500"
                          initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - annualPercentage / 100) }}
                          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-white">{annualPercentage}%</span>
                      </div>
                    </div>
                    <div className="text-sm text-white/60">
                      {formatCurrency(annualGiven)} of {formatCurrency(annualGoal)}
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.div>
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

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Next Scheduled Gift
              </h3>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-navy-900 dark:text-white">$250</span>
                      <Badge variant="success" size="sm">Monthly</Badge>
                    </div>
                    <p className="text-sm text-navy-500 dark:text-white/50">Education for Refugees</p>
                    <p className="text-xs text-navy-400 dark:text-white/40 mt-1">Next: August 1, 2026</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-navy-400 dark:text-white/40">Auto-donate</div>
                    <div className="w-10 h-5 bg-gold-500 rounded-full mt-1 relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Impact Metrics
              </h3>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Meals Provided', value: '1,240' },
                    { label: 'Students Supported', value: '48' },
                    { label: 'Water Systems', value: '3' },
                    { label: 'Families Helped', value: '67' },
                  ].map((metric) => (
                    <div key={metric.label} className="text-center p-3 bg-navy-50 dark:bg-navy-800 rounded-sm">
                      <div className="text-lg font-bold text-navy-900 dark:text-white">{metric.value}</div>
                      <div className="text-[10px] text-navy-400 dark:text-white/40 uppercase tracking-wider">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
              Suggested Programs
            </h3>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedPrograms.map((program) => (
              <motion.div key={program.id} variants={fadeUp}>
                <Card hover className="h-full">
                  <Badge variant="info" size="sm" className="mb-3">{program.category}</Badge>
                  <h4 className="font-semibold text-navy-900 dark:text-white mb-1">{program.title}</h4>
                  <p className="text-sm text-navy-500 dark:text-white/50 mb-4">{program.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-navy-400 dark:text-white/40 mb-1">
                      <span>{formatCurrency(program.raised)} raised</span>
                      <span>{formatCurrency(program.goal)} goal</span>
                    </div>
                    <div className="h-2 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 rounded-full" style={{ width: `${program.progress}%` }} />
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Donate</Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
