import apiClient from './client'
import { API_ROUTES } from '@/utils/constants'
import type { LoginFormData, RegisterFormData } from '@/utils/validators'

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string | null
  email_verified_at: string | null
  created_at: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: User
}

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, data)
    return response.data.data
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await apiClient.post(API_ROUTES.AUTH.REGISTER, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    })
    return response.data.data
  },

  async logout(): Promise<void> {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT)
  },

  async refreshToken(token: string): Promise<{ access_token: string }> {
    const response = await apiClient.post(API_ROUTES.AUTH.REFRESH, {
      refresh_token: token,
    })
    return response.data.data
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get(API_ROUTES.AUTH.ME)
    return response.data.data
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email })
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post(API_ROUTES.AUTH.RESET_PASSWORD, { token, password })
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.get(`${API_ROUTES.AUTH.VERIFY_EMAIL}/${token}`)
  },
}
