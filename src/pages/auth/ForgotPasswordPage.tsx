import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/utils/validators'
import { fadeUp, staggerContainer } from '@/hooks/useScrollReveal'

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSentEmail(data.email)
      setEmailSent(true)
      toast.success('Password reset email sent!')
    } catch {
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password | SCPHD</title>
        <meta name="description" content="Reset your SCPHD account password." />
      </Helmet>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={fadeUp} className="text-center">
          <div className="w-16 h-16 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center mb-4">
            {emailSent ? (
              <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            {emailSent ? 'Check Your Email' : 'Forgot Password?'}
          </h2>
          <p className="text-white/50 text-sm mt-1">
            {emailSent
              ? `We've sent a password reset link to ${sentEmail}`
              : "No worries! Enter your email and we'll send you a reset link."}
          </p>
        </motion.div>

        {emailSent ? (
          <motion.div variants={fadeUp} className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-sm p-4 text-center">
              <p className="text-sm text-emerald-400">
                If an account exists with that email, you&apos;ll receive a password reset link shortly.
              </p>
            </div>

            <Button
              onClick={() => {
                setEmailSent(false)
              }}
              variant="outline"
              className="w-full border-navy-600 text-white/70 hover:bg-navy-800 hover:text-white"
            >
              Send Again
            </Button>
          </motion.div>
        ) : (
          <motion.form variants={fadeUp} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Button type="submit" loading={isLoading} className="w-full" size="lg">
              Send Reset Link
            </Button>
          </motion.form>
        )}

        <motion.div variants={fadeUp} className="text-center">
          <Link to="/login" className="text-sm text-white/40 hover:text-white/60 transition-colors">
            &larr; Back to Sign In
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}
