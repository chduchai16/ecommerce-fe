'use client'

import { useState, useMemo } from 'react'
import { Row, Col, Input, Select, Typography, Pagination, Spin, Empty, App } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ProductCard from '../ProductCard'
import ProductFilter from '../ProductFilter'
import { mockProducts} from '@/data/mockProducts'
import styles from './ProductCatalog.module.scss'

const { Title } = Typography
const { Option } = Select

interface FilterState {
  category: string
  brand: string
  priceRange: [number, number]
  minRating: number
  inStock: boolean
}

const ITEMS_PER_PAGE = 12

export default function ProductCatalog() {
  const { message } = App.useApp();

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    category: 'Tất cả',
    brand: 'Tất cả',
    priceRange: [0, 50000000],
    minRating: 0,
    inStock: false
  })

  // Lọc và tìm kiếm sản phẩm
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Bộ lọc tìm kiếm
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())

      // Bộ lọc danh mục
      const matchesCategory = filters.category === 'Tất cả' || product.category === filters.category

      // Bộ lọc thương hiệu
      const matchesBrand = filters.brand === 'Tất cả' || product.brand === filters.brand

      // Bộ lọc giá
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      // Bộ lọc đánh giá
      const matchesRating = product.rating >= filters.minRating

      // Bộ lọc tồn kho
      const matchesStock = !filters.inStock || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock
    })
  }, [searchTerm, filters])

  // Sắp xếp sản phẩm
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
      case 'newest':
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  // Phân trang sản phẩm
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return sortedProducts.slice(startIndex, endIndex)
  }, [sortedProducts, currentPage])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset về trang đầu khi thay đổi bộ lọc
  }

  const handleClearFilters = () => {
    setFilters({
      category: 'Tất cả',
      brand: 'Tất cả',
      priceRange: [0, 50000000],
      minRating: 0,
      inStock: false
    })
    setCurrentPage(1)
  }

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId)
    if (product) {
      message.success(`Đã thêm ${product.name} vào giỏ hàng`)
    }
  }

  const handleAddToWishlist = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId)
    if (product) {
      message.success(`Đã thêm ${product.name} vào danh sách yêu thích`)
    }
  }

  return (
    <div className={styles.catalogContainer}>

      {/* Tiêu đề */}
      <div className={styles.catalogHeader}>
        {/* Tìm kiếm và Sắp xếp */}
        <Row gutter={16} className={styles.searchSortRow}>
          <Col flex="auto">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </Col>
          <Col>
            <Select
              value={sortBy}
              onChange={setSortBy}
              className={styles.sortSelect}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="popular">Phổ biến nhất</Option>
              <Option value="rating">Đánh giá cao</Option>
              <Option value="price-low">Giá: Thấp đến cao</Option>
              <Option value="price-high">Giá: Cao đến thấp</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <Row gutter={24} className={styles.mainContent}>
        {/* Thanh bộ lọc */}
        <Col xs={24} lg={6} className={styles.filterSidebar}>
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </Col>

        {/* Lưới sản phẩm */}
        <Col xs={24} lg={18} className={styles.productSection}>

          {/* Thông tin kết quả */}
          <div className={styles.resultsInfo}>
            <span>
              Hiển thị {paginatedProducts.length} trong {sortedProducts.length} sản phẩm
            </span>
          </div>

          {/* Đang tải */}
          {loading && (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          )}

          {/* Không có kết quả */}
          {!loading && sortedProducts.length === 0 && (
            <Empty
              description="Không tìm thấy sản phẩm nào"
              className={styles.emptyContainer}
            />
          )}

          {/* Lưới sản phẩm */}
          {!loading && sortedProducts.length > 0 && (
            <div className={styles.productsGrid}>
              <Row gutter={[16, 16]} className={styles.productGridRow}>
                {paginatedProducts.map(product => (
                  <Col
                    key={product.id}
                    xs={24}
                    sm={12}
                    md={8}
                    xl={6}
                    className={styles.productCol}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  </Col>
                ))}
              </Row>

              {/* Phân trang */}
              {sortedProducts.length > ITEMS_PER_PAGE && (
                <div className={styles.paginationContainer}>
                  <Pagination
                    current={currentPage}
                    total={sortedProducts.length}
                    pageSize={ITEMS_PER_PAGE}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} của ${total} sản phẩm`
                    }
                  />
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}