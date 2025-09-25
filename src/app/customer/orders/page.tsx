'use client'

import UserOrders from '@/components/customer/user-orders/UserOrders'
import AuthGuard from '@/configs/auth-guard'

export default function OrdersPage() {
  return ( 
    <AuthGuard>
      <UserOrders />
    </AuthGuard>
  )
}