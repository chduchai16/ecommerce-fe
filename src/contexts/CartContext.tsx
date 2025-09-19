'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { CartItem, CartState, Product } from '@/data/mockProducts'

// Actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
}

// Helper functions
const calculateTotals = (items: CartItem[]): Pick<CartState, 'totalItems' | 'totalAmount'> => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  
  return { totalItems, totalAmount }
}

const generateCartItemId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload
      
      // Check if product already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id)
      
      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          id: generateCartItemId(),
          productId: product.id,
          product,
          quantity,
          addedAt: new Date()
        }
        newItems = [...state.items, newItem]
      }
      
      const totals = calculateTotals(newItems)
      
      return {
        items: newItems,
        ...totals
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId)
      const totals = calculateTotals(newItems)
      
      return {
        items: newItems,
        ...totals
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { itemId } })
      }
      
      const newItems = state.items.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
      
      const totals = calculateTotals(newItems)
      
      return {
        items: newItems,
        ...totals
      }
    }
    
    case 'CLEAR_CART': {
      return initialState
    }
    
    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload)
      
      return {
        items: action.payload,
        ...totals
      }
    }
    
    default:
      return state
  }
}

// Context
interface CartContextType {
  state: CartState
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartItem: (productId: string) => CartItem | undefined
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider
interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
  }
  
  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } })
  }
  
  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const getCartItem = (productId: string) => {
    return state.items.find(item => item.productId === productId)
  }
  
  const isInCart = (productId: string) => {
    return state.items.some(item => item.productId === productId)
  }
  
  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
    isInCart
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Hook
export function useCart() {
  const context = useContext(CartContext)
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  
  return context
}