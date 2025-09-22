import { SignUpForm } from '@/components/auth'
import { redirect } from 'next/navigation'

export default function SignUpPage() {
  const handleSignUp = async (userData: {
    name: string
    email: string
    password: string
    role?: string
  }) => {
    'use server'

    try {
      // TODO: Implement registration logic here
      console.log('Registration attempt:', userData)

      // Simulate API call
      // const response = await authService.register(userData)

      // On success, redirect based on user role
      if (userData.role === 'seller') {
        redirect('/seller')
      } else if (userData.role === 'admin') {
        redirect('/admin')
      } else {
        // Default to customer
        redirect('/customer/products')
      }

    } catch (error) {
      console.error('Registration failed:', error)
      // Handle error (show toast, etc.)
      throw error
    }
  }

  return <SignUpForm onSubmit={handleSignUp} />
}