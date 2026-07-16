import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { useScrollReveal, fadeUp } from '@/hooks/useScrollReveal'

export default function VolunteerResources() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Resources | SCPHD</title>
        <meta name="description" content="Download volunteer resources, guides, and training materials." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Resources
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Downloadable guides, training materials, and templates</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card>
            <EmptyState
              title="No resources available yet"
              description="Resources will be published here by administrators."
            />
          </Card>
        </motion.div>
      </div>
    </>
  )
}
