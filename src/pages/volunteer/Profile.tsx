import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { profileSchema, type ProfileFormData } from '@/utils/validators'

export default function VolunteerProfile() {
  const { ref, isInView } = useScrollReveal()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      location: '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch {
      toast.error('Failed to update profile')
    }
  }

  return (
    <>
      <Helmet>
        <title>My Profile | SCPHD</title>
        <meta name="description" content="Manage your volunteer profile and settings." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
            My Profile
          </h2>
          <p className="text-navy-500 dark:text-white/50 mt-1">Manage your account information</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp}>
            <Card variant="dark" className="bg-gradient-to-br from-navy-800 to-navy-900 border-navy-700/50">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gold-500/20 border-2 border-gold-500/30 flex items-center justify-center text-gold-400 text-3xl font-bold font-[family-name:var(--font-display)]">
                  ?
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-display)]">Your Name</h3>
                  <p className="text-white/50 text-sm">Volunteer</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)]">
                Profile Information
              </h3>
              <Button
                variant={isEditing ? 'ghost' : 'outline'}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register('name')}
                    error={errors.name?.message}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Bio</label>
                  <textarea
                    {...register('bio')}
                    placeholder="Tell us about yourself"
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-200 dark:bg-navy-900 dark:text-white dark:border-navy-700 dark:placeholder:text-navy-500 border-navy-200 dark:border-navy-700 disabled:opacity-60 resize-none"
                  />
                </div>
                <Input
                  label="Location"
                  placeholder="Enter your location"
                  {...register('location')}
                  error={errors.location?.message}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" loading={false}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-semibold text-navy-900 dark:text-white font-[family-name:var(--font-display)] mb-4">
              Skills & Expertise
            </h3>
            <Card>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm text-gold-500 hover:text-gold-400 border border-dashed border-gold-500/30 rounded-sm hover:border-gold-500/50 transition-colors">
                  + Add Skill
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
