'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return; 

    if (!isAuthenticated) {
      router.replace('/auth/sign-in');
      return;
    }

    const userRole = user?.role_name;

    if (userRole === 'ADMIN') {
      router.replace('/admin');
    } else {
      router.replace('/customer/products');
    }
  }, [user, isAuthenticated, isLoading, router]);

  return null;
}
