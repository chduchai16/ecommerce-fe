'use client'

import { Card, Typography, Rate, Tag, Button, Image, Space } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import type { Product } from '@/data/mockProducts'
import styles from './ProductCard.module.scss'

const { Text, Title } = Typography
const { Meta } = Card

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onAddToWishlist 
}: ProductCardProps) {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

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
              src={product.imageUrl}
              className={styles.productImage}
              preview={false}
            />
            {product.discount && (
              <Tag 
                color="red" 
                className={styles.discountTag}
              >
                -{product.discount}%
              </Tag>
            )}
            {!product.inStock && (
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
              disabled={!product.inStock}
              className={styles.addToCartBtn}
            >
              Thêm giỏ
            </Button>
            <Button
              icon={<HeartOutlined />}
              onClick={handleAddToWishlist}
              className={styles.wishlistBtn}
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
              {/* Price */}
              <div className={styles.priceSection}>
                <Text className={styles.currentPrice}>
                  {formatPrice(product.price)}
                </Text>
                {product.originalPrice && (
                  <Text className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </Text>
                )}
              </div>

              {/* Rating */}
              <div className={styles.ratingSection}>
                <Rate 
                  disabled 
                  defaultValue={product.rating} 
                  className={styles.ratingStars}
                />
                <Text className={styles.reviewCount}>
                  ({product.reviewCount})
                </Text>
              </div>

              {/* Brand & Seller */}
              <div>
                <Text className={styles.brandSeller}>
                  {product.brand} • {product.seller.name}
                </Text>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
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