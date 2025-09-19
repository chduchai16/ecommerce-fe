'use client'

import { useState } from 'react'
import { Row, Col, Image, Typography, Rate, Tag, Button, InputNumber, Divider, Space, Card, Tabs } from 'antd'
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import type { Product } from '@/data/mockProducts'
import { CurrencyHelper } from '@/library/helpers'
import styles from './ProductDetail.module.scss'

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>()

  const images = product.images || [product.imageUrl]

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { product, quantity, selectedVariant })
  }

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buy now:', { product, quantity, selectedVariant })
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/customer/products">Sản phẩm</a>
          <span> / </span>
          <a href={`/customer/products?category=${product.category}`}>{product.category}</a>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        <Row gutter={[32, 32]}>
          
          {/* Image Gallery */}
          <Col xs={24} md={12}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  width="100%"
                  height={400}
                  style={{ objectFit: 'contain' }}
                />
                {product.discount && (
                  <Tag color="red" className={styles.discountTag}>
                    -{product.discount}%
                  </Tag>
                )}
              </div>
              
              {images.length > 1 && (
                <div className={styles.thumbnails}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`${styles.thumbnail} ${index === selectedImage ? styles.active : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        preview={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Product Info */}
          <Col xs={24} md={12}>
            <div className={styles.productInfo}>
              
              {/* Title & Brand */}
              <div className={styles.titleSection}>
                <Title level={2} className={styles.productTitle}>
                  {product.name}
                </Title>
                <Text className={styles.brandText}>
                  Thương hiệu: <strong>{product.brand}</strong>
                </Text>
              </div>

              {/* Rating & Reviews */}
              <div className={styles.ratingSection}>
                <Rate disabled value={product.rating} className={styles.rating} />
                <Text className={styles.ratingText}>
                  {product.rating} ({product.reviewCount} đánh giá)
                </Text>
              </div>

              {/* Price */}
              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                  {CurrencyHelper.formatVND(product.price)}
                </div>
                {product.originalPrice && (
                  <div className={styles.originalPrice}>
                    {CurrencyHelper.formatVND(product.originalPrice)}
                  </div>
                )}
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className={styles.tagsSection}>
                  {product.tags.map(tag => (
                    <Tag 
                      key={tag}
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

              <Divider />

              {/* Quantity & Actions */}
              <div className={styles.actionsSection}>
                <div className={styles.quantitySection}>
                  <Text className={styles.quantityLabel}>Số lượng:</Text>
                  <div className={styles.quantityInput}>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    />
                    <InputNumber
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      controls={false}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={styles.addToCartBtn}
                  >
                    Thêm vào giỏ
                  </Button>
                  
                  <Button
                    type="default"
                    size="large"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className={styles.buyNowBtn}
                  >
                    Mua ngay
                  </Button>
                </div>

                <div className={styles.secondaryActions}>
                  <Button icon={<HeartOutlined />} type="text">
                    Yêu thích
                  </Button>
                  <Button icon={<ShareAltOutlined />} type="text">
                    Chia sẻ
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              <div className={styles.stockStatus}>
                {product.inStock ? (
                  <Text type="success">✅ Còn hàng</Text>
                ) : (
                  <Text type="danger">❌ Hết hàng</Text>
                )}
              </div>

              {/* Seller Info */}
              <Card size="small" className={styles.sellerCard}>
                <div className={styles.sellerInfo}>
                  <Text strong>Người bán: {product.seller.name}</Text>
                  <div>
                    <Rate disabled value={product.seller.rating} size="small" />
                    <Text className={styles.sellerRating}>
                      ({product.seller.rating})
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Product Details Tabs */}
        <div className={styles.productTabs}>
          <Tabs defaultActiveKey="description" size="large">
            
            <TabPane tab="Mô tả sản phẩm" key="description">
              <div className={styles.tabContent}>
                <Paragraph>
                  {product.description}
                </Paragraph>
              </div>
            </TabPane>

            {product.specifications && (
              <TabPane tab="Thông số kỹ thuật" key="specifications">
                <div className={styles.tabContent}>
                  <div className={styles.specifications}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className={styles.specRow}>
                        <div className={styles.specLabel}>{key}:</div>
                        <div className={styles.specValue}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPane>
            )}

            <TabPane tab="Đánh giá" key="reviews">
              <div className={styles.tabContent}>
                <Text>Chức năng đánh giá sẽ được cập nhật sau.</Text>
              </div>
            </TabPane>

          </Tabs>
        </div>

      </div>
    </div>
  )
}