import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { config } from '@/config'
import { authService, type User } from '@/api/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const token = localStorage.getItem(config.jwtStorageKey)
      if (!token) {
        setUser(null)
        return
      }
      const userData = await authService.getMe()
      setUser(userData)
      localStorage.setItem(config.userKey, JSON.stringify(userData))
    } catch {
      localStorage.removeItem(config.jwtStorageKey)
      localStorage.removeItem(config.refreshTokenKey)
      localStorage.removeItem(config.userKey)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem(config.userKey)
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch {
          localStorage.removeItem(config.userKey)
        }
      }
      await refreshUser()
      setIsLoading(false)
    }
    initAuth()
  }, [refreshUser])

  const login = async (email: string, password: string): Promise<User> => {
    const response = await authService.login({ email, password })
    localStorage.setItem(config.jwtStorageKey, response.access_token)
    localStorage.setItem(config.refreshTokenKey, response.refresh_token)
    localStorage.setItem(config.userKey, JSON.stringify(response.user))
    setUser(response.user)
    return response.user
  }

  const register = async (data: { name: string; email: string; password: string; role: string }): Promise<User> => {
    const response = await authService.register({ ...data, confirmPassword: data.password, agreeToTerms: true })
    localStorage.setItem(config.jwtStorageKey, response.access_token)
    localStorage.setItem(config.refreshTokenKey, response.refresh_token)
    localStorage.setItem(config.userKey, JSON.stringify(response.user))
    setUser(response.user)
    return response.user
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch {
      // Ignore errors on logout
    }
    localStorage.removeItem(config.jwtStorageKey)
    localStorage.removeItem(config.refreshTokenKey)
    localStorage.removeItem(config.userKey)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
