import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useScrollReveal, fadeUp, staggerContainer } from '@/hooks/useScrollReveal'
import { profileSchema, type ProfileFormData } from '@/utils/validators'
import { getInitials } from '@/utils/helpers'

const skills = ['Community Outreach', 'First Aid', 'Teaching', 'Event Planning', 'Data Entry', 'Translation']

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
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com',
      bio: 'Passionate community organizer with 3 years of experience in humanitarian work. Dedicated to making a positive impact in underserved communities.',
      location: 'Springfield, IL',
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
                  {getInitials('Sarah Mitchell')}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-display)]">Sarah Mitchell</h3>
                  <p className="text-white/50 text-sm">Volunteer · Springfield, IL</p>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                    <Badge variant="success" size="md">Active Volunteer</Badge>
                    <Badge variant="outline" size="md" className="border-gold-500/40 text-gold-400">Gold Level</Badge>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-3xl font-bold text-gold-400 number-glow">167</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Total Hours</div>
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
                    {...register('name')}
                    error={errors.name?.message}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Bio</label>
                  <textarea
                    {...register('bio')}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-200 dark:bg-navy-900 dark:text-white dark:border-navy-700 dark:placeholder:text-navy-500 border-navy-200 dark:border-navy-700 disabled:opacity-60 resize-none"
                  />
                </div>
                <Input
                  label="Location"
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
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-navy-50 dark:bg-navy-800 text-navy-700 dark:text-white/70 rounded-sm border border-navy-200 dark:border-navy-700"
                  >
                    {skill}
                  </span>
                ))}
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
