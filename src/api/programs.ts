import apiClient from './client'
import { API_ROUTES } from '@/utils/constants'

export interface Program {
  id: number
  title: string
  slug: string
  description: string
  category: string
  status: string
  image: string
  budget: number
  spent: number
  beneficiaries: number
  country: string
  region: string
  start_date: string
  end_date: string | null
  created_at: string
}

export const programService = {
  async getAll(params?: { category?: string; status?: string; page?: number; per_page?: number }) {
    const response = await apiClient.get(API_ROUTES.PROGRAMS, { params })
    return response.data
  },

  async getById(id: number): Promise<Program> {
    const response = await apiClient.get(`${API_ROUTES.PROGRAMS}/${id}`)
    return response.data.data
  },

  async create(data: Partial<Program>): Promise<Program> {
    const response = await apiClient.post(API_ROUTES.PROGRAMS, data)
    return response.data.data
  },

  async update(id: number, data: Partial<Program>): Promise<Program> {
    const response = await apiClient.put(`${API_ROUTES.PROGRAMS}/${id}`, data)
    return response.data.data
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`${API_ROUTES.PROGRAMS}/${id}`)
  },
}
