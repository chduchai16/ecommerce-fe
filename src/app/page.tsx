'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import type { User } from '@/library/models/user/user'

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/sign-in')
      return
    }

    const userRole = (user as User | null)?.role_name

    if (userRole === 'ADMIN') {
      router.replace('/admin')
    } else if (userRole === 'CUSTOMER' || userRole === 'SELLER') {
      router.replace('/customer/products')
    } else {
      router.replace('/auth/sign-in')
    }
  }, [user, isAuthenticated, router])

  return null
}
