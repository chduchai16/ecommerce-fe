export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  imageUrl: string
  category: string
  brand: string
  inStock: boolean
  tags: string[]
  seller: {
    id: string
    name: string
    rating: number
  }
  specifications?: Record<string, string>
  images?: string[]
}

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

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    description: "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ và camera 48MP tiên tiến",
    price: 29990000,
    originalPrice: 32990000,
    discount: 9,
    rating: 4.8,
    reviewCount: 1250,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Điện thoại",
    brand: "Apple",
    inStock: true,
    tags: ["hot", "flagship"],
    seller: {
      id: "seller1",
      name: "CellphoneS",
      rating: 4.9
    },
    specifications: {
      "Màn hình": "6.7 inch Super Retina XDR OLED",
      "Chip": "A17 Pro",
      "RAM": "8GB",
      "Bộ nhớ": "256GB",
      "Camera chính": "48MP f/1.78",
      "Camera phụ": "12MP Ultra Wide, 12MP Telephoto",
      "Pin": "4422 mAh",
      "Hệ điều hành": "iOS 17",
      "Kết nối": "5G, WiFi 6E, Bluetooth 5.3",
      "Chất liệu": "Titanium"
    },
    images: [
      "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
      "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
      "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
      "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg"
    ]
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24 Ultra",
    description: "Galaxy S24 Ultra với S Pen và camera 200MP chất lượng cao",
    price: 26990000,
    originalPrice: 29990000,
    discount: 10,
    rating: 4.7,
    reviewCount: 890,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Điện thoại",
    brand: "Samsung",
    inStock: true,
    tags: ["new", "flagship"],
    seller: {
      id: "seller2",
      name: "Thế Giới Di Động",
      rating: 4.8
    }
  },
  {
    id: "3",
    name: "MacBook Air M3 13 inch",
    description: "MacBook Air với chip M3 mới nhất, hiệu năng vượt trội",
    price: 27990000,
    rating: 4.9,
    reviewCount: 456,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Laptop",
    brand: "Apple",
    inStock: true,
    tags: ["bestseller"],
    seller: {
      id: "seller1",
      name: "CellphoneS", 
      rating: 4.9
    }
  },
  {
    id: "4",
    name: "Dell XPS 13 Plus",
    description: "Laptop Dell XPS 13 Plus thiết kế cao cấp, hiệu năng mạnh mẽ",
    price: 35990000,
    rating: 4.6,
    reviewCount: 234,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Laptop",
    brand: "Dell",
    inStock: false,
    tags: ["premium"],
    seller: {
      id: "seller3",
      name: "FPT Shop",
      rating: 4.7
    }
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    description: "Tai nghe chống ồn hàng đầu từ Sony",
    price: 7990000,
    originalPrice: 8990000,
    discount: 11,
    rating: 4.8,
    reviewCount: 567,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Phụ kiện",
    brand: "Sony",
    inStock: true,
    tags: ["bestseller"],
    seller: {
      id: "seller2",
      name: "Thế Giới Di Động",
      rating: 4.8
    }
  },
  {
    id: "6",
    name: "iPad Pro 12.9 inch M2",
    description: "iPad Pro với chip M2, màn hình Liquid Retina XDR",
    price: 25990000,
    rating: 4.7,
    reviewCount: 345,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Tablet",
    brand: "Apple",
    inStock: true,
    tags: ["new"],
    seller: {
      id: "seller1",
      name: "CellphoneS",
      rating: 4.9
    }
  },
  {
    id: "7",
    name: "AirPods Pro 2nd Gen",
    description: "AirPods Pro thế hệ 2 với chống ồn chủ động",
    price: 5990000,
    rating: 4.6,
    reviewCount: 789,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Phụ kiện",
    brand: "Apple", 
    inStock: true,
    tags: ["hot"],
    seller: {
      id: "seller1",
      name: "CellphoneS",
      rating: 4.9
    }
  },
  {
    id: "8",
    name: "Samsung Galaxy Watch 6",
    description: "Đồng hồ thông minh Samsung Galaxy Watch 6 theo dõi sức khỏe",
    price: 6990000,
    originalPrice: 7490000,
    discount: 7,
    rating: 4.5,
    reviewCount: 123,
    imageUrl: "https://clickbuy.com.vn/uploads/product-variant/iphone-15-pro-max-cu-natural-197422-4091.jpg",
    category: "Phụ kiện",
    brand: "Samsung",
    inStock: true,
    tags: ["new"],
    seller: {
      id: "seller2", 
      name: "Thế Giới Di Động",
      rating: 4.8
    }
  }
]

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