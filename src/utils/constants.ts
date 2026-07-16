export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },
  USERS: '/users',
  PROGRAMS: '/programs',
  PROJECTS: '/projects',
  EVENTS: '/events',
  DONATIONS: '/donations',
  VOLUNTEERS: '/volunteers',
  PARTNERS: '/partners',
  NEWS: '/news',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  REPORTS: '/reports',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  AUDIT_LOGS: '/audit-logs',
} as const

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMINISTRATOR: 'administrator',
  PROGRAM_MANAGER: 'program_manager',
  VOLUNTEER_MANAGER: 'volunteer_manager',
  FINANCE_OFFICER: 'finance_officer',
  EDITOR: 'editor',
  DONOR: 'donor',
  VOLUNTEER: 'volunteer',
  MEMBER: 'member',
  VIEWER: 'viewer',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  administrator: 'Administrator',
  program_manager: 'Program Manager',
  volunteer_manager: 'Volunteer Manager',
  finance_officer: 'Finance Officer',
  editor: 'Editor',
  donor: 'Donor',
  volunteer: 'Volunteer',
  member: 'Member',
  viewer: 'Viewer',
}

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  super_admin: '/admin/overview',
  administrator: '/admin/overview',
  program_manager: '/admin/overview',
  volunteer_manager: '/admin/overview',
  finance_officer: '/admin/overview',
  editor: '/admin/overview',
  donor: '/donor/dashboard',
  volunteer: '/volunteer/dashboard',
  member: '/volunteer/dashboard',
  viewer: '/volunteer/dashboard',
}

export const PROGRAM_CATEGORIES = [
  'All',
  'Education',
  'Healthcare',
  'Livelihoods',
  'Conflict Resolution',
  'Emergency Relief',
  'Environment',
] as const

export const DONATION_CAMPAIGNS = [
  { id: 'emergency-relief', name: 'Emergency Relief', color: '#ef4444' },
  { id: 'education', name: 'Education for Refugees', color: '#3b82f6' },
  { id: 'clean-water', name: 'Clean Water Initiative', color: '#06b6d4' },
  { id: 'where-most-needed', name: 'Where Most Needed', color: '#C49A2E' },
] as const

export const VOLUNTEER_LEVELS = {
  PLATINUM: { label: 'Platinum', min: 1000, color: 'text-slate-300' },
  GOLD: { label: 'Gold', min: 500, color: 'text-gold-500' },
  SILVER: { label: 'Silver', min: 200, color: 'text-gray-400' },
  BRONZE: { label: 'Bronze', min: 0, color: 'text-amber-600' },
} as const

export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Media & Press',
  'Partnership',
  'Donations',
  'Volunteering',
  'Emergency',
  'Other',
] as const
