import axios from 'axios'
import { config } from '@/config'

const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

apiClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem(config.jwtStorageKey)
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem(config.refreshTokenKey)

      if (refreshToken && !originalRequest.url?.includes('/auth/')) {
        try {
          const { data } = await axios.post(`${config.apiUrl}/auth/refresh`, {
            refresh_token: refreshToken,
          })
          const accessToken = data.access_token ?? data.data?.access_token
          localStorage.setItem(config.jwtStorageKey, accessToken)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return apiClient(originalRequest)
        } catch {
          localStorage.removeItem(config.jwtStorageKey)
          localStorage.removeItem(config.refreshTokenKey)
          localStorage.removeItem(config.userKey)
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
        }
      } else if (!originalRequest.url?.includes('/auth/')) {
        localStorage.removeItem(config.jwtStorageKey)
        localStorage.removeItem(config.refreshTokenKey)
        localStorage.removeItem(config.userKey)
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
