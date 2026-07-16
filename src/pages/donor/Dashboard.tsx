import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { formatCurrency } from '@/utils/helpers'

const stats = [
  { label: 'Total Given', value: '$0', icon: '💰' },
  { label: 'This Year', value: '$0', icon: '📅' },
  { label: 'Programs Supported', value: '0', icon: '🎯' },
  { label: 'Lives Impacted', value: '0', icon: '🤝' },
]

export default function DonorDashboard() {
  const { ref, isInView } = useScrollReveal()

  const annualGoal = 0
  const annualGiven = 0
  const annualPercentage = 0

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
                    Welcome back!
                  </h2>
                  <p className="text-white/60 mt-1">
                    Thank you for your support. Your contributions are making a real difference.
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
                          animate={{ strokeDashoffset: 2 * Math.PI * 50 }}
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
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Suggested Programs
              </h3>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card>
                <EmptyState title="No programs available yet" description="Programs will appear here once they are published." />
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Recent Activity
              </h3>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card>
                <EmptyState title="No recent activity" description="Your activity will appear here." />
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
