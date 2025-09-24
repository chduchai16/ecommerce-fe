'use client'

import { Card, Select, Slider, Rate, Typography, Space, Button, Divider } from 'antd'
import { ClearOutlined, FilterOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { categories, brands } from '@/data/mockProducts'
import { CurrencyHelper } from '@/library/helpers'
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

  // State tạm thời cho bộ lọc
  const [tempFilters, setTempFilters] = useState<FilterState>(filters)

  // Cập nhật tempFilters khi filters từ parent thay đổi
  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

  const updateTempFilter = (key: keyof FilterState, value: any) => {
    setTempFilters({
      ...tempFilters,
      [key]: value
    })
  }

  const handleApplyFilters = () => {
    onFilterChange(tempFilters)
  }

  const handleClearFilters = () => {
    const defaultFilters: FilterState = {
      category: 'Tất cả',
      brand: 'Tất cả',
      priceRange: [0, 50000000],
      minRating: 0,
      inStock: false
    }
    setTempFilters(defaultFilters)
    onClearFilters()
  }

  return (
    <Card 
      title={
        <Title level={5} className={styles.filterTitle}>
          Bộ lọc sản phẩm
        </Title>
      }
      className={styles.filterCard}
    >
      <Space direction="vertical" className={styles.filterContent}>
        
        {/* Bộ lọc danh mục */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Danh mục
          </Text>
          <Select
            className={styles.filterSelect}
            value={tempFilters.category}
            onChange={(value) => updateTempFilter('category', value)}
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

        {/* Bộ lọc thương hiệu */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Thương hiệu
          </Text>
          <Select
            className={styles.filterSelect}
            value={tempFilters.brand}
            onChange={(value) => updateTempFilter('brand', value)}
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

        {/* Bộ lọc khoảng giá */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Khoảng giá
          </Text>
          <Slider
            range
            min={0}
            max={50000000}
            step={1000000}
            value={tempFilters.priceRange}
            onChange={(value) => updateTempFilter('priceRange', value)}
            tooltip={{
              formatter: (value) => value ? CurrencyHelper.formatCompactVND(value) : ''
            }}
          />
          <div className={styles.priceRangeLabels}>
            <Text className={styles.priceLabel}>
              {CurrencyHelper.formatCompactVND(tempFilters.priceRange[0])}
            </Text>
            <Text className={styles.priceLabel}>
              {CurrencyHelper.formatCompactVND(tempFilters.priceRange[1])}
            </Text>
          </div>
        </div>

        <Divider className={styles.divider} />

        {/* Bộ lọc đánh giá */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Đánh giá tối thiểu
          </Text>
          <div className={styles.ratingOptions}>
            {[5, 4, 3, 2, 1].map(rating => (
              <div 
                key={rating}
                className={`${styles.ratingOption} ${
                  tempFilters.minRating === rating ? styles.selected : ''
                }`}
                onClick={() => updateTempFilter('minRating', rating)}
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

        {/* Bộ lọc tình trạng kho */}
        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>
            Tình trạng
          </Text>
          <Select
            className={styles.filterSelect}
            value={tempFilters.inStock ? 'available' : 'all'}
            onChange={(value) => updateTempFilter('inStock', value === 'available')}
          >
            <Option value="all">Tất cả</Option>
            <Option value="available">Còn hàng</Option>
          </Select>
        </div>

        {/* Nút áp dụng và xóa bộ lọc */}
        <div className={styles.applySection}>
          <Button 
            type="primary" 
            icon={<FilterOutlined />}
            onClick={handleApplyFilters}
            block
          >
            Áp dụng bộ lọc
          </Button>
          
          <Button 
            type="text" 
            icon={<ClearOutlined />}
            onClick={handleClearFilters}
            variant="dashed"
            block
          >
            Xóa bộ lọc
          </Button>
        </div>

      </Space>
    </Card>
  )
}