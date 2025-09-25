'use client'

import { Card, Typography, Rate, Tag, Button, Image} from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { CurrencyHelper} from '@/library/helpers'
import styles from './ProductCard.module.scss'
import { Product } from '@/library/models/product/product'

const { Text, Title } = Typography
const { Meta } = Card

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: number) => void
  onAddToWishlist?: (productId: number) => void
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onAddToWishlist 
}: ProductCardProps) {

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(product.id)
    }
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToWishlist) {
      onAddToWishlist(product.id)
    }
  }

  return (
    <Link href={`/customer/products/${product.id}`}>
      <Card
        hoverable
        className={styles.productCard}
        cover={
          <div className={styles.imageContainer}>
            <Image
              alt={product.name}
              src={product.thumbnail || ""}
              className={styles.productImage}
              preview={false}
            />
            {product.discount && (
              <Tag 
                color="red" 
                className={styles.discountTag}
              >
                {CurrencyHelper.formatDiscountPercent(product.discount)}
              </Tag>
            )}
            {!product.in_stock && (
              <div className={styles.outOfStockOverlay}>
                <Text className={styles.outOfStockText}>
                  Hết hàng
                </Text>
              </div>
            )}
          </div>
        }
        actions={[
          <div key="actions" className={styles.cardActions}>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!product.in_stock}
            >
              Thêm giỏ
            </Button>
            <Button
              icon={<HeartOutlined />}
              onClick={handleAddToWishlist}
              title="Thêm vào yêu thích"
            />
          </div>
        ]}
      >
        <Meta
          title={
            <Title 
              level={5} 
              ellipsis={{ rows: 2 }}
              className={styles.productTitle}
            >
              {product.name}
            </Title>
          }
          description={
            <div className={styles.productMeta}>
              {/* Giá */}
              <div className={styles.priceSection}>
                {product.original_price && (
                  <Text className={styles.originalPrice}>
                    {CurrencyHelper.formatVND(product.original_price)}
                  </Text>
                )}
                <Text className={styles.currentPrice}>
                  {CurrencyHelper.formatVND(product.price)}
                </Text>
              </div>

              {/* Đánh giá */}
              <div className={styles.ratingSection}>
                <Rate 
                  disabled 
                  defaultValue={product.average_rating || 0} 
                  className={styles.ratingStars}
                />
                <Text className={styles.reviewCount}>
                  ({product.review_count})
                </Text>
              </div>

              {/* Thương hiệu & Người bán */}
              <div>
                <Text className={styles.brandSeller}>
                  {product.brand} • {product.seller}
                </Text>
              </div>

              {/* Thẻ tag */}
              {Array.isArray(product.tags) && product.tags.length > 0 && (
                <div className={styles.tagsSection}>
                  {product.tags.map(tag => (
                    <Tag
                      key={tag}
                      className={styles.productTag}
                      color={
                        tag === 'hot' ? 'red' :
                        tag === 'new' ? 'blue' :
                        tag === 'bestseller' ? 'gold' :
                        'default'
                      }
                    >
                      {tag.toUpperCase()}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          }
        />
      </Card>
    </Link>
  )
}