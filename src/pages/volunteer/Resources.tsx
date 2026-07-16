import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const resources = [
  {
    id: 1,
    title: 'Volunteer Handbook 2026',
    description: 'Complete guide to SCPHD volunteering policies, procedures, and expectations.',
    category: 'Guide',
    format: 'PDF',
    size: '2.4 MB',
    downloads: 342,
    icon: '📘',
  },
  {
    id: 2,
    title: 'First Aid Training Manual',
    description: 'Essential first aid procedures and emergency response protocols for field volunteers.',
    category: 'Training',
    format: 'PDF',
    size: '5.1 MB',
    downloads: 218,
    icon: '🏥',
  },
  {
    id: 3,
    title: 'Cultural Sensitivity Guide',
    description: 'Working effectively across cultures in humanitarian operations.',
    category: 'Guide',
    format: 'PDF',
    size: '1.8 MB',
    downloads: 156,
    icon: '🌍',
  },
  {
    id: 4,
    title: 'Safety & Security Protocol',
    description: 'Field safety guidelines, risk assessment templates, and emergency contacts.',
    category: 'Safety',
    format: 'PDF',
    size: '3.2 MB',
    downloads: 289,
    icon: '🛡',
  },
  {
    id: 5,
    title: 'Impact Reporting Template',
    description: 'Standard template for logging volunteer hours and impact metrics.',
    category: 'Template',
    format: 'PDF',
    size: '0.8 MB',
    downloads: 178,
    icon: '📊',
  },
  {
    id: 6,
    title: 'Conflict Resolution Workshop',
    description: 'Materials for the advanced conflict resolution training workshop.',
    category: 'Training',
    format: 'PDF',
    size: '4.5 MB',
    downloads: 94,
    icon: '🤝',
  },
]

const categoryColors: Record<string, 'success' | 'warning' | 'info' | 'danger' | 'default'> = {
  Guide: 'info',
  Training: 'success',
  Safety: 'danger',
  Template: 'warning',
}

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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {resources.map((resource) => (
            <motion.div key={resource.id} variants={fadeUp}>
              <Card hover className="h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-sm bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-2xl flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 dark:text-white text-sm leading-tight">{resource.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={categoryColors[resource.category] || 'default'} size="sm">
                        {resource.category}
                      </Badge>
                      <span className="text-[10px] text-navy-300 dark:text-white/30">{resource.format} · {resource.size}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-navy-500 dark:text-white/50 flex-1 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-navy-100 dark:border-navy-800">
                  <span className="text-xs text-navy-400 dark:text-white/40">
                    {resource.downloads} downloads
                  </span>
                  <Button size="sm" variant="ghost" className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
