'use client'

import ShoppingCart from '@/components/customer/shopping-cart/ShoppingCart'
import AuthGuard from '@/configs/auth-guard'
import RoleGuard from '@/configs/role-guard'

export default function CartPage() {
  return (
    <AuthGuard>
      <RoleGuard roles={['customer']}>
        <ShoppingCart />
      </RoleGuard>
    </AuthGuard>
  )
}