import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useAuth } from '@/context/AuthContext'
import { registerSchema, type RegisterFormData } from '@/utils/validators'
import { ROLE_REDIRECTS } from '@/utils/constants'
import { fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

const roleOptions = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'donor', label: 'Donor' },
  { value: 'member', label: 'Member' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register: registerUser, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      role: 'volunteer',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      toast.success('Account created successfully!')
      navigate(ROLE_REDIRECTS[user.role as keyof typeof ROLE_REDIRECTS] || '/volunteer/dashboard')
    } catch {
      toast.error('Registration failed. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Register | SCPHD</title>
        <meta name="description" content="Create your SCPHD account and join our mission." />
      </Helmet>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            Create Account
          </h2>
          <p className="text-white/50 text-sm mt-1">Join the SCPHD community</p>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Select
            label="I want to join as"
            options={roleOptions}
            error={errors.role?.message}
            {...register('role')}
          />

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 rounded border-navy-600 bg-navy-800 text-gold-500 focus:ring-gold-500/50"
              {...register('agreeToTerms')}
            />
            <span className="text-sm text-white/60">
              I agree to the{' '}
              <span className="text-gold-400 hover:text-gold-300">Terms of Service</span>{' '}
              and{' '}
              <span className="text-gold-400 hover:text-gold-300">Privacy Policy</span>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-400">{errors.agreeToTerms.message}</p>
          )}

          <Button type="submit" loading={isLoading} className="w-full" size="lg">
            Create Account
          </Button>
        </motion.form>

        <motion.p variants={fadeUp} className="text-center text-sm text-white/40">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-300">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </>
  )
}
