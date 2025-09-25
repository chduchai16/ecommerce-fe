import { Product } from "@/library/models/product/product"

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariant?: string
  addedAt: Date
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

export const categories = [
  "Tất cả",
  "Điện thoại", 
  "Laptop",
  "Tablet",
  "Phụ kiện"
]

export const brands = [
  "Tất cả",
  "Apple",
  "Samsung", 
  "Dell",
  "Sony"
]