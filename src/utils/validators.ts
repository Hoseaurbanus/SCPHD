import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export const registerSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
  role: yup.string().oneOf(['volunteer', 'donor', 'member']).required('Please select a role'),
  agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms').required(),
})

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
})

export const resetPasswordSchema = yup.object({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
})

export const contactSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
})

export const donationSchema = yup.object({
  amount: yup.number().min(1, 'Minimum donation is $1').required('Amount is required'),
  campaign: yup.string().required('Please select a campaign'),
  frequency: yup.string().oneOf(['one-time', 'monthly']).required(),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
})

export const profileSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  bio: yup.string(),
  location: yup.string(),
})

export const programSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  status: yup.string().required('Status is required'),
  budget: yup.number().min(0).required('Budget is required'),
  beneficiaries: yup.number().min(0).required('Beneficiaries count is required'),
  country: yup.string().required('Country is required'),
  region: yup.string().required('Region is required'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>
export type ContactFormData = yup.InferType<typeof contactSchema>
export type DonationFormData = yup.InferType<typeof donationSchema>
export type ProfileFormData = yup.InferType<typeof profileSchema>
export type ProgramFormData = yup.InferType<typeof programSchema>
