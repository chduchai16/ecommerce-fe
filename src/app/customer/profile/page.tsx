'use client'

import UserProfile from '@/components/customer/user-profile/UserProfile'
import AuthGuard from '@/configs/auth-guard'

export default function ProfilePage() {
  return (
    <AuthGuard>
      <UserProfile />
    </AuthGuard>
  )
}