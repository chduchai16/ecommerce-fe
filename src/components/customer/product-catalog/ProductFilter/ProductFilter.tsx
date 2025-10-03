'use client'

import { Card, Select, Slider, Rate, Typography, Space, Button, Divider } from 'antd'
import { ClearOutlined, FilterOutlined } from '@ant-design/icons'
import styles from './ProductFilter.module.scss'

const { Title, Text } = Typography
const { Option } = Select


interface ProductFilterProps {
  onFilterChange: () => void
  onClearFilters: () => void
}

export default function ProductFilter({ onFilterChange, onClearFilters }: ProductFilterProps) {
    const demoPriceRange: [number, number] = [0, 50000000]

    // noop handlers
    const noop = () => { }

    const categories = ['Tất cả', 'Điện tử', 'Thời trang', 'Gia dụng']
    const brands = ['Tất cả', 'Brand A', 'Brand B']

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
                    <Text className={styles.filterLabel}>Danh mục</Text>
                    <Select className={styles.filterSelect} defaultValue={categories[0]} onChange={noop}>
                        {categories.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                        ))}
                    </Select>
                </div>

                <Divider className={styles.divider} />

                {/* Bộ lọc thương hiệu */}
                <div className={styles.filterSection}>
                    <Text className={styles.filterLabel}>Thương hiệu</Text>
                    <Select className={styles.filterSelect} defaultValue={brands[0]} onChange={noop}>
                        {brands.map(brand => (
                            <Option key={brand} value={brand}>{brand}</Option>
                        ))}
                    </Select>
                </div>

                <Divider className={styles.divider} />

                {/* Khoảng giá (UI only) */}
                <div className={styles.filterSection}>
                    <Text className={styles.filterLabel}>Khoảng giá</Text>
                    <Slider range min={0} max={50000000} step={1000000} defaultValue={demoPriceRange} onChange={noop} />
                    <div className={styles.priceRangeLabels}>
                        <Text className={styles.priceLabel}>0₫</Text>
                        <Text className={styles.priceLabel}>50M₫</Text>
                    </div>
                </div>

                <Divider className={styles.divider} />

                {/* Đánh giá (UI only) */}
                <div className={styles.filterSection}>
                    <Text className={styles.filterLabel}>Đánh giá tối thiểu</Text>
                    <div className={styles.ratingOptions}>
                        {[5, 4, 3, 2, 1].map(r => (
                            <div key={r} className={styles.ratingOption} onClick={noop}>
                                <Rate disabled defaultValue={r} className={styles.ratingStars} />
                                <Text className={styles.ratingLabel}>từ {r} sao</Text>
                            </div>
                        ))}
                    </div>
                </div>

                <Divider className={styles.divider} />

                {/* Tình trạng (UI only) */}
                <div className={styles.filterSection}>
                    <Text className={styles.filterLabel}>Tình trạng</Text>
                    <Select defaultValue="all" onChange={noop}>
                        <Option value="all">Tất cả</Option>
                        <Option value="available">Còn hàng</Option>
                    </Select>
                </div>
                <div className={styles.applySection}>
                    <Button type="primary" icon={<FilterOutlined />} onClick={onFilterChange} block>Áp dụng bộ lọc</Button>
                    <Button type="text" icon={<ClearOutlined />} onClick={onClearFilters} variant="dashed" block>Xóa bộ lọc</Button>
                </div>
            </Space>
        </Card>
    )
}