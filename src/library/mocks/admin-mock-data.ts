// Mock data cho admin dashboard

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  status: number
  imageUrl?: string
  description?: string
  rating?: number
  views?: number
}

export interface OrderItem {
  id: number
  productName: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  totalAmount: number
  status: number
  statusText: string
  shippingAddress: string
  createdAt: string
  items: number
  orderItems?: OrderItem[]
  paymentMethod?: string
  shippingFee?: number
  discount?: number
  note?: string
}

export interface User {
  id: number
  name: string
  email: string
  phoneNumber?: string
  address?: string
  status: number
  role: string
  createdAt: string
}

export interface Category {
  id: number
  name: string
  description?: string
  productCount: number
  status: number
}

export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  recentOrders: Order[]
}

// Mock Products - Expanded to 50 items
export const mockProducts: Product[] = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 29990000, stock: 45, category: 'Điện thoại', status: 1, rating: 4.8, views: 1250 },
  { id: 2, name: 'MacBook Pro 14" M3', price: 52990000, stock: 12, category: 'Laptop', status: 1, rating: 4.9, views: 890 },
  { id: 3, name: 'AirPods Pro 2', price: 6490000, stock: 0, category: 'Tai nghe', status: 0, rating: 4.7, views: 560 },
  { id: 4, name: 'iPad Air M2', price: 16990000, stock: 28, category: 'Tablet', status: 1, rating: 4.6, views: 720 },
  { id: 5, name: 'Apple Watch Series 9', price: 10990000, stock: 35, category: 'Đồng hồ', status: 1, rating: 4.8, views: 450 },
  { id: 6, name: 'Samsung Galaxy S24 Ultra', price: 27990000, stock: 32, category: 'Điện thoại', status: 1, rating: 4.7, views: 980 },
  { id: 7, name: 'Dell XPS 15', price: 42990000, stock: 18, category: 'Laptop', status: 1, rating: 4.6, views: 650 },
  { id: 8, name: 'Sony WH-1000XM5', price: 8990000, stock: 25, category: 'Tai nghe', status: 1, rating: 4.8, views: 720 },
  { id: 9, name: 'Samsung Galaxy Tab S9', price: 18990000, stock: 15, category: 'Tablet', status: 1, rating: 4.5, views: 430 },
  { id: 10, name: 'Garmin Fenix 7', price: 15990000, stock: 8, category: 'Đồng hồ', status: 1, rating: 4.7, views: 310 },
  { id: 11, name: 'Xiaomi 14 Pro', price: 19990000, stock: 40, category: 'Điện thoại', status: 1, rating: 4.6, views: 850 },
  { id: 12, name: 'HP Spectre x360', price: 38990000, stock: 10, category: 'Laptop', status: 1, rating: 4.5, views: 480 },
  { id: 13, name: 'Bose QuietComfort 45', price: 7490000, stock: 30, category: 'Tai nghe', status: 1, rating: 4.6, views: 590 },
  { id: 14, name: 'Lenovo Tab P12', price: 12990000, stock: 20, category: 'Tablet', status: 1, rating: 4.4, views: 380 },
  { id: 15, name: 'Fitbit Sense 2', price: 7990000, stock: 45, category: 'Đồng hồ', status: 1, rating: 4.3, views: 520 },
  { id: 16, name: 'OPPO Find X6 Pro', price: 22990000, stock: 28, category: 'Điện thoại', status: 1, rating: 4.5, views: 670 },
  { id: 17, name: 'ASUS ROG Zephyrus G14', price: 45990000, stock: 6, category: 'Laptop', status: 1, rating: 4.8, views: 920 },
  { id: 18, name: 'JBL Live 660NC', price: 4990000, stock: 0, category: 'Tai nghe', status: 0, rating: 4.4, views: 340 },
  { id: 19, name: 'Microsoft Surface Pro 9', price: 28990000, stock: 12, category: 'Tablet', status: 1, rating: 4.6, views: 560 },
  { id: 20, name: 'Huawei Watch GT 4', price: 6990000, stock: 35, category: 'Đồng hồ', status: 1, rating: 4.5, views: 410 },
  { id: 21, name: 'Google Pixel 8 Pro', price: 24990000, stock: 22, category: 'Điện thoại', status: 1, rating: 4.7, views: 780 },
  { id: 22, name: 'Acer Swift 3', price: 18990000, stock: 25, category: 'Laptop', status: 1, rating: 4.3, views: 420 },
  { id: 23, name: 'Sennheiser Momentum 4', price: 9990000, stock: 15, category: 'Tai nghe', status: 1, rating: 4.8, views: 690 },
  { id: 24, name: 'Xiaomi Pad 6', price: 9990000, stock: 30, category: 'Tablet', status: 1, rating: 4.4, views: 450 },
  { id: 25, name: 'Samsung Galaxy Watch 6', price: 8990000, stock: 40, category: 'Đồng hồ', status: 1, rating: 4.6, views: 530 },
  { id: 26, name: 'Realme GT Neo 5', price: 13990000, stock: 35, category: 'Điện thoại', status: 1, rating: 4.4, views: 620 },
  { id: 27, name: 'MSI Prestige 14', price: 32990000, stock: 8, category: 'Laptop', status: 1, rating: 4.5, views: 480 },
  { id: 28, name: 'Anker Soundcore Q30', price: 2490000, stock: 50, category: 'Tai nghe', status: 1, rating: 4.3, views: 380 },
  { id: 29, name: 'Honor Pad 8', price: 6990000, stock: 25, category: 'Tablet', status: 1, rating: 4.2, views: 290 },
  { id: 30, name: 'Amazfit GTR 4', price: 5990000, stock: 42, category: 'Đồng hồ', status: 1, rating: 4.4, views: 470 },
  { id: 31, name: 'OnePlus 12', price: 21990000, stock: 18, category: 'Điện thoại', status: 1, rating: 4.6, views: 710 },
  { id: 32, name: 'LG Gram 17', price: 39990000, stock: 5, category: 'Laptop', status: 1, rating: 4.6, views: 550 },
  { id: 33, name: 'Beats Studio Pro', price: 8490000, stock: 20, category: 'Tai nghe', status: 1, rating: 4.5, views: 610 },
  { id: 34, name: 'Amazon Fire HD 10', price: 4990000, stock: 40, category: 'Tablet', status: 1, rating: 4.1, views: 320 },
  { id: 35, name: 'Fossil Gen 6', price: 7490000, stock: 28, category: 'Đồng hồ', status: 1, rating: 4.3, views: 390 },
  { id: 36, name: 'Vivo X100 Pro', price: 26990000, stock: 15, category: 'Điện thoại', status: 1, rating: 4.7, views: 830 },
  { id: 37, name: 'Razer Blade 15', price: 58990000, stock: 3, category: 'Laptop', status: 1, rating: 4.8, views: 950 },
  { id: 38, name: 'Audio-Technica ATH-M50x', price: 4490000, stock: 35, category: 'Tai nghe', status: 1, rating: 4.7, views: 580 },
  { id: 39, name: 'Nokia T21', price: 5990000, stock: 30, category: 'Tablet', status: 1, rating: 4.2, views: 270 },
  { id: 40, name: 'TicWatch Pro 5', price: 9990000, stock: 12, category: 'Đồng hồ', status: 1, rating: 4.5, views: 440 },
  { id: 41, name: 'Nothing Phone 2', price: 15990000, stock: 25, category: 'Điện thoại', status: 1, rating: 4.5, views: 690 },
  { id: 42, name: 'Gigabyte Aero 16', price: 47990000, stock: 7, category: 'Laptop', status: 1, rating: 4.7, views: 620 },
  { id: 43, name: 'Jabra Elite 85h', price: 6990000, stock: 22, category: 'Tai nghe', status: 1, rating: 4.6, views: 520 },
  { id: 44, name: 'TCL Tab 10', price: 3990000, stock: 45, category: 'Tablet', status: 1, rating: 4.0, views: 240 },
  { id: 45, name: 'Polar Vantage V3', price: 12990000, stock: 10, category: 'Đồng hồ', status: 1, rating: 4.6, views: 360 },
  { id: 46, name: 'Asus Zenfone 10', price: 17990000, stock: 20, category: 'Điện thoại', status: 1, rating: 4.5, views: 580 },
  { id: 47, name: 'Lenovo ThinkPad X1', price: 44990000, stock: 8, category: 'Laptop', status: 1, rating: 4.7, views: 670 },
  { id: 48, name: 'Edifier W820NB', price: 1990000, stock: 60, category: 'Tai nghe', status: 1, rating: 4.2, views: 310 },
  { id: 49, name: 'Huawei MatePad Pro', price: 19990000, stock: 12, category: 'Tablet', status: 1, rating: 4.5, views: 490 },
  { id: 50, name: 'Suunto 9 Peak Pro', price: 14990000, stock: 6, category: 'Đồng hồ', status: 1, rating: 4.7, views: 380 }
]

// Mock Orders - Expanded to 30 items
export const mockOrders: Order[] = [
  {
      id: 1001, customerName: 'Nguyễn Văn A', totalAmount: 29990000, status: 2, statusText: 'Đang giao', shippingAddress: '123 Nguyễn Huệ, Q.1, TP.HCM', createdAt: '2024-12-05T10:30:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1002, customerName: 'Trần Thị B', totalAmount: 59480000, status: 1, statusText: 'Đang xử lý', shippingAddress: '456 Lê Lợi, Q.3, TP.HCM', createdAt: '2024-12-05T09:15:00', items: 2,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1003, customerName: 'Lê Văn C', totalAmount: 16990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '789 Trần Hưng Đạo, Q.5, TP.HCM', createdAt: '2024-12-04T14:20:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1004, customerName: 'Phạm Thị D', totalAmount: 6490000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '321 Võ Văn Tần, Q.10, TP.HCM', createdAt: '2024-12-05T11:45:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1005, customerName: 'Hoàng Văn E', totalAmount: 10990000, status: 2, statusText: 'Đang giao', shippingAddress: '654 Pasteur, Q.1, TP.HCM', createdAt: '2024-12-05T08:30:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1006, customerName: 'Võ Thị F', totalAmount: 42990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '111 Hai Bà Trưng, Q.1, TP.HCM', createdAt: '2024-12-04T16:20:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1007, customerName: 'Đặng Văn G', totalAmount: 18990000, status: 1, statusText: 'Đang xử lý', shippingAddress: '222 Điện Biên Phủ, Q.3, TP.HCM', createdAt: '2024-12-05T07:00:00', items: 2,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1008, customerName: 'Bùi Thị H', totalAmount: 24990000, status: 2, statusText: 'Đang giao', shippingAddress: '333 Lý Thường Kiệt, Q.10, TP.HCM', createdAt: '2024-12-05T13:15:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1009, customerName: 'Mai Văn I', totalAmount: 52990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '444 Cách Mạng Tháng 8, Q.3, TP.HCM', createdAt: '2024-12-03T10:30:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1010, customerName: 'Dương Thị K', totalAmount: 8990000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '555 Ba Tháng Hai, Q.10, TP.HCM', createdAt: '2024-12-05T14:45:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1011, customerName: 'Phan Văn L', totalAmount: 15990000, status: 1, statusText: 'Đang xử lý', shippingAddress: '666 Nguyễn Văn Cừ, Q.5, TP.HCM', createdAt: '2024-12-05T06:20:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1012, customerName: 'Cao Thị M', totalAmount: 27990000, status: 2, statusText: 'Đang giao', shippingAddress: '777 Trường Chinh, Q.12, TP.HCM', createdAt: '2024-12-05T11:00:00', items: 2,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1013, customerName: 'Tô Văn N', totalAmount: 19990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '888 Phạm Văn Đồng, Q.Thủ Đức, TP.HCM', createdAt: '2024-12-03T15:30:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1014, customerName: 'Lý Thị O', totalAmount: 9990000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '999 Quang Trung, Q.Gò Vấp, TP.HCM', createdAt: '2024-12-05T15:20:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1015, customerName: 'Trịnh Văn P', totalAmount: 38990000, status: 1, statusText: 'Đang xử lý', shippingAddress: '100 Nguyễn Thị Minh Khai, Q.1, TP.HCM', createdAt: '2024-12-05T09:45:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1016, customerName: 'Hồ Thị Q', totalAmount: 22990000, status: 2, statusText: 'Đang giao', shippingAddress: '200 Võ Thị Sáu, Q.3, TP.HCM', createdAt: '2024-12-05T12:10:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1017, customerName: 'Đinh Văn R', totalAmount: 45990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '300 Nguyễn Đình Chiểu, Q.1, TP.HCM', createdAt: '2024-12-02T14:00:00', items: 2,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1018, customerName: 'Thái Thị S', totalAmount: 12990000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '400 Lê Văn Sỹ, Q.3, TP.HCM', createdAt: '2024-12-05T16:30:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1019, customerName: 'Vũ Văn T', totalAmount: 28990000, status: 1, statusText: 'Đang xử lý', shippingAddress: '500 Phan Đăng Lưu, Q.Phú Nhuận, TP.HCM', createdAt: '2024-12-05T08:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1020, customerName: 'An Thị U', totalAmount: 16990000, status: 2, statusText: 'Đang giao', shippingAddress: '600 Hoàng Văn Thụ, Q.Tân Bình, TP.HCM', createdAt: '2024-12-05T10:45:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1021, customerName: 'Chu Văn V', totalAmount: 32990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '700 CMT8, Q.10, TP.HCM', createdAt: '2024-12-02T11:20:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1022, customerName: 'Đoàn Thị W', totalAmount: 7490000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '800 Xô Viết Nghệ Tĩnh, Q.Bình Thạnh, TP.HCM', createdAt: '2024-12-05T17:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1023, customerName: 'Từ Văn X', totalAmount: 21990000, status: 1, statusText: 'Đang xử lý', shippingAddress: '900 Nguyễn Kiệm, Q.Phú Nhuận, TP.HCM', createdAt: '2024-12-05T07:30:00', items: 2,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1024, customerName: 'Khuất Thị Y', totalAmount: 14990000, status: 2, statusText: 'Đang giao', shippingAddress: '101 Lê Quang Định, Q.Bình Thạnh, TP.HCM', createdAt: '2024-12-05T13:45:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1025, customerName: 'Ông Văn Z', totalAmount: 58990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '202 Nguyễn Văn Trỗi, Q.Phú Nhuận, TP.HCM', createdAt: '2024-12-01T09:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1026, customerName: 'Nghiêm Thị AA', totalAmount: 26990000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '303 Hoàng Hoa Thám, Q.Tân Bình, TP.HCM', createdAt: '2024-12-05T18:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1027, customerName: 'Ứng Văn BB', totalAmount: 17990000, status: 1, statusText: 'Đang xử lý', shippingAddress: '404 Âu Cơ, Q.Tân Phú, TP.HCM', createdAt: '2024-12-05T06:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1028, customerName: 'Quyền Thị CC', totalAmount: 44990000, status: 2, statusText: 'Đang giao', shippingAddress: '505 Lạc Long Quân, Q.11, TP.HCM', createdAt: '2024-12-05T12:30:00', items: 2,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1029, customerName: 'Yên Văn DD', totalAmount: 19990000, status: 3, statusText: 'Hoàn thành', shippingAddress: '606 Tân Sơn Nhì, Q.Tân Phú, TP.HCM', createdAt: '2024-12-01T16:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  },
  {
      id: 1030, customerName: 'Xa Thị EE', totalAmount: 9990000, status: 0, statusText: 'Chờ xác nhận', shippingAddress: '707 Lũy Bán Bích, Q.Tân Phú, TP.HCM', createdAt: '2024-12-05T19:00:00', items: 1,
      customerEmail: "",
      customerPhone: ""
  }
]

// Mock Users - Expanded to 25 items
export const mockUsers: User[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phoneNumber: '0901234567', address: '123 Nguyễn Huệ, Q.1, TP.HCM', status: 1, role: 'customer', createdAt: '2024-01-15T10:00:00' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@gmail.com', phoneNumber: '0907654321', address: '456 Lê Lợi, Q.3, TP.HCM', status: 1, role: 'customer', createdAt: '2024-02-20T14:30:00' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@gmail.com', phoneNumber: '0912345678', address: '789 Trần Hưng Đạo, Q.5, TP.HCM', status: 1, role: 'customer', createdAt: '2024-03-10T09:15:00' },
  { id: 4, name: 'Admin User', email: 'admin@exona.com', phoneNumber: '0909999999', address: 'Admin Office', status: 1, role: 'admin', createdAt: '2023-12-01T08:00:00' },
  { id: 5, name: 'Phạm Thị D', email: 'phamthid@gmail.com', phoneNumber: '0918765432', address: '321 Võ Văn Tần, Q.10, TP.HCM', status: 0, role: 'customer', createdAt: '2024-04-05T16:20:00' },
  { id: 6, name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phoneNumber: '0903456789', address: '111 Pasteur, Q.1, TP.HCM', status: 1, role: 'customer', createdAt: '2024-05-12T11:20:00' },
  { id: 7, name: 'Võ Thị F', email: 'vothif@gmail.com', phoneNumber: '0905678901', address: '222 Hai Bà Trưng, Q.1, TP.HCM', status: 1, role: 'customer', createdAt: '2024-06-08T15:40:00' },
  { id: 8, name: 'Đặng Văn G', email: 'dangvang@gmail.com', phoneNumber: '0908901234', address: '333 Điện Biên Phủ, Q.3, TP.HCM', status: 1, role: 'customer', createdAt: '2024-07-14T09:00:00' },
  { id: 9, name: 'Bùi Thị H', email: 'buithih@gmail.com', phoneNumber: '0911234567', address: '444 Lý Thường Kiệt, Q.10, TP.HCM', status: 1, role: 'customer', createdAt: '2024-08-20T13:30:00' },
  { id: 10, name: 'Mai Văn I', email: 'maivani@gmail.com', phoneNumber: '0914567890', address: '555 Cách Mạng Tháng 8, Q.3, TP.HCM', status: 0, role: 'customer', createdAt: '2024-09-05T10:15:00' },
  { id: 11, name: 'Dương Thị K', email: 'duongthik@gmail.com', phoneNumber: '0917890123', address: '666 Ba Tháng Hai, Q.10, TP.HCM', status: 1, role: 'customer', createdAt: '2024-10-11T14:45:00' },
  { id: 12, name: 'Phan Văn L', email: 'phanvanl@gmail.com', phoneNumber: '0920123456', address: '777 Nguyễn Văn Cừ, Q.5, TP.HCM', status: 1, role: 'customer', createdAt: '2024-11-01T08:20:00' },
  { id: 13, name: 'Cao Thị M', email: 'caothim@gmail.com', phoneNumber: '0923456789', address: '888 Trường Chinh, Q.12, TP.HCM', status: 1, role: 'customer', createdAt: '2024-11-15T12:00:00' },
  { id: 14, name: 'Tô Văn N', email: 'tovann@gmail.com', phoneNumber: '0926789012', address: '999 Phạm Văn Đồng, Q.Thủ Đức, TP.HCM', status: 0, role: 'customer', createdAt: '2024-11-22T16:30:00' },
  { id: 15, name: 'Lý Thị O', email: 'lythio@gmail.com', phoneNumber: '0929012345', address: '100 Quang Trung, Q.Gò Vấp, TP.HCM', status: 1, role: 'customer', createdAt: '2024-11-28T09:45:00' },
  { id: 16, name: 'Trịnh Văn P', email: 'trinhvanp@gmail.com', phoneNumber: '0932345678', address: '200 Nguyễn Thị Minh Khai, Q.1, TP.HCM', status: 1, role: 'customer', createdAt: '2024-12-01T11:00:00' },
  { id: 17, name: 'Hồ Thị Q', email: 'hothiq@gmail.com', phoneNumber: '0935678901', address: '300 Võ Thị Sáu, Q.3, TP.HCM', status: 1, role: 'customer', createdAt: '2024-12-02T13:20:00' },
  { id: 18, name: 'Đinh Văn R', email: 'dinhvanr@gmail.com', phoneNumber: '0938901234', address: '400 Nguyễn Đình Chiểu, Q.1, TP.HCM', status: 1, role: 'seller', createdAt: '2024-03-18T10:30:00' },
  { id: 19, name: 'Thái Thị S', email: 'thaithis@gmail.com', phoneNumber: '0941234567', address: '500 Lê Văn Sỹ, Q.3, TP.HCM', status: 0, role: 'customer', createdAt: '2024-12-03T14:50:00' },
  { id: 20, name: 'Vũ Văn T', email: 'vuvant@gmail.com', phoneNumber: '0944567890', address: '600 Phan Đăng Lưu, Q.Phú Nhuận, TP.HCM', status: 1, role: 'customer', createdAt: '2024-12-04T08:00:00' },
  { id: 21, name: 'An Thị U', email: 'anthiu@gmail.com', phoneNumber: '0947890123', address: '700 Hoàng Văn Thụ, Q.Tân Bình, TP.HCM', status: 1, role: 'customer', createdAt: '2024-04-25T12:15:00' },
  { id: 22, name: 'Chu Văn V', email: 'chuvanv@gmail.com', phoneNumber: '0950123456', address: '800 CMT8, Q.10, TP.HCM', status: 1, role: 'seller', createdAt: '2024-05-30T15:40:00' },
  { id: 23, name: 'Đoàn Thị W', email: 'doanthiw@gmail.com', phoneNumber: '0953456789', address: '900 Xô Viết Nghệ Tĩnh, Q.Bình Thạnh, TP.HCM', status: 0, role: 'customer', createdAt: '2024-12-05T09:30:00' },
  { id: 24, name: 'Từ Văn X', email: 'tuvanx@gmail.com', phoneNumber: '0956789012', address: '101 Nguyễn Kiệm, Q.Phú Nhuận, TP.HCM', status: 1, role: 'customer', createdAt: '2024-07-22T11:20:00' },
  { id: 25, name: 'Khuất Thị Y', email: 'khuatthiy@gmail.com', phoneNumber: '0959012345', address: '202 Lê Quang Định, Q.Bình Thạnh, TP.HCM', status: 1, role: 'customer', createdAt: '2024-08-16T14:00:00' }
]

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Điện thoại',
    description: 'Các loại điện thoại thông minh',
    productCount: 45,
    status: 1
  },
  {
    id: 2,
    name: 'Laptop',
    description: 'Máy tính xách tay',
    productCount: 32,
    status: 1
  },
  {
    id: 3,
    name: 'Tai nghe',
    description: 'Tai nghe có dây và không dây',
    productCount: 28,
    status: 1
  },
  {
    id: 4,
    name: 'Tablet',
    description: 'Máy tính bảng',
    productCount: 18,
    status: 1
  },
  {
    id: 5,
    name: 'Đồng hồ',
    description: 'Đồng hồ thông minh',
    productCount: 15,
    status: 1
  },
  {
    id: 6,
    name: 'Phụ kiện',
    description: 'Các phụ kiện điện tử',
    productCount: 67,
    status: 1
  }
]

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalProducts: mockProducts.length,
  totalOrders: mockOrders.length,
  totalUsers: mockUsers.length,
  totalRevenue: mockOrders.reduce((sum, order) => sum + order.totalAmount, 0),
  recentOrders: mockOrders.slice(0, 5)
}

// Helper functions
export const getOrderStatusColor = (status: number): string => {
  switch (status) {
    case 0: return '#faad14' // Chờ xác nhận - warning
    case 1: return '#1890ff' // Đang xử lý - info
    case 2: return '#52c41a' // Đang giao - success
    case 3: return '#52c41a' // Hoàn thành - success
    case 4: return '#ff4d4f' // Đã hủy - error
    default: return '#d9d9d9'
  }
}

export const getUserStatusText = (status: number): string => {
  return status === 1 ? 'Hoạt động' : 'Đã khóa'
}

export const getProductStatusText = (status: number): string => {
  return status === 1 ? 'Đang bán' : 'Ngừng bán'
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
