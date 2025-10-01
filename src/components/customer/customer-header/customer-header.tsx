'use client'

import { useEffect } from 'react'
import { Input, Button, Badge, Dropdown, Space } from 'antd'
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMessage } from '@/hooks/use-message'
import { useUser } from '@/contexts/UserContext'
import styles from './customer-header.module.scss'
import cartGif from '../../../assets/gifs/cart.gif'

export default function CustomerHeader() {
  const router = useRouter()
  const message = useMessage()
  const { user, clearUser, loadUser } = useUser()

  // Reload user data when component mounts
  useEffect(() => {
    loadUser()
  }, [loadUser])

  // Handle logout
  const handleLogout = async () => {
    clearUser()
    router.push('/auth/sign-in')
    message.success('Đăng xuất thành công!')
  }

  const handleLogin = () => {
    router.push('/auth/sign-in')
  }

  const handleRegister = () => {
    router.push('/auth/sign-up')
  }

  // Handle menu click
  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      handleLogout()
    }
  }

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
      type: 'divider' as const
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
            <Image
              src={cartGif}
              alt="Exona Logo"
              width={42}
              height={42}
              className={styles.logoImage}
            />
            <span>Exona</span>
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
          <div>
            <Space size="large">

              {/* Wishlist */}
              <Badge count={5} size="small">
                <Link href="/customer/wishlist">
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                  >
                    Yêu thích
                  </Button>
                </Link>
              </Badge>

              {/* Shopping Cart */}
              <Badge count={5} size="small">
                <Link href="/customer/cart">
                  <Button
                    type="text"
                    icon={<ShoppingCartOutlined />}
                  >
                    Giỏ hàng
                  </Button>
                </Link>
              </Badge>

              {/* User Menu */}
              {user ? (
                <Dropdown
                  menu={{
                    items: userMenuItems,
                    onClick: handleMenuClick
                  }}
                  placement="bottomRight"
                >
                  <Button
                    type="text"
                    icon={<UserOutlined />}
                  >
                    {user?.fullname || 'Tài khoản'}
                  </Button>
                </Dropdown>
              ) : (
                <div className={styles.guestActions}>
                  <Button type="text" icon={<UserOutlined />} onClick={handleLogin}>Đăng nhập</Button>
                  <span className={styles.separator} aria-hidden />
                  <Button type="text" icon={<UserAddOutlined />} onClick={handleRegister}>Đăng ký</Button>
                </div>
              )}
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