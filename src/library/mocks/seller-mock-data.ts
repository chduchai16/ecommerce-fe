// Mock data cho seller dashboard

export interface ProductReview {
  id: number
  productId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
  images?: string[]
}

export interface SellerProduct {
  id: number
  name: string
  price: number
  stock: number
  sold: number
  category: string
  status: number
  revenue: number
  rating?: number
  reviewCount?: number
}

export interface SellerOrder {
  id: number
  customerName: string
  productName: string
  quantity: number
  totalAmount: number
  status: number
  statusText: string
  createdAt: string
}

export interface SellerStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

// Mock Seller Products - 30 items
export const mockSellerProducts: SellerProduct[] = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 29990000, stock: 45, sold: 120, category: 'Điện thoại', status: 1, revenue: 3598800000, rating: 4.8 },
  { id: 2, name: 'MacBook Pro 14" M3', price: 52990000, stock: 12, sold: 35, category: 'Laptop', status: 1, revenue: 1854650000, rating: 4.9 },
  { id: 3, name: 'AirPods Pro 2', price: 6490000, stock: 0, sold: 89, category: 'Tai nghe', status: 0, revenue: 577610000, rating: 4.7 },
  { id: 4, name: 'iPad Air M2', price: 16990000, stock: 28, sold: 56, category: 'Tablet', status: 1, revenue: 951440000, rating: 4.6 },
  { id: 5, name: 'Apple Watch Series 9', price: 10990000, stock: 35, sold: 78, category: 'Đồng hồ', status: 1, revenue: 857220000, rating: 4.8 },
  { id: 6, name: 'Samsung Galaxy S24 Ultra', price: 27990000, stock: 32, sold: 65, category: 'Điện thoại', status: 1, revenue: 1819350000, rating: 4.7 },
  { id: 7, name: 'Dell XPS 15', price: 42990000, stock: 18, sold: 28, category: 'Laptop', status: 1, revenue: 1203720000, rating: 4.6 },
  { id: 8, name: 'Sony WH-1000XM5', price: 8990000, stock: 25, sold: 95, category: 'Tai nghe', status: 1, revenue: 854050000, rating: 4.8 },
  { id: 9, name: 'Samsung Galaxy Tab S9', price: 18990000, stock: 15, sold: 42, category: 'Tablet', status: 1, revenue: 797580000, rating: 4.5 },
  { id: 10, name: 'Garmin Fenix 7', price: 15990000, stock: 8, sold: 23, category: 'Đồng hồ', status: 1, revenue: 367770000, rating: 4.7 },
  { id: 11, name: 'Xiaomi 14 Pro', price: 19990000, stock: 40, sold: 110, category: 'Điện thoại', status: 1, revenue: 2198900000, rating: 4.6 },
  { id: 12, name: 'HP Spectre x360', price: 38990000, stock: 10, sold: 18, category: 'Laptop', status: 1, revenue: 701820000, rating: 4.5 },
  { id: 13, name: 'Bose QuietComfort 45', price: 7490000, stock: 30, sold: 72, category: 'Tai nghe', status: 1, revenue: 539280000, rating: 4.6 },
  { id: 14, name: 'Lenovo Tab P12', price: 12990000, stock: 20, sold: 34, category: 'Tablet', status: 1, revenue: 441660000, rating: 4.4 },
  { id: 15, name: 'Fitbit Sense 2', price: 7990000, stock: 45, sold: 88, category: 'Đồng hồ', status: 1, revenue: 703120000, rating: 4.3 },
  { id: 16, name: 'OPPO Find X6 Pro', price: 22990000, stock: 28, sold: 52, category: 'Điện thoại', status: 1, revenue: 1195480000, rating: 4.5 },
  { id: 17, name: 'ASUS ROG Zephyrus G14', price: 45990000, stock: 6, sold: 15, category: 'Laptop', status: 1, revenue: 689850000, rating: 4.8 },
  { id: 18, name: 'JBL Live 660NC', price: 4990000, stock: 0, sold: 156, category: 'Tai nghe', status: 0, revenue: 778440000, rating: 4.4 },
  { id: 19, name: 'Microsoft Surface Pro 9', price: 28990000, stock: 12, sold: 29, category: 'Tablet', status: 1, revenue: 840710000, rating: 4.6 },
  { id: 20, name: 'Huawei Watch GT 4', price: 6990000, stock: 35, sold: 67, category: 'Đồng hồ', status: 1, revenue: 468330000, rating: 4.5 },
  { id: 21, name: 'Google Pixel 8 Pro', price: 24990000, stock: 22, sold: 48, category: 'Điện thoại', status: 1, revenue: 1199520000, rating: 4.7 },
  { id: 22, name: 'Acer Swift 3', price: 18990000, stock: 25, sold: 41, category: 'Laptop', status: 1, revenue: 778590000, rating: 4.3 },
  { id: 23, name: 'Sennheiser Momentum 4', price: 9990000, stock: 15, sold: 58, category: 'Tai nghe', status: 1, revenue: 579420000, rating: 4.8 },
  { id: 24, name: 'Xiaomi Pad 6', price: 9990000, stock: 30, sold: 76, category: 'Tablet', status: 1, revenue: 759240000, rating: 4.4 },
  { id: 25, name: 'Samsung Galaxy Watch 6', price: 8990000, stock: 40, sold: 92, category: 'Đồng hồ', status: 1, revenue: 827080000, rating: 4.6 },
  { id: 26, name: 'Realme GT Neo 5', price: 13990000, stock: 35, sold: 85, category: 'Điện thoại', status: 1, revenue: 1189150000, rating: 4.4 },
  { id: 27, name: 'MSI Prestige 14', price: 32990000, stock: 8, sold: 22, category: 'Laptop', status: 1, revenue: 725780000, rating: 4.5 },
  { id: 28, name: 'Anker Soundcore Q30', price: 2490000, stock: 50, sold: 210, category: 'Tai nghe', status: 1, revenue: 522900000, rating: 4.3 },
  { id: 29, name: 'Honor Pad 8', price: 6990000, stock: 25, sold: 53, category: 'Tablet', status: 1, revenue: 370470000, rating: 4.2 },
  { id: 30, name: 'Amazfit GTR 4', price: 5990000, stock: 42, sold: 98, category: 'Đồng hồ', status: 1, revenue: 587020000, rating: 4.4 }
]

// Mock Seller Orders - 25 items
export const mockSellerOrders: SellerOrder[] = [
  { id: 2001, customerName: 'Nguyễn Văn A', productName: 'iPhone 15 Pro Max', quantity: 1, totalAmount: 29990000, status: 1, statusText: 'Đang xử lý', createdAt: '2024-12-05T10:30:00' },
  { id: 2002, customerName: 'Trần Thị B', productName: 'MacBook Pro 14" M3', quantity: 1, totalAmount: 52990000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T09:15:00' },
  { id: 2003, customerName: 'Lê Văn C', productName: 'AirPods Pro 2', quantity: 2, totalAmount: 12980000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-04T14:20:00' },
  { id: 2004, customerName: 'Phạm Thị D', productName: 'iPad Air M2', quantity: 1, totalAmount: 16990000, status: 0, statusText: 'Chờ xác nhận', createdAt: '2024-12-05T11:45:00' },
  { id: 2005, customerName: 'Hoàng Văn E', productName: 'Apple Watch Series 9', quantity: 1, totalAmount: 10990000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T08:30:00' },
  { id: 2006, customerName: 'Võ Thị F', productName: 'Samsung Galaxy S24', quantity: 1, totalAmount: 27990000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-04T16:20:00' },
  { id: 2007, customerName: 'Đặng Văn G', productName: 'Dell XPS 15', quantity: 1, totalAmount: 42990000, status: 1, statusText: 'Đang xử lý', createdAt: '2024-12-05T07:00:00' },
  { id: 2008, customerName: 'Bùi Thị H', productName: 'Sony WH-1000XM5', quantity: 2, totalAmount: 17980000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T13:15:00' },
  { id: 2009, customerName: 'Mai Văn I', productName: 'Samsung Galaxy Tab S9', quantity: 1, totalAmount: 18990000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-03T10:30:00' },
  { id: 2010, customerName: 'Dương Thị K', productName: 'Garmin Fenix 7', quantity: 1, totalAmount: 15990000, status: 0, statusText: 'Chờ xác nhận', createdAt: '2024-12-05T14:45:00' },
  { id: 2011, customerName: 'Phan Văn L', productName: 'Xiaomi 14 Pro', quantity: 1, totalAmount: 19990000, status: 1, statusText: 'Đang xử lý', createdAt: '2024-12-05T06:20:00' },
  { id: 2012, customerName: 'Cao Thị M', productName: 'HP Spectre x360', quantity: 1, totalAmount: 38990000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T11:00:00' },
  { id: 2013, customerName: 'Tô Văn N', productName: 'Bose QuietComfort 45', quantity: 3, totalAmount: 22470000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-03T15:30:00' },
  { id: 2014, customerName: 'Lý Thị O', productName: 'Lenovo Tab P12', quantity: 1, totalAmount: 12990000, status: 0, statusText: 'Chờ xác nhận', createdAt: '2024-12-05T15:20:00' },
  { id: 2015, customerName: 'Trịnh Văn P', productName: 'Fitbit Sense 2', quantity: 2, totalAmount: 15980000, status: 1, statusText: 'Đang xử lý', createdAt: '2024-12-05T09:45:00' },
  { id: 2016, customerName: 'Hồ Thị Q', productName: 'OPPO Find X6 Pro', quantity: 1, totalAmount: 22990000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T12:10:00' },
  { id: 2017, customerName: 'Đinh Văn R', productName: 'ASUS ROG Zephyrus', quantity: 1, totalAmount: 45990000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-02T14:00:00' },
  { id: 2018, customerName: 'Thái Thị S', productName: 'JBL Live 660NC', quantity: 4, totalAmount: 19960000, status: 0, statusText: 'Chờ xác nhận', createdAt: '2024-12-05T16:30:00' },
  { id: 2019, customerName: 'Vũ Văn T', productName: 'Surface Pro 9', quantity: 1, totalAmount: 28990000, status: 1, statusText: 'Đang xử lý', createdAt: '2024-12-05T08:00:00' },
  { id: 2020, customerName: 'An Thị U', productName: 'Huawei Watch GT 4', quantity: 2, totalAmount: 13980000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T10:45:00' },
  { id: 2021, customerName: 'Chu Văn V', productName: 'Google Pixel 8 Pro', quantity: 1, totalAmount: 24990000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-02T11:20:00' },
  { id: 2022, customerName: 'Đoàn Thị W', productName: 'Acer Swift 3', quantity: 1, totalAmount: 18990000, status: 0, statusText: 'Chờ xác nhận', createdAt: '2024-12-05T17:00:00' },
  { id: 2023, customerName: 'Từ Văn X', productName: 'Sennheiser Momentum 4', quantity: 1, totalAmount: 9990000, status: 1, statusText: 'Đang xử lý', createdAt: '2024-12-05T07:30:00' },
  { id: 2024, customerName: 'Khuất Thị Y', productName: 'Xiaomi Pad 6', quantity: 2, totalAmount: 19980000, status: 2, statusText: 'Đang giao', createdAt: '2024-12-05T13:45:00' },
  { id: 2025, customerName: 'Ông Văn Z', productName: 'Galaxy Watch 6', quantity: 1, totalAmount: 8990000, status: 3, statusText: 'Hoàn thành', createdAt: '2024-12-01T09:00:00' }
]

// Mock Product Reviews - 50+ reviews
export const mockProductReviews: ProductReview[] = [
  // iPhone 15 Pro Max (id: 1) - 12 reviews
  { id: 1, productId: 1, userName: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm tuyệt vời! Camera chụp đẹp, pin trâu, chơi game mượt mà.', createdAt: '2024-12-01T10:30:00' },
  { id: 2, productId: 1, userName: 'Trần Thị B', rating: 5, comment: 'Rất hài lòng với chiếc điện thoại này. Màn hình đẹp, hiệu năng khủng.', createdAt: '2024-11-28T14:20:00' },
  { id: 3, productId: 1, userName: 'Lê Văn C', rating: 4, comment: 'Máy tốt nhưng giá hơi cao. Tuy nhiên chất lượng xứng đáng.', createdAt: '2024-11-25T09:15:00' },
  { id: 4, productId: 1, userName: 'Phạm Thị D', rating: 5, comment: 'Apple vẫn luôn là Apple. Chất lượng không cần bàn cãi!', createdAt: '2024-11-20T16:45:00' },
  { id: 5, productId: 1, userName: 'Hoàng Văn E', rating: 5, comment: 'Đẹp, sang trọng. Dùng rất mượt mà và ổn định.', createdAt: '2024-11-15T11:00:00' },
  { id: 6, productId: 1, userName: 'Võ Thị F', rating: 4, comment: 'Pin khỏe hơn mong đợi. Camera ban đêm quá đỉnh!', createdAt: '2024-11-10T13:30:00' },
  { id: 7, productId: 1, userName: 'Đặng Văn G', rating: 5, comment: 'Nâng cấp từ iPhone 12 lên rất đáng. Mượt mà vô cùng.', createdAt: '2024-11-05T08:20:00' },
  { id: 8, productId: 1, userName: 'Bùi Thị H', rating: 5, comment: 'Thiết kế titan sang chảnh. Xứng đáng từng đồng!', createdAt: '2024-10-30T15:10:00' },
  { id: 9, productId: 1, userName: 'Mai Văn I', rating: 4, comment: 'Máy tốt nhưng cần bảo vệ kỹ vì dễ trầy xước.', createdAt: '2024-10-25T10:40:00' },
  { id: 10, productId: 1, userName: 'Dương Thị K', rating: 5, comment: 'Chơi game cực đã, không nóng máy. Tuyệt vời!', createdAt: '2024-10-20T14:55:00' },
  { id: 11, productId: 1, userName: 'Phan Văn L', rating: 5, comment: 'Action Button rất tiện. Face ID nhanh và chính xác.', createdAt: '2024-10-15T09:25:00' },
  { id: 12, productId: 1, userName: 'Cao Thị M', rating: 4, comment: 'Giá hơi cao nhưng chất lượng xứng tầm flagship.', createdAt: '2024-10-10T16:30:00' },
  
  // MacBook Pro 14" M3 (id: 2) - 8 reviews
  { id: 13, productId: 2, userName: 'Tô Văn N', rating: 5, comment: 'Hiệu năng M3 quá khủng! Làm việc đồ họa rất mượt.', createdAt: '2024-11-30T10:00:00' },
  { id: 14, productId: 2, userName: 'Lý Thị O', rating: 5, comment: 'Pin trâu, màn hình đẹp. Rất đáng đồng tiền!', createdAt: '2024-11-25T14:30:00' },
  { id: 15, productId: 2, userName: 'Trịnh Văn P', rating: 5, comment: 'Compile code nhanh như chớp. Dev mà không mua là phí.', createdAt: '2024-11-20T09:45:00' },
  { id: 16, productId: 2, userName: 'Hồ Thị Q', rating: 4, comment: 'Tốt nhưng giá hơi đắt. Tuy nhiên chất lượng Apple luôn tốt.', createdAt: '2024-11-15T16:20:00' },
  { id: 17, productId: 2, userName: 'Đinh Văn R', rating: 5, comment: 'Render video 4K siêu nhanh. Không thể tin được!', createdAt: '2024-11-10T11:15:00' },
  { id: 18, productId: 2, userName: 'Thái Thị S', rating: 5, comment: 'Mỏng nhẹ, đẹp. Làm việc cả ngày không cần sạc.', createdAt: '2024-11-05T13:40:00' },
  { id: 19, productId: 2, userName: 'Vũ Văn T', rating: 5, comment: 'Bàn phím tốt, trackpad mượt. Dùng rất sướng tay.', createdAt: '2024-10-30T08:55:00' },
  { id: 20, productId: 2, userName: 'An Thị U', rating: 4, comment: 'Cổng kết nối ít nhưng hiệu năng bù lại tất cả.', createdAt: '2024-10-25T15:25:00' },
  
  // AirPods Pro 2 (id: 3) - 10 reviews
  { id: 21, productId: 3, userName: 'Chu Văn V', rating: 5, comment: 'Chống ồn tuyệt vời! Âm thanh trong trẻo, bass ấm.', createdAt: '2024-12-02T10:20:00' },
  { id: 22, productId: 3, userName: 'Đoàn Thị W', rating: 5, comment: 'Fit vừa tai, đeo thoải mái cả ngày. Pin trâu.', createdAt: '2024-11-28T14:10:00' },
  { id: 23, productId: 3, userName: 'Từ Văn X', rating: 4, comment: 'Tốt nhưng giá hơi cao so với tai nghe khác.', createdAt: '2024-11-25T09:30:00' },
  { id: 24, productId: 3, userName: 'Khuất Thị Y', rating: 5, comment: 'Transparency mode rất hay. Nghe nhạc đỉnh!', createdAt: '2024-11-20T16:45:00' },
  { id: 25, productId: 3, userName: 'Ông Văn Z', rating: 5, comment: 'Kết nối nhanh, ổn định. Xứng đáng là tai nghe tốt nhất.', createdAt: '2024-11-15T11:20:00' },
  { id: 26, productId: 3, userName: 'Ngô Thị AA', rating: 4, comment: 'Chất âm tốt nhưng case hơi dễ trầy.', createdAt: '2024-11-10T13:55:00' },
  { id: 27, productId: 3, userName: 'Lưu Văn BB', rating: 5, comment: 'Spatial Audio quá đỉnh! Như xem phim rạp.', createdAt: '2024-11-05T08:40:00' },
  { id: 28, productId: 3, userName: 'Huỳnh Thị CC', rating: 5, comment: 'Tích hợp Apple ecosystem hoàn hảo. Dùng rất tiện.', createdAt: '2024-10-30T15:15:00' },
  { id: 29, productId: 3, userName: 'Đỗ Văn DD', rating: 4, comment: 'Chống ồn tốt nhưng vẫn kém Sony một chút.', createdAt: '2024-10-25T10:50:00' },
  { id: 30, productId: 3, userName: 'Dư Thị EE', rating: 5, comment: 'Pin sử dụng lâu, sạc nhanh. Rất hài lòng!', createdAt: '2024-10-20T14:35:00' },

  // Samsung Galaxy S24 Ultra (id: 6) - 8 reviews
  { id: 31, productId: 6, userName: 'Trương Văn FF', rating: 5, comment: 'S Pen tuyệt vời! Màn hình sáng, sắc nét.', createdAt: '2024-11-30T09:15:00' },
  { id: 32, productId: 6, userName: 'Lâm Thị GG', rating: 5, comment: 'Camera zoom 100x quá đỉnh. Chụp xa rất nét.', createdAt: '2024-11-25T14:40:00' },
  { id: 33, productId: 6, userName: 'Hà Văn HH', rating: 4, comment: 'Máy tốt nhưng hơi nặng. Pin khỏe, hiệu năng mạnh.', createdAt: '2024-11-20T10:25:00' },
  { id: 34, productId: 6, userName: 'Ưng Thị II', rating: 5, comment: 'OneUI mượt mà. Tính năng AI rất hữu ích.', createdAt: '2024-11-15T16:10:00' },
  { id: 35, productId: 6, userName: 'Quách Văn JJ', rating: 5, comment: 'Thiết kế vuông vức, sang trọng. Camera đỉnh!', createdAt: '2024-11-10T11:45:00' },
  { id: 36, productId: 6, userName: 'Tạ Thị KK', rating: 4, comment: 'Giá cao nhưng xứng đáng. Flagship đỉnh nhất Samsung.', createdAt: '2024-11-05T13:20:00' },
  { id: 37, productId: 6, userName: 'Văn Văn LL', rating: 5, comment: 'S Pen viết mượt như viết giấy. Tuyệt vời!', createdAt: '2024-10-30T09:05:00' },
  { id: 38, productId: 6, userName: 'Xa Thị MM', rating: 5, comment: 'Hiệu năng Snapdragon 8 Gen 3 khủng khiếp!', createdAt: '2024-10-25T15:50:00' },

  // Sony WH-1000XM5 (id: 8) - 9 reviews
  { id: 39, productId: 8, userName: 'Yên Văn NN', rating: 5, comment: 'Chống ồn số 1 thế giới! Âm thanh cực kỳ chi tiết.', createdAt: '2024-12-01T10:10:00' },
  { id: 40, productId: 8, userName: 'A Thị OO', rating: 5, comment: 'Đeo thoải mái, không đau tai. Pin khỏe 30 tiếng.', createdAt: '2024-11-28T14:55:00' },
  { id: 41, productId: 8, userName: 'B Văn PP', rating: 5, comment: 'LDAC codec âm thanh Hi-Res cực hay!', createdAt: '2024-11-25T09:40:00' },
  { id: 42, productId: 8, userName: 'C Thị QQ', rating: 4, comment: 'Tốt nhưng giá hơi đắt. Chất âm xứng đáng!', createdAt: '2024-11-20T16:25:00' },
  { id: 43, productId: 8, userName: 'D Văn RR', rating: 5, comment: 'Chống ồn máy bay cực đỉnh. Đi công tác rất tiện.', createdAt: '2024-11-15T11:30:00' },
  { id: 44, productId: 8, userName: 'E Thị SS', rating: 5, comment: 'Thiết kế đẹp, sang trọng. Gấp gọn tiện lợi.', createdAt: '2024-11-10T13:15:00' },
  { id: 45, productId: 8, userName: 'F Văn TT', rating: 5, comment: 'Tự động điều chỉnh EQ thông minh. Tuyệt vời!', createdAt: '2024-11-05T08:50:00' },
  { id: 46, productId: 8, userName: 'G Thị UU', rating: 4, comment: 'Chất âm tốt nhưng bass hơi nhẹ so với mong đợi.', createdAt: '2024-10-30T15:35:00' },
  { id: 47, productId: 8, userName: 'H Văn VV', rating: 5, comment: 'Multipoint kết nối 2 thiết bị rất tiện lợi.', createdAt: '2024-10-25T10:20:00' },

  // Dell XPS 15 (id: 7) - 6 reviews
  { id: 48, productId: 7, userName: 'I Thị WW', rating: 5, comment: 'Màn hình 4K tuyệt đẹp! Chỉnh sửa ảnh cực kỳ chính xác.', createdAt: '2024-11-30T09:30:00' },
  { id: 49, productId: 7, userName: 'J Văn XX', rating: 4, comment: 'Hiệu năng mạnh nhưng máy hơi nóng khi chạy nặng.', createdAt: '2024-11-25T14:15:00' },
  { id: 50, productId: 7, userName: 'K Thị YY', rating: 5, comment: 'Build quality cực tốt. Bàn phím gõ rất sướng.', createdAt: '2024-11-20T10:45:00' },
  { id: 51, productId: 7, userName: 'L Văn ZZ', rating: 5, comment: 'Thiết kế mỏng nhẹ, viền màn hình siêu mỏng đẹp.', createdAt: '2024-11-15T16:00:00' },
  { id: 52, productId: 7, userName: 'M Thị AAA', rating: 4, comment: 'Pin hơi yếu khi chạy đồ họa. Nhưng hiệu năng tốt.', createdAt: '2024-11-10T11:25:00' },
  { id: 53, productId: 7, userName: 'N Văn BBB', rating: 5, comment: 'RTX GPU render nhanh. Loa nghe hay bất ngờ!', createdAt: '2024-11-05T13:50:00' },
]

// Helper function to get reviews by product
export const getProductReviews = (productId: number): ProductReview[] => {
  return mockProductReviews.filter(review => review.productId === productId)
}

// Helper function to calculate average rating
export const getAverageRating = (productId: number): number => {
  const reviews = getProductReviews(productId)
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Number((sum / reviews.length).toFixed(1))
}

// Calculate stats
export const mockSellerStats: SellerStats = {
  totalProducts: mockSellerProducts.length,
  totalOrders: mockSellerOrders.length,
  totalRevenue: mockSellerProducts.reduce((sum, p) => sum + p.revenue, 0),
  pendingOrders: mockSellerOrders.filter(o => o.status === 0).length,
}

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
