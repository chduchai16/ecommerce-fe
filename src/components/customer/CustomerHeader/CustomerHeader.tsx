'use client'

import { Input, Button, Badge, Dropdown, Space, Menu } from 'antd'
import { 
  SearchOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  UserOutlined,
  BellOutlined,
  MenuOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import styles from './CustomerHeader.module.scss'

export default function CustomerHeader() {
  // User menu dropdown items
  const userMenuItems = [
    {
      key: 'profile',
      label: <Link href="/customer/profile">Thông tin cá nhân</Link>
    },
    {
      key: 'orders', 
      label: <Link href="/customer/orders">Đơn hàng của tôi</Link>
    },
    {
      key: 'wishlist',
      label: <Link href="/customer/wishlist">Sản phẩm yêu thích</Link>
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Đăng xuất'
    }
  ]

  return (
    <header className={styles.customerHeader}>
  
      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          
          {/* Logo */}
          <Link href="/customer/products" className={styles.logo}>
            🛒 <span>Exona</span>
          </Link>

          {/* Search Bar */}
          <div className={styles.searchSection}>
            <Space.Compact className={styles.searchGroup}>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className={styles.searchInput}
              />
              <Button 
                type="primary" 
                icon={<SearchOutlined />}
                className={styles.searchBtn}
              >
                Tìm
              </Button>
            </Space.Compact>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Space size="large">
              
              {/* Notifications */}
              <Badge count={3} size="small">
                <Button 
                  type="text" 
                  icon={<BellOutlined />}
                  className={styles.actionBtn}
                />
              </Badge>

              {/* Wishlist */}
              <Badge count={5} size="small">
                <Button 
                  type="text" 
                  icon={<HeartOutlined />}
                  className={styles.actionBtn}
                />
              </Badge>

              {/* Shopping Cart */}
              <Badge count={2} size="small">
                <Link href="/customer/cart">
                  <Button 
                    type="text" 
                    icon={<ShoppingCartOutlined />}
                    className={styles.actionBtn}
                  >
                    Giỏ hàng
                  </Button>
                </Link>
              </Badge>

              {/* User Menu */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Button 
                  type="text" 
                  icon={<UserOutlined />}
                  className={styles.actionBtn}
                >
                  Tài khoản
                </Button>
              </Dropdown>
              
            </Space>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={styles.navMenu}>
        <div className={styles.container}>
          <Space size="large">
            <Link href="/customer/products" className={styles.navLink}>
              <MenuOutlined /> Danh mục sản phẩm
            </Link>
            <Link href="/customer/products?category=electronics" className={styles.navLink}>
              📱 Điện tử
            </Link>
            <Link href="/customer/products?category=fashion" className={styles.navLink}>
              👕 Thời trang
            </Link>
            <Link href="/customer/products?category=home" className={styles.navLink}>
              🏠 Gia dụng
            </Link>
            <Link href="/customer/products?sale=true" className={styles.navLink}>
              🔥 Khuyến mãi
            </Link>
          </Space>
        </div>
      </div>

    </header>
  )
}