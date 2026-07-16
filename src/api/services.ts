import apiClient from './client'
import { API_ROUTES } from '@/utils/constants'

export interface Donation {
  id: string
  amount: number
  campaign: string
  type: string
  status: string
  date: string
  receipt_url?: string
}

export interface DashboardStats {
  total_raised: number
  active_volunteers: number
  programs_running: number
  pending_approvals: number
  monthly_revenue: number[]
  recent_donations: Donation[]
}

export const donationService = {
  async getAll(params?: { status?: string; page?: number; per_page?: number }) {
    const response = await apiClient.get(API_ROUTES.DONATIONS, { params })
    return response.data
  },

  async create(data: { amount: number; campaign: string; type: string; name: string; email: string }) {
    const response = await apiClient.post(API_ROUTES.DONATIONS, data)
    return response.data.data
  },

  async getHistory() {
    const response = await apiClient.get(`${API_ROUTES.DONATIONS}/history`)
    return response.data.data
  },

  async getRecurring() {
    const response = await apiClient.get(`${API_ROUTES.DONATIONS}/recurring`)
    return response.data.data
  },

  async cancelRecurring(id: string) {
    await apiClient.delete(`${API_ROUTES.DONATIONS}/recurring/${id}`)
  },

  async getReceipt(id: string) {
    const response = await apiClient.get(`${API_ROUTES.DONATIONS}/receipts/${id}`, {
      responseType: 'blob',
    })
    return response.data
  },
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get(`${API_ROUTES.DASHBOARD}/stats`)
    return response.data.data
  },

  async getCharts() {
    const response = await apiClient.get(`${API_ROUTES.DASHBOARD}/charts`)
    return response.data.data
  },

  async getActivities() {
    const response = await apiClient.get(`${API_ROUTES.DASHBOARD}/activities`)
    return response.data.data
  },
}

export const volunteerService = {
  async getMissions() {
    const response = await apiClient.get(`${API_ROUTES.VOLUNTEERS}/missions`)
    return response.data.data
  },

  async getImpact() {
    const response = await apiClient.get(`${API_ROUTES.VOLUNTEERS}/impact`)
    return response.data.data
  },

  async logHours(data: { mission_id: number; hours: number; description: string }) {
    const response = await apiClient.post(`${API_ROUTES.VOLUNTEERS}/hours`, data)
    return response.data.data
  },

  async getRoster(params?: { status?: string; page?: number }) {
    const response = await apiClient.get(API_ROUTES.VOLUNTEERS, { params })
    return response.data
  },

  async approveVolunteer(id: number) {
    const response = await apiClient.put(`${API_ROUTES.VOLUNTEERS}/${id}/approve`)
    return response.data.data
  },
}

export const userService = {
  async getAll(params?: { role?: string; status?: string; page?: number }) {
    const response = await apiClient.get(API_ROUTES.USERS, { params })
    return response.data
  },

  async getById(id: number) {
    const response = await apiClient.get(`${API_ROUTES.USERS}/${id}`)
    return response.data.data
  },

  async update(id: number, data: Record<string, unknown>) {
    const response = await apiClient.put(`${API_ROUTES.USERS}/${id}`, data)
    return response.data.data
  },

  async delete(id: number) {
    await apiClient.delete(`${API_ROUTES.USERS}/${id}`)
  },
}

export const eventService = {
  async getAll(params?: { upcoming?: boolean; page?: number }) {
    const response = await apiClient.get(API_ROUTES.EVENTS, { params })
    return response.data
  },

  async getById(id: number) {
    const response = await apiClient.get(`${API_ROUTES.EVENTS}/${id}`)
    return response.data.data
  },

  async register(id: number) {
    const response = await apiClient.post(`${API_ROUTES.EVENTS}/${id}/register`)
    return response.data.data
  },
}

export const newsService = {
  async getAll(params?: { category?: string; page?: number }) {
    const response = await apiClient.get(API_ROUTES.NEWS, { params })
    return response.data
  },

  async getBySlug(slug: string) {
    const response = await apiClient.get(`${API_ROUTES.NEWS}/${slug}`)
    return response.data.data
  },
}

export const contactService = {
  async submit(data: { name: string; email: string; subject: string; message: string }) {
    const response = await apiClient.post(API_ROUTES.CONTACT, data)
    return response.data.data
  },
}

export const reportService = {
  async getAll() {
    const response = await apiClient.get(API_ROUTES.REPORTS)
    return response.data.data
  },

  async download(id: number) {
    const response = await apiClient.get(`${API_ROUTES.REPORTS}/export/${id}`, {
      responseType: 'blob',
    })
    return response.data
  },
}

export const auditLogService = {
  async getAll(params?: { page?: number; per_page?: number }) {
    const response = await apiClient.get(API_ROUTES.AUDIT_LOGS, { params })
    return response.data
  },
}
