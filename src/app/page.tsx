'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Nếu đang loading thì không làm gì
    // if (isLoading) return; 

    // Nếu chưa login → chuyển trang login
    // if (!isAuthenticated) {
    //   router.replace('/auth/sign-in');
    //   return;
    // }

    // const userRole = user?.role_name;

    // Nếu là admin → redirect admin
    // if (userRole === 'ADMIN') {
    //   router.replace('/admin');
    // } else {
    //   router.replace('/customer/products');
    // }
  }, [user, isAuthenticated, isLoading, router]);

  return null;
}
