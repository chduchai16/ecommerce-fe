// import type { CartItem } from '@/data/mockProducts'

// // Mock cart items data
// export const mockCartItems: CartItem[] = [
//     {
//         id: 'cart-item-1',
//         productId: '1',
//         product: mockProducts[0], // iPhone 15 Pro Max
//         quantity: 1,
//         addedAt: new Date('2024-01-15T10:30:00'),
//         selectedVariant: 'Titan Tự Nhiên - 256GB'
//     },
//     {
//         id: 'cart-item-2',
//         productId: '3',
//         product: mockProducts[2], // MacBook Pro M3
//         quantity: 1,
//         addedAt: new Date('2024-01-16T14:20:00'),
//         selectedVariant: 'Xám Không Gian - 512GB'
//     },
//     {
//         id: 'cart-item-3',
//         productId: '5',
//         product: mockProducts[4], // AirPods Pro
//         quantity: 2,
//         addedAt: new Date('2024-01-17T09:15:00'),
//         selectedVariant: 'Trắng'
//     }
// ]

// // Mock cart state
// export const mockCartState = {
//     items: mockCartItems,
//     totalItems: mockCartItems.reduce((sum, item) => sum + item.quantity, 0),
//     totalAmount: mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
// }

// // Helper functions for mock cart
// export const getMockCartItem = (productId: string) => {
//     return mockCartItems.find(item => item.productId === productId)
// }

// export const isInMockCart = (productId: string) => {
//     return mockCartItems.some(item => item.productId === productId)
// }

// export const getMockCartCount = () => {
//     return mockCartItems.reduce((sum, item) => sum + item.quantity, 0)
// }

// export const getMockCartTotal = () => {
//     return mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
// }