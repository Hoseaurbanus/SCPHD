import { Suspense, lazy, Component, type ReactNode } from 'react'
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

const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'))

const Loading = () => (
  <div className="flex items-center justify-center p-12">
    <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-sm text-navy-500 dark:text-navy-400 mb-4">Failed to load this page. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gold-500 text-navy-900 text-sm font-semibold rounded-sm hover:bg-gold-400 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <ErrorBoundary><Suspense fallback={<Loading />}><HomePage /></Suspense></ErrorBoundary> },
      { path: 'about', element: <ErrorBoundary><Suspense fallback={<Loading />}><AboutPage /></Suspense></ErrorBoundary> },
      { path: 'programs', element: <ErrorBoundary><Suspense fallback={<Loading />}><ProgramsPage /></Suspense></ErrorBoundary> },
      { path: 'donate', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonatePage /></Suspense></ErrorBoundary> },
      { path: 'donate/:campaignId', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonatePage /></Suspense></ErrorBoundary> },
      { path: 'contact', element: <ErrorBoundary><Suspense fallback={<Loading />}><ContactPage /></Suspense></ErrorBoundary> },
      { path: 'news', element: <ErrorBoundary><Suspense fallback={<Loading />}><NewsPage /></Suspense></ErrorBoundary> },
      { path: 'events', element: <ErrorBoundary><Suspense fallback={<Loading />}><EventsPage /></Suspense></ErrorBoundary> },
      { path: '*', element: <ErrorBoundary><Suspense fallback={<Loading />}><NotFoundPage /></Suspense></ErrorBoundary> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <ErrorBoundary><Suspense fallback={<Loading />}><LoginPage /></Suspense></ErrorBoundary> },
      { path: 'register', element: <ErrorBoundary><Suspense fallback={<Loading />}><RegisterPage /></Suspense></ErrorBoundary> },
      { path: 'forgot-password', element: <ErrorBoundary><Suspense fallback={<Loading />}><ForgotPasswordPage /></Suspense></ErrorBoundary> },
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
      { path: 'dashboard', element: <ErrorBoundary><Suspense fallback={<Loading />}><VolunteerDashboard /></Suspense></ErrorBoundary> },
      { path: 'missions', element: <ErrorBoundary><Suspense fallback={<Loading />}><VolunteerMissions /></Suspense></ErrorBoundary> },
      { path: 'impact', element: <ErrorBoundary><Suspense fallback={<Loading />}><VolunteerImpact /></Suspense></ErrorBoundary> },
      { path: 'resources', element: <ErrorBoundary><Suspense fallback={<Loading />}><VolunteerResources /></Suspense></ErrorBoundary> },
      { path: 'profile', element: <ErrorBoundary><Suspense fallback={<Loading />}><VolunteerProfile /></Suspense></ErrorBoundary> },
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
      { path: 'dashboard', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonorDashboard /></Suspense></ErrorBoundary> },
      { path: 'history', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonorHistory /></Suspense></ErrorBoundary> },
      { path: 'recurring', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonorRecurring /></Suspense></ErrorBoundary> },
      { path: 'impact', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonorImpact /></Suspense></ErrorBoundary> },
      { path: 'receipts', element: <ErrorBoundary><Suspense fallback={<Loading />}><DonorReceipts /></Suspense></ErrorBoundary> },
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
      { path: 'overview', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminOverview /></Suspense></ErrorBoundary> },
      { path: 'donations', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminDonations /></Suspense></ErrorBoundary> },
      { path: 'volunteers', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminVolunteers /></Suspense></ErrorBoundary> },
      { path: 'programs', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminPrograms /></Suspense></ErrorBoundary> },
      { path: 'users', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminUsers /></Suspense></ErrorBoundary> },
      { path: 'reports', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminReports /></Suspense></ErrorBoundary> },
      { path: 'settings', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminSettings /></Suspense></ErrorBoundary> },
      { path: 'audit', element: <ErrorBoundary><Suspense fallback={<Loading />}><AdminAudit /></Suspense></ErrorBoundary> },
    ],
  },
])
