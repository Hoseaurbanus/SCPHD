import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

interface SettingsForm {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  donationEmail: string
  supportEmail: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
}

export default function AdminSettings() {
  const { ref, isInView } = useScrollReveal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsForm>({
    defaultValues: {
      siteName: 'SCPHD - Springfield Center for Peace & Human Development',
      siteDescription: 'Empowering communities through education, healthcare, and sustainable development programs worldwide.',
      contactEmail: 'info@scphd.org',
      contactPhone: '+1 (555) 123-4567',
      contactAddress: '123 Peace Avenue, Springfield, IL 62701',
      donationEmail: 'donate@scphd.org',
      supportEmail: 'support@scphd.org',
      facebookUrl: 'https://facebook.com/scphd',
      twitterUrl: 'https://twitter.com/scphd',
      instagramUrl: 'https://instagram.com/scphd',
    },
  })

  const onSubmit = async (data: SettingsForm) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully!')
    } catch {
      toast.error('Failed to save settings')
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings | SCPHD Admin</title>
        <meta name="description" content="Configure site settings and contact information." />
      </Helmet>

      <div className="space-y-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            Settings
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Configure site information and preferences</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                General Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Organization Name"
                  {...register('siteName', { required: 'Name is required' })}
                  error={errors.siteName?.message}
                />
                <div>
                  <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Description</label>
                  <textarea
                    {...register('siteDescription')}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-200 dark:bg-navy-900 dark:text-white dark:border-navy-700 border-navy-200 dark:border-navy-700 resize-none"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Contact Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Email"
                  type="email"
                  {...register('contactEmail', { required: 'Email is required' })}
                  error={errors.contactEmail?.message}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  {...register('contactPhone')}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Address"
                    {...register('contactAddress')}
                  />
                </div>
                <Input
                  label="Donations Email"
                  type="email"
                  {...register('donationEmail')}
                />
                <Input
                  label="Support Email"
                  type="email"
                  {...register('supportEmail')}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
                Social Media
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input
                  label="Facebook URL"
                  placeholder="https://facebook.com/..."
                  {...register('facebookUrl')}
                />
                <Input
                  label="Twitter URL"
                  placeholder="https://twitter.com/..."
                  {...register('twitterUrl')}
                />
                <Input
                  label="Instagram URL"
                  placeholder="https://instagram.com/..."
                  {...register('instagramUrl')}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Save Settings
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </>
  )
}
