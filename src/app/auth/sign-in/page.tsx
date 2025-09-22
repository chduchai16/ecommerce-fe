import { SignInForm } from '@/components/auth'
import { redirect } from 'next/navigation'

export default function SignInPage() {
  const handleSignIn = async (email: string, password: string) => {
    'use server'

    try {
      // TODO: Implement authentication logic here
      console.log('Login attempt:', { email, password })

      // Simulate API call
      // const response = await authService.login(email, password)

      // On success, redirect based on user role
      // For now, redirect to customer products
      redirect('/customer/products')

    } catch (error) {
      console.error('Login failed:', error)
      // Handle error (show toast, etc.)
      throw error
    }
  }

  return <SignInForm />
}