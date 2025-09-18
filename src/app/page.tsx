import { redirect } from 'next/navigation'

export default function HomePage() {
  // TODO: Check if user is authenticated
  // const isAuthenticated = checkAuthStatus()
  // const userRole = getUserRole()
  
  // For now, redirect unauthenticated users to sign-in
  // Later you can add logic to check auth status
  const isAuthenticated = true ;
  
  if (!isAuthenticated) {
    redirect('/auth/sign-in')
  }
  
  // If authenticated, redirect based on role
  // For now, default to customer products
  redirect('/customer/products')
}
