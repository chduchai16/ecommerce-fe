'use client'

import { useState, useMemo } from 'react'
import { Row, Col, Input, Select, Typography, Pagination, Spin, Empty, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ProductCard from '../ProductCard'
import ProductFilter from '../ProductFilter'
import { mockProducts, type Product } from '@/data/mockProducts'
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

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory = filters.category === 'Tất cả' || product.category === filters.category

      // Brand filter
      const matchesBrand = filters.brand === 'Tất cả' || product.brand === filters.brand

      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      // Rating filter
      const matchesRating = product.rating >= filters.minRating

      // Stock filter
      const matchesStock = !filters.inStock || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock
    })
  }, [searchTerm, filters])

  // Sort products
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

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return sortedProducts.slice(startIndex, endIndex)
  }, [sortedProducts, currentPage])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
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
      
      {/* Header */}
      <div className={styles.catalogHeader}>
        <Title level={2} className={styles.catalogTitle}>
          Sản phẩm
        </Title>
        
        {/* Search and Sort */}
        <Row gutter={16} className={styles.searchSortRow}>
          <Col flex="auto">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
              className={styles.searchInput}
            />
          </Col>
          <Col>
            <Select
              value={sortBy}
              onChange={setSortBy}
              size="large"
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
        {/* Filter Sidebar */}
        <Col xs={24} lg={6} className={styles.filterSidebar}>
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </Col>

        {/* Product Grid */}
        <Col xs={24} lg={18} className={styles.productSection}>
          
          {/* Results Info */}
          <div className={styles.resultsInfo}>
            <span>
              Hiển thị {paginatedProducts.length} trong {sortedProducts.length} sản phẩm
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          )}

          {/* No results */}
          {!loading && sortedProducts.length === 0 && (
            <Empty
              description="Không tìm thấy sản phẩm nào"
              className={styles.emptyContainer}
            />
          )}

          {/* Products Grid */}
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

              {/* Pagination */}
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