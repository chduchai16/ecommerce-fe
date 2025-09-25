'use client'

import { useState, useMemo, useEffect } from 'react'
import { Row, Col,Spin, Empty, App } from 'antd'
import ProductCard from '../ProductCard'
import ProductFilter from '../ProductFilter'
import styles from './ProductCatalog.module.scss'
import { ProductService } from '@/library/services/product-service'
import { Product } from '@/library/models/product/product'

interface FilterState {
  category: string
  brand: string
  priceRange: [number, number]
  minRating: number
  inStock: boolean
}

const ITEMS_PER_PAGE = 12

export default function ProductCatalog() {

  const productService = new ProductService() ;

  const { message } = App.useApp();

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [productList, setProductList] = useState<Product[]>([]);


  const [filters, setFilters] = useState<FilterState>({
    category: 'Tất cả',
    brand: 'Tất cả',
    priceRange: [0, 50000000],
    minRating: 0,
    inStock: false
  })

  // Lọc và tìm kiếm sản phẩm
  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      // normalize field về string để tránh lỗi null/undefined
      const name = product.name?.toLowerCase() ?? ''
      const description = product.description?.toLowerCase() ?? ''
      const brand = product.brand?.toLowerCase() ?? ''
      const category = product.category_name ?? ''

      // Bộ lọc tìm kiếm
      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase()) ||
        brand.includes(searchTerm.toLowerCase())

      // Bộ lọc danh mục
      const matchesCategory =
        filters.category === 'Tất cả' || category === filters.category

      // Bộ lọc thương hiệu
      const matchesBrand =
        filters.brand === 'Tất cả' || brand === filters.brand.toLowerCase()

      // Bộ lọc giá
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]

      // Bộ lọc đánh giá (average_rating có thể null)
      const rating = product.average_rating ?? 0
      const matchesRating = rating >= filters.minRating

      // Bộ lọc tồn kho
      const matchesStock = !filters.inStock || !!product.in_stock

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      )
    })
  }, [searchTerm, filters, productList])


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

  const handleAddToCart = (productId: number) => {
    const product = productList.find(p => p.id === productId)
    if (product) {
      message.success(`Đã thêm ${product.name} vào giỏ hàng`)
    }
  }

  const handleAddToWishlist = (productId: number) => {
    const product = productList.find(p => p.id === productId)
    if (product) {
      message.success(`Đã thêm ${product.name} vào danh sách yêu thích`)
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await productService.getProducts();
        await setProductList(products);
      } catch (error) {
        message.error("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.catalogContainer}>
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
          {/* Đang tải */}
          {loading && (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          )}

          {/* Không có kết quả */}
          {!loading && filteredProducts.length === 0 && (
            <Empty
              description="Không tìm thấy sản phẩm nào"
              className={styles.emptyContainer}
            />
          )}

          {/* Lưới sản phẩm */}
          {!loading && productList.length > 0 && (
            <div className={styles.productsGrid}>
              <Row gutter={[16, 16]} className={styles.productGridRow}>
                {productList.map(product => (
                  <Col
                    key={product.id}
                    xs={24}
                    sm={12}
                    md={8}
                    xl={6}
                    className={styles.productCol}
                  >
                    { 
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    /> 
                    }
                  </Col>
                ))}
              </Row>
            </div>
          )}

        </Col>
      </Row>
    </div>
  )
}