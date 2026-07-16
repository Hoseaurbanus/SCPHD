import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AuthLayout from '@/layouts/AuthLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'

const HomePage = lazy(() => import('@/pages/public/HomePage'))
const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const ProgramsPage = lazy(() => import('@/pages/public/ProgramsPage'))
const DonatePage = lazy(() => import('@/pages/public/DonatePage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))
const NewsPage = lazy(() => import('@/pages/public/NewsPage'))
const EventsPage = lazy(() => import('@/pages/public/EventsPage'))

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))

const VolunteerDashboard = lazy(() => import('@/pages/volunteer/Dashboard'))
const VolunteerMissions = lazy(() => import('@/pages/volunteer/Missions'))
const VolunteerImpact = lazy(() => import('@/pages/volunteer/Impact'))
const VolunteerResources = lazy(() => import('@/pages/volunteer/Resources'))
const VolunteerProfile = lazy(() => import('@/pages/volunteer/Profile'))

const DonorDashboard = lazy(() => import('@/pages/donor/Dashboard'))
const DonorHistory = lazy(() => import('@/pages/donor/History'))
const DonorRecurring = lazy(() => import('@/pages/donor/Recurring'))
const DonorImpact = lazy(() => import('@/pages/donor/Impact'))
const DonorReceipts = lazy(() => import('@/pages/donor/Receipts'))

const AdminOverview = lazy(() => import('@/pages/admin/Overview'))
const AdminDonations = lazy(() => import('@/pages/admin/Donations'))
const AdminVolunteers = lazy(() => import('@/pages/admin/Volunteers'))
const AdminPrograms = lazy(() => import('@/pages/admin/Programs'))
const AdminUsers = lazy(() => import('@/pages/admin/Users'))
const AdminReports = lazy(() => import('@/pages/admin/Reports'))
const AdminSettings = lazy(() => import('@/pages/admin/Settings'))
const AdminAudit = lazy(() => import('@/pages/admin/Audit'))

const Loading = () => (
  <div className="flex items-center justify-center p-12">
    <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

const Suspense = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
)

import React from 'react'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Suspense><HomePage /></Suspense> },
      { path: 'about', element: <Suspense><AboutPage /></Suspense> },
      { path: 'programs', element: <Suspense><ProgramsPage /></Suspense> },
      { path: 'donate', element: <Suspense><DonatePage /></Suspense> },
      { path: 'donate/:campaignId', element: <Suspense><DonatePage /></Suspense> },
      { path: 'contact', element: <Suspense><ContactPage /></Suspense> },
      { path: 'news', element: <Suspense><NewsPage /></Suspense> },
      { path: 'events', element: <Suspense><EventsPage /></Suspense> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Suspense><LoginPage /></Suspense> },
      { path: 'register', element: <Suspense><RegisterPage /></Suspense> },
      { path: 'forgot-password', element: <Suspense><ForgotPasswordPage /></Suspense> },
    ],
  },
  {
    path: '/volunteer',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Suspense><VolunteerDashboard /></Suspense> },
      { path: 'missions', element: <Suspense><VolunteerMissions /></Suspense> },
      { path: 'impact', element: <Suspense><VolunteerImpact /></Suspense> },
      { path: 'resources', element: <Suspense><VolunteerResources /></Suspense> },
      { path: 'profile', element: <Suspense><VolunteerProfile /></Suspense> },
    ],
  },
  {
    path: '/donor',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Suspense><DonorDashboard /></Suspense> },
      { path: 'history', element: <Suspense><DonorHistory /></Suspense> },
      { path: 'recurring', element: <Suspense><DonorRecurring /></Suspense> },
      { path: 'impact', element: <Suspense><DonorImpact /></Suspense> },
      { path: 'receipts', element: <Suspense><DonorReceipts /></Suspense> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['super_admin', 'administrator', 'program_manager', 'volunteer_manager', 'finance_officer', 'editor']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'overview', element: <Suspense><AdminOverview /></Suspense> },
      { path: 'donations', element: <Suspense><AdminDonations /></Suspense> },
      { path: 'volunteers', element: <Suspense><AdminVolunteers /></Suspense> },
      { path: 'programs', element: <Suspense><AdminPrograms /></Suspense> },
      { path: 'users', element: <Suspense><AdminUsers /></Suspense> },
      { path: 'reports', element: <Suspense><AdminReports /></Suspense> },
      { path: 'settings', element: <Suspense><AdminSettings /></Suspense> },
      { path: 'audit', element: <Suspense><AdminAudit /></Suspense> },
    ],
  },
])
