import { redirect } from 'next/navigation'

export default function HomePage() {
  // TODO: Kiểm tra xem user đã đăng nhập chưa
  // const isAuthenticated = checkAuthStatus()
  // const userRole = getUserRole()
  
  // Hiện tại, chuyển hướng user chưa xác thực đến trang đăng nhập
  // Sau này có thể thêm logic kiểm tra trạng thái xác thực
  const isAuthenticated = true ;
  
  if (!isAuthenticated) {
    redirect('/auth/sign-in')
  }
  
  // If authenticated, redirect based on role
  // For now, default to customer products
  redirect('/customer/products')
}
