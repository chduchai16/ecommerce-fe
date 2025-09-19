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
  // User menu dropdown
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/customer/profile">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link href="/customer/orders">Đơn hàng của tôi</Link>
      </Menu.Item>
      <Menu.Item key="wishlist">
        <Link href="/customer/wishlist">Sản phẩm yêu thích</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  )

  return (
    <header className={styles.customerHeader}>
      
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topLeft}>
            <span>📞 Hotline: 1900-xxxx</span>
            <span>🚚 Miễn phí vận chuyển đơn từ 500k</span>
          </div>
          <div className={styles.topRight}>
            <Link href="/customer/help">Hỗ trợ</Link>
            <Link href="/seller/register">Bán hàng cùng chúng tôi</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          
          {/* Logo */}
          <Link href="/customer/products" className={styles.logo}>
            🛒 <span>EcomStore</span>
          </Link>

          {/* Search Bar */}
          <div className={styles.searchSection}>
            <Input.Group compact className={styles.searchGroup}>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className={styles.searchInput}
                suffix={
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    className={styles.searchBtn}
                  >
                    Tìm
                  </Button>
                }
              />
            </Input.Group>
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
              <Dropdown overlay={userMenu} placement="bottomRight">
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