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
    imageUrl: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2023/09/15/iphone-15-pro-max-natural-titanium-1-650x650.png",
    category: "Điện thoại",
    brand: "Apple",
    inStock: true,
    tags: ["hot", "flagship"],
    seller: {
      id: "seller1",
      name: "CellphoneS",
      rating: 4.9
    }
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
    imageUrl: "https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumbnew-600x600.jpg",
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
    imageUrl: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2024/03/07/macbook-air-13-inch-m3-starlight-1-650x650.png",
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
    imageUrl: "https://laptop88.vn/media/product/9730_dell_xps_13_9320_silver_1.jpg",
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
    imageUrl: "https://cdn.tgdd.vn/Products/Images/54/289779/tai-nghe-chup-tai-bluetooth-sony-wh-1000xm5-den-1-600x600.jpg",
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
    imageUrl: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/10/18/ipad-pro-12-9-inch-m2-wifi-space-gray-1-650x650.png",
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
    imageUrl: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/airpods-pro-2nd-generation-1-650x650.png",
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
    imageUrl: "https://cdn.tgdd.vn/Products/Images/7077/309942/samsung-galaxy-watch-6-40mm-day-cao-su-xanh-1-600x600.jpg",
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