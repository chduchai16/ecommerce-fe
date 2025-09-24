'use client'

import { User } from '@/library/models/user/user'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'

// Context interface
interface UserContextType {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  clearUser: () => void
  loadUser: () => void
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)

  const loadUser = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('user') || localStorage.getItem('userData')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUserState(parsedUser)
        } else {
          setUserState(null)
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
        setUserState(null)
      }
    }
  }, [])

  // mount lần đầu + listen storage
  useEffect(() => {
    loadUser()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'userData') {
        loadUser()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [loadUser])

  // Set user và sync localStorage
  const setUser = (userData: User | null) => {
    setUserState(userData)
    if (typeof window !== 'undefined') {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('userData')
      }
    }
  }

  // Clear user
  const clearUser = () => {
    setUser(null)
  }

  // Tính toán isAuthenticated dựa vào user
  const isAuthenticated = useMemo(() => !!user, [user])

  const value: UserContextType = {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    loadUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Custom hook
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
