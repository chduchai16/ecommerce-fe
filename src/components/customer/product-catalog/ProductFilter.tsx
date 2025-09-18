'use client'

import { Card, Select, Slider, Rate, Typography, Space, Button, Divider } from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import { categories, brands } from '@/data/mockProducts'

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={5} style={{ margin: 0 }}>
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
      style={{ position: 'sticky', top: 20 }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size={16}>
        
        {/* Category Filter */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            Danh mục
          </Text>
          <Select
            style={{ width: '100%' }}
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

        <Divider style={{ margin: 0 }} />

        {/* Brand Filter */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            Thương hiệu
          </Text>
          <Select
            style={{ width: '100%' }}
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

        <Divider style={{ margin: 0 }} />

        {/* Price Range Filter */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
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
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: 8 
          }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatPrice(filters.priceRange[0])}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatPrice(filters.priceRange[1])}
            </Text>
          </div>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* Rating Filter */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            Đánh giá tối thiểu
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[5, 4, 3, 2, 1].map(rating => (
              <div 
                key={rating}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 4,
                  backgroundColor: filters.minRating === rating ? '#e6f7ff' : 'transparent'
                }}
                onClick={() => updateFilter('minRating', rating)}
              >
                <Rate 
                  disabled 
                  defaultValue={rating} 
                  style={{ fontSize: 14 }} 
                />
                <Text style={{ marginLeft: 8, fontSize: 12 }}>
                  từ {rating} sao
                </Text>
              </div>
            ))}
          </div>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* In Stock Filter */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            Tình trạng
          </Text>
          <Select
            style={{ width: '100%' }}
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