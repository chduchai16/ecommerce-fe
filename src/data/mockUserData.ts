// Mock data cho user profiles, orders và wishlist

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  avatar?: string
  address: {
    street: string
    ward: string
    district: string
    city: string
    zipCode?: string
  }
  preferences: {
    newsletter: boolean
    promotions: boolean
    smsNotifications: boolean
  }
  memberSince: string
  totalOrders: number
  totalSpent: number
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  variant?: string
}

export interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  items: OrderItem[]
  totalAmount: number
  shippingFee: number
  discount: number
  finalAmount: number
  paymentMethod: 'cod' | 'credit_card' | 'bank_transfer' | 'e_wallet'
  paymentStatus: 'pending' | 'paid' | 'failed'
  shippingAddress: {
    fullName: string
    phone: string
    street: string
    ward: string
    district: string
    city: string
  }
  orderDate: string
  estimatedDelivery?: string
  deliveredDate?: string
  trackingNumber?: string
  notes?: string
}

export interface WishlistItem {
  id: string
  productId: string
  addedAt: string
}

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: 'user123',
  email: 'nguyenvana@gmail.com',
  firstName: 'Văn A',
  lastName: 'Nguyễn',
  phone: '0987654321',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  avatar: 'https://i.pravatar.cc/150?img=1',
  address: {
    street: '123 Nguyễn Văn Linh',
    ward: 'Phường Tân Thuận Tây',
    district: 'Quận 7',
    city: 'TP. Hồ Chí Minh',
    zipCode: '70000'
  },
  preferences: {
    newsletter: true,
    promotions: true,
    smsNotifications: false
  },
  memberSince: '2023-01-15',
  totalOrders: 12,
  totalSpent: 45670000
}

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order1',
    orderNumber: 'EX2024001',
    status: 'delivered',
    items: [
      {
        id: 'item1',
        productId: '1',
        productName: 'iPhone 15 Pro Max 256GB',
        productImage: 'https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg',
        price: 29990000,
        quantity: 1
      }
    ],
    totalAmount: 29990000,
    shippingFee: 0,
    discount: 0,
    finalAmount: 29990000,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0987654321',
      street: '123 Nguyễn Văn Linh',
      ward: 'Phường Tân Thuận Tây',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh'
    },
    orderDate: '2024-09-10T10:30:00Z',
    estimatedDelivery: '2024-09-15T18:00:00Z',
    deliveredDate: '2024-09-14T16:45:00Z',
    trackingNumber: 'EX123456789VN'
  },
  {
    id: 'order2', 
    orderNumber: 'EX2024002',
    status: 'shipping',
    items: [
      {
        id: 'item2',
        productId: '3',
        productName: 'MacBook Air M3 13 inch',
        productImage: 'https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg',
        price: 27990000,
        quantity: 1
      },
      {
        id: 'item3',
        productId: '7',
        productName: 'AirPods Pro 2nd Gen',
        productImage: 'https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg',
        price: 5990000,
        quantity: 1
      }
    ],
    totalAmount: 33980000,
    shippingFee: 50000,
    discount: 0,
    finalAmount: 34030000,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0987654321',
      street: '123 Nguyễn Văn Linh',
      ward: 'Phường Tân Thuận Tây',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh'
    },
    orderDate: '2024-09-18T14:20:00Z',
    estimatedDelivery: '2024-09-22T18:00:00Z',
    trackingNumber: 'EX987654321VN'
  },
  {
    id: 'order3',
    orderNumber: 'EX2024003', 
    status: 'pending',
    items: [
      {
        id: 'item4',
        productId: '5',
        productName: 'Sony WH-1000XM5',
        productImage: 'https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg',
        price: 7990000,
        quantity: 2
      }
    ],
    totalAmount: 15980000,
    shippingFee: 30000,
    discount: 500000,
    finalAmount: 15510000,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      phone: '0987654321',
      street: '123 Nguyễn Văn Linh',
      ward: 'Phường Tân Thuận Tây',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh'
    },
    orderDate: '2024-09-19T09:15:00Z',
    estimatedDelivery: '2024-09-24T18:00:00Z'
  }
]

// Mock Wishlist
export const wishlistItems: WishlistItem[] = [
  {
    id: 'wish1',
    productId: '2',
    addedAt: '2024-09-15T12:00:00Z'
  },
  {
    id: 'wish2', 
    productId: '4',
    addedAt: '2024-09-10T16:30:00Z'
  },
  {
    id: 'wish3',
    productId: '6',
    addedAt: '2024-09-08T20:15:00Z'
  },
  {
    id: 'wish4',
    productId: '8',
    addedAt: '2024-09-05T11:45:00Z'
  }
]

// Helper functions
export const getOrderStatusText = (status: Order['status']) => {
  const statusMap = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    shipping: 'Đang giao hàng',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy'
  }
  return statusMap[status]
}

export const getOrderStatusColor = (status: Order['status']) => {
  const colorMap = {
    pending: 'orange',
    confirmed: 'blue', 
    shipping: 'purple',
    delivered: 'green',
    cancelled: 'red'
  }
  return colorMap[status]
}

export const getPaymentMethodText = (method: Order['paymentMethod']) => {
  const methodMap = {
    cod: 'Thanh toán khi nhận hàng',
    credit_card: 'Thẻ tín dụng',
    bank_transfer: 'Chuyển khoản ngân hàng',
    e_wallet: 'Ví điện tử'
  }
  return methodMap[method]
}