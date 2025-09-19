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
    imageUrl: "https://www.google.com/imgres?q=iphone%2015%20promax%20256&imgurl=https%3A%2F%2Fbizweb.dktcdn.net%2Fthumb%2F1024x1024%2F100%2F388%2F159%2Fproducts%2Fc1d1b66d-4e3c-4e3b-9792-bc64026be4c2-jpeg.jpg%3Fv%3D1730438587440&imgrefurl=https%3A%2F%2Fdidong3a.vn%2Fiphone-15-pro-max-256gb-quoc-te-like-new%3Fsrsltid%3DAfmBOops1ABHVbR8AzlJJAqy2LCc0vml7_KmhSFudkrcBtCveP0ZgtLD&docid=cTgbhnRrhpCZRM&tbnid=Z_2CppnwJlJb-M&vet=12ahUKEwj8vJH_k-WPAxW-s1YBHRoZJCoQM3oECCAQAA..i&w=900&h=900&hcb=2&ved=2ahUKEwj8vJH_k-WPAxW-s1YBHRoZJCoQM3oECCAQAA",
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
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-pdp-image-position-1a_AV1?wid=750&hei=750&fmt=jpeg&qlt=95&.v=1693079054112",
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-pdp-image-position-2_AV1?wid=750&hei=750&fmt=jpeg&qlt=95&.v=1693079054127",
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-pdp-image-position-3_AV1?wid=750&hei=750&fmt=jpeg&qlt=95&.v=1693079054127",
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-pdp-image-position-4_AV1?wid=750&hei=750&fmt=jpeg&qlt=95&.v=1693079054143"
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobileworld.com.vn%2Fgalaxy-s24-ultra-256gb-moi-fullbox-viet-nam.html%3Fsrsltid%3DAfmBOoqPeWZg_KNkdiY9hDsxdAHumIYayS-JIFrpyb2cLmzppCmywFhe&psig=AOvVaw3Ds6MXJaXeYiN9nfz3IqM7&ust=1758382722275000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDQ-5-U5Y8DFQAAAAAdAAAAABAE",
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.apple.com%2Fvn%2Fshop%2Fbuy-mac%2Fmacbook-air&psig=AOvVaw3_VXDUEVPqqVSa37xrxfLY&ust=1758382758478000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMi527SU5Y8DFQAAAAAdAAAAABAL",
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Flaptop3mien.vn%2Fsan-pham%2Fdell-xps-13-plus-9320%2F&psig=AOvVaw1h-_gtaktBz0yux1zD_U53&ust=1758382795325000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNjausSU5Y8DFQAAAAAdAAAAABAE",
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fphuquangkts.vn%2Fproducts%2Ftai-nghe-sony-wh-1000xm5-wireless-noise-cancelling-silver%3Fsrsltid%3DAfmBOorS5h6VJEGhLdtZrz8Bzo4poN0U_-MZNEUs_-CSfO1QaImWLmRk&psig=AOvVaw2M6bMg8xz0wOggpSLefi-Y&ust=1758382825515000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi0qNCU5Y8DFQAAAAAdAAAAABAE",
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fttcenter.com.vn%2Fipad-pro-12-9-inch-m2-wifi-8gb-128gb-like-new%3Fsrsltid%3DAfmBOooBCIZFPArR1KuVtiVHrWNIJxAKhlnnthWxrZiN5Cq16lZWhiDK&psig=AOvVaw30-0luH-rFWZaXnxwj5wGd&ust=1758382849249000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPDV7tyU5Y8DFQAAAAAdAAAAABAf",
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmdriveasia.com%2Fproducts%2Fairpods-pro-2nd-generation-with-magsafe-case-usb-c&psig=AOvVaw2Dm3r044rJYZaDBosJLT8R&ust=1758382880253000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPCuy-yU5Y8DFQAAAAAdAAAAABAf",
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
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thegioididong.com%2Fdong-ho-thong-minh-samsung&psig=AOvVaw2TuPCv3rkTge6INFGeUtaV&ust=1758382928341000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKCv2oGV5Y8DFQAAAAAdAAAAABAL",
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