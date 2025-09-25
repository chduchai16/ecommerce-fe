'use client'

import ShoppingCart from '@/components/customer/shopping-cart/ShoppingCart'
import AuthGuard from '@/configs/auth-guard'

export default function CartPage() {
  return (
    <AuthGuard>
      <ShoppingCart />
    </AuthGuard>
  )
}