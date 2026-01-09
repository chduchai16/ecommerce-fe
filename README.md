# E-Commerce Frontend

Ứng dụng E-Commerce được xây dựng với Next.js 15, hỗ trợ 3 vai trò người dùng: Admin, Seller và Customer.

## Công nghệ sử dụng

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **UI Library**: Ant Design 5.27.4
- **Language**: TypeScript
- **Styling**: SCSS/SASS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Charts**: Chart.js, Recharts
- **Authentication**: JWT

## Cấu trúc dự án

```
src/
├── app/                    # Pages và routes
│   ├── admin/             # Trang quản trị (dashboard, products, reports, settings)
│   ├── customer/          # Trang khách hàng (cart, checkout, orders, wishlist)
│   ├── seller/            # Trang người bán (inventory, orders, products, revenue)
│   └── auth/              # Xác thực (sign-in, sign-up)
├── components/            # React components
├── configs/               # Cấu hình (auth-guard, role-guard, axios)
├── contexts/              # Context providers (AuthContext)
├── hooks/                 # Custom hooks
├── library/               # Core logic
│   ├── models/           # TypeScript interfaces/types
│   ├── services/         # API services
│   ├── helpers/          # Utility functions
│   └── enums/            # Enums & constants
└── styles/               # Global styles & themes
```

## Tính năng chính

### Admin
- Quản lý sản phẩm và danh mục
- Dashboard và báo cáo
- Quản lý người dùng
- Cài đặt hệ thống

### Seller
- Quản lý kho hàng
- Xử lý đơn hàng
- Quản lý sản phẩm của shop
- Theo dõi doanh thu

### Customer
- Duyệt và tìm kiếm sản phẩm
- Giỏ hàng và thanh toán
- Quản lý đơn hàng
- Danh sách yêu thích
- Quản lý hồ sơ

## Yêu cầu hệ thống

- Node.js 20+
- npm/yarn/pnpm

## Cài đặt

```bash
# Clone repository
git clone <repository-url>

# Di chuyển vào thư mục dự án
cd ecommerce-fe

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## Scripts

```bash
npm run dev          # Chạy development server (với Turbopack)
npm run build        # Build production
npm start            # Chạy production server
npm run lint         # Kiểm tra code với ESLint
```

## Cấu hình API

Cập nhật API URL trong file `src/library/consts/app_constants.ts`:

```typescript
export const apiBaseUrl = "http://localhost:8080/api/";
export const mediaProductBaseUrl = "http://localhost:8080/api/media/images/";
export const mediaUserBaseUrl = "http://localhost:8080/api/media/images/users/";
```

## Authentication & Authorization

- Sử dụng JWT tokens để xác thực
- Context API để quản lý auth state
- Role-based access control (ADMIN, SELLER, CUSTOMER)
- Protected routes với AuthGuard và RoleGuard

## Services

- `auth-service.ts` - Xác thực người dùng
- `product-service.ts` - Quản lý sản phẩm
- `cart-service.ts` - Giỏ hàng
- `order-service.ts` - Đơn hàng
- `category-service.ts` - Danh mục
- `inventory-service.ts` - Kho hàng
- `wishlist-service.ts` - Danh sách yêu thích
- `notification-service.ts` - Thông báo

## Lưu ý

- React Strict Mode đã được tắt để tránh mount 2 lần trong development
- Sử dụng Turbopack cho performance tốt hơn
- Ant Design đã được optimize với `transpilePackages`

## License

Private
