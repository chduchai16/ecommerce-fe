import { ProductImage } from "./product-image"
import { ProductSpecification } from "./product-specification"

export interface Product{
    id: number
    name: string
    description?: string | null
    price: number
    original_price?: number | null
    discount?: number | null
    review_count?: number | null
    in_stock?: boolean
    tags?:string | null
    stock_quantity?: number
    category_name: string | null
    brand?: string | null
    color?: string | null
    average_rating?: number | null
    seller?: string | null 
    thumbnail?: string | null
    views?: number | null
    status?: number
    product_images?: ProductImage[]
    specifications?: ProductSpecification[]
}