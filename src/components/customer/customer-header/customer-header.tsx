'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Input,
  Button,
  Badge,
  Dropdown,
  Space,
  Spin
} from 'antd'
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  UserAddOutlined,
  ClearOutlined,
  DownOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMessage } from '@/hooks/use-message'
import { useUser } from '@/contexts/UserContext'
import { WishlistService } from '@/library/services/wishlist-service'
import { CartService } from '@/library/services/cart-service'
import { CategoryService } from '@/library/services/category-service'
import { Category } from '@/library/models/category/category'

import styles from './customer-header.module.scss'
import cartGif from '../../../assets/gifs/cart.gif'

export default function CustomerHeader() {
  // services (dùng useMemo để không khởi tạo lại mỗi lần render)
  const wishListService = useMemo(() => new WishlistService(), [])
  const cartService = useMemo(() => new CartService(), [])
  const categoryService = useMemo(() => new CategoryService(), [])

  // hooks
  const router = useRouter()
  const message = useMessage()
  const { user, clearUser, loadUser } = useUser()

  // states
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState(0)
  const [numberOfCartItems, setNumberOfCartItems] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  // Loại bỏ searchType, mặc định luôn là tìm kiếm tất cả

  // lấy số lượng wishlist
  const getNumberOfWishlistItems = useCallback(() => {
    const items = wishListService.getAll()
    setNumberOfWishlistItems(items.length)
  }, [wishListService])

  // lấy số lượng cart
  const getNumberOfCartItems = useCallback(async () => {
    const count = await cartService.getNumberOfItems()
    setNumberOfCartItems(count)
  }, [cartService])

  // reload user khi mount
  useEffect(() => {
    loadUser()
  }, [loadUser])

  // khôi phục search query từ URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    // Chỉ lấy tham số 'search' từ URL
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [])

  // load wishlist + cart khi mount
  // lấy danh mục sản phẩm
  const getCategories = useCallback(async () => {
    try {
      setLoadingCategories(true)
      const data = await categoryService.getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error)
      message.error('Không thể tải danh mục sản phẩm')
    } finally {
      setLoadingCategories(false)
    }
  }, [categoryService, message])

  useEffect(() => {
    getNumberOfWishlistItems()
    getNumberOfCartItems()
    getCategories()
  }, [getNumberOfWishlistItems, getNumberOfCartItems, getCategories])

  // logout
  const handleLogout = async () => {
    clearUser()
    router.push('/auth/sign-in')
    message.success('Đăng xuất thành công!')
  }

  const handleLogin = () => router.push('/auth/sign-in')
  const handleRegister = () => router.push('/auth/sign-up')

  // search action
  const handleSearch = useCallback(() => {
    const buildSearchParams = () => {
      if (!searchQuery.trim()) return null
      const params = new URLSearchParams()
      params.append('search', searchQuery.trim())
      return params.toString()
    }

    const queryParams = buildSearchParams()
    if (queryParams) {
      router.push(`/customer/products?${queryParams}`)
    }
  }, [router, searchQuery])

  // user menu
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
    { type: 'divider' as const },
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={handleSearch}
                suffix={
                  <ClearOutlined
                    onClick={() => setSearchQuery('')}
                    style={{
                      cursor: 'pointer',
                      visibility: searchQuery ? 'visible' : 'hidden'
                    }}
                  />
                }
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className={styles.searchBtn}
                onClick={handleSearch}
              >
                Tìm
              </Button>
            </Space.Compact>
          </div>

          {/* Actions */}
          <div>
            <Space size="large">
              {/* Wishlist */}
              <Badge count={numberOfWishlistItems} size="small">
                <Link href="/customer/wishlist">
                  <Button type="text" icon={<HeartOutlined />}>
                    Yêu thích
                  </Button>
                </Link>
              </Badge>

              {/* Shopping Cart */}
              <Badge count={numberOfCartItems} size="small">
                <Link href="/customer/cart">
                  <Button type="text" icon={<ShoppingCartOutlined />}>
                    Giỏ hàng
                  </Button>
                </Link>
              </Badge>

              {/* User Menu */}
              {user ? (
                <Dropdown
                  menu={{
                    items: userMenuItems,
                    onClick: (e) => {
                      if (e.key === 'logout') handleLogout()
                    }
                  }}
                  placement="bottomRight"
                >
                  <Button type="text" icon={<UserOutlined />}>
                    {user?.fullname || 'Tài khoản'}
                  </Button>
                </Dropdown>
              ) : (
                <div className={styles.guestActions}>
                  <Button type="text" icon={<UserOutlined />} onClick={handleLogin}>
                    Đăng nhập
                  </Button>
                  <span className={styles.separator} aria-hidden />
                  <Button type="text" icon={<UserAddOutlined />} onClick={handleRegister}>
                    Đăng ký
                  </Button>
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
            {/* Dropdown danh mục sản phẩm */}
            <Dropdown
              menu={{
                items: loadingCategories
                  ? [{
                    key: 'loading',
                    label: <Spin size="small" />
                  }]
                  : categories.length
                    ? categories.map(category => ({
                      key: category.id,
                      label: (
                        <Link href={`/customer/products?category=${encodeURIComponent(category.name)}`}>
                          {category.name}
                        </Link>
                      ),
                      ...(category.children && category.children.length > 0 && {
                        children: category.children.map(child => ({
                          key: `${category.id}-${child.id}`,
                          label: (
                            <Link href={`/customer/products?category=${encodeURIComponent(child.name)}`}>
                              {child.name}
                            </Link>
                          )
                        }))
                      })
                    }))
                    : [{
                      key: 'no-categories',
                      label: 'Không có danh mục nào'
                    }]
              }}
              trigger={['hover']}
            >
              <a className={styles.navLink} onClick={e => e.preventDefault()}>
                <Space>
                  <MenuOutlined /> Danh mục sản phẩm tiêu biểu
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

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
