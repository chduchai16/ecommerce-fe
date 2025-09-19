'use client'

import { Card, Select, Slider, Rate, Typography, Space, Button, Divider } from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import { categories, brands } from '@/data/mockProducts'
import styles from './ProductFilter.module.scss'

const { Title, Text } = Typography
const { Option } = Select

interface FilterState {
  category: string
  brand: string
  priceRange: [number, number]
  minRating: number
  inStock: boolean
}

interface ProductFilterProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export default function ProductFilter({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}: ProductFilterProps) {

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <Card 
      title={
        <div className={styles.filterHeader}>
          <Title level={5} className={styles.filterTitle}>
            Bộ lọc sản phẩm
          </Title>
          <Button 
            type="text" 
            icon={<ClearOutlined />} 
            size="small"
            onClick={onClearFilters}
          >
            Xóa bộ lọc
          </Button>
        </div>
      }
      className={styles.filterCard}
    >
      <Space direction="vertical" className={styles.filterContent}>
        
        {/* Category Filter */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Danh mục
          </Text>
          <Select
            className={styles.filterSelect}
            value={filters.category}
            onChange={(value) => updateFilter('category', value)}
            placeholder="Chọn danh mục"
          >
            {categories.map(category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <Divider className={styles.divider} />

        {/* Brand Filter */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Thương hiệu
          </Text>
          <Select
            className={styles.filterSelect}
            value={filters.brand}
            onChange={(value) => updateFilter('brand', value)}
            placeholder="Chọn thương hiệu"
          >
            {brands.map(brand => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </div>

        <Divider className={styles.divider} />

        {/* Price Range Filter */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Khoảng giá
          </Text>
          <Slider
            range
            min={0}
            max={50000000}
            step={1000000}
            value={filters.priceRange}
            onChange={(value) => updateFilter('priceRange', value)}
            tooltip={{
              formatter: (value) => value ? formatPrice(value) : ''
            }}
          />
          <div className={styles.priceRangeLabels}>
            <Text className={styles.priceLabel}>
              {formatPrice(filters.priceRange[0])}
            </Text>
            <Text className={styles.priceLabel}>
              {formatPrice(filters.priceRange[1])}
            </Text>
          </div>
        </div>

        <Divider className={styles.divider} />

        {/* Rating Filter */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Đánh giá tối thiểu
          </Text>
          <div className={styles.ratingOptions}>
            {[5, 4, 3, 2, 1].map(rating => (
              <div 
                key={rating}
                className={`${styles.ratingOption} ${
                  filters.minRating === rating ? styles.selected : ''
                }`}
                onClick={() => updateFilter('minRating', rating)}
              >
                <Rate 
                  disabled 
                  defaultValue={rating} 
                  className={styles.ratingStars}
                />
                <Text className={styles.ratingLabel}>
                  từ {rating} sao
                </Text>
              </div>
            ))}
          </div>
        </div>

        <Divider className={styles.divider} />

        {/* In Stock Filter */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Tình trạng
          </Text>
          <Select
            className={styles.filterSelect}
            value={filters.inStock ? 'available' : 'all'}
            onChange={(value) => updateFilter('inStock', value === 'available')}
          >
            <Option value="all">Tất cả</Option>
            <Option value="available">Còn hàng</Option>
          </Select>
        </div>

      </Space>
    </Card>
  )
}