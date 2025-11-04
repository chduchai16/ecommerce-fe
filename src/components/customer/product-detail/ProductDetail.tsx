'use client'

import { useState, useMemo, useEffect } from 'react'
import { Row, Col, Image, Typography, Rate, Tag, Button, InputNumber, Divider, Card, Tabs } from 'antd'
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { CurrencyHelper } from '@/library/helpers'
import styles from './ProductDetail.module.scss'
import { Product } from '@/library/models/product/product'
import { mediaProductBaseUrl } from '@/library/consts/app_constants'
import Link from 'next/link'
import { WishlistService } from '@/library/services/wishlist-service'
import { CartService } from '@/library/services/cart-service'
import { useMessage } from '@/hooks/use-message'

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {

  // services
  const wishListService = useMemo(() => new WishlistService(), []);
  const cartService = useMemo(() => new CartService(), []);
  const message = useMessage();

  // states
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>()

  const images = product.product_images || [product.thumbnail || ""]

  const handleAddToCart = async () => {
    try {
      await cartService.addItem(product);
      message.success('Đã thêm sản phẩm vào giỏ hàng');
    } catch (err) {
      console.error('Add to cart failed', err);
      message.error('Thêm vào giỏ hàng thất bại. Vui lòng thử lại');
    }
  }

  const handleBuyNow = () => {
    console.log('Buy now:', { product, quantity, selectedVariant })
  }

  const handleAddToWishlist = () => {
    const productId: number | null = wishListService.add(product.id);

    if (productId) {
      message.success('Đã thêm sản phẩm vào danh sách yêu thích')
    } else {
      message.error('Sản phẩm đã có trong danh sách yêu thích')
    }

  }

  useEffect(()=>{
    console.log('Product in detail page:', product);
  }, [product])

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/customer/products">Sản phẩm</Link>
          <span> / </span>
          <Link href={`/customer/products?category=${product.category_name}`}>{product.category_name}</Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        <Row gutter={[32, 32]}>

          {/* Image Gallery */}
          <Col xs={24} md={12}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <Image
                  src={
                    mediaProductBaseUrl +
                    (
                      typeof images[selectedImage] === 'string'
                        ? (images[selectedImage] || product.thumbnail || '')
                        : (images[selectedImage]?.image_name ?? product.thumbnail ?? '')
                    )
                  }
                  alt={product.name}
                  width="100%"
                  height={400}
                  style={{ objectFit: "contain" }}
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
                        src={
                          mediaProductBaseUrl +
                          (
                            typeof image === 'string'
                              ? (image || product.thumbnail || '')
                              : (image?.image_name ?? product.thumbnail ?? '')
                          )
                        }
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
                <Rate disabled value={product.average_rating || 0} className={styles.rating} />
                <Text className={styles.ratingText}>
                  {product.average_rating || 0} ({product.review_count || 0} đánh giá)
                </Text>
              </div>

              {/* Price */}
              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                  {CurrencyHelper.formatVND(product.price)}
                </div>
                {product.original_price && (
                  <div className={styles.originalPrice}>
                    {CurrencyHelper.formatVND(product.original_price)}
                  </div>
                )}
              </div>

              {/* Tags */}
              {product.tags && (
                <div className={styles.tagsSection}>
                  <Tag
                    key={product.tags}
                    color={
                      product.tags === 'hot' ? 'red' :
                        product.tags === 'new' ? 'blue' :
                          product.tags === 'best seller' ? 'gold' :
                            'default'
                    }
                  >
                    {product.tags.toUpperCase()}
                  </Tag>
                </div>
              )}

              <Divider />

              {/* Quantity & Actions */}
              <div className={styles.actionsSection}>
                <div className={styles.quantitySection}>
                  <Text className={styles.quantityLabel}>Số lượng:</Text>
                  <div>
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
                    disabled={!product.in_stock}
                    className={styles.addToCartBtn}
                  >
                    Thêm vào giỏ
                  </Button>

                  <Button
                    type="default"
                    size="large"
                    onClick={handleBuyNow}
                    disabled={!product.in_stock}
                    className={styles.buyNowBtn}
                  >
                    Mua ngay
                  </Button>
                </div>

                <div className={styles.secondaryActions}>
                  <Button icon={<HeartOutlined />} type="text" onClick={handleAddToWishlist}>
                    Yêu thích
                  </Button>
                  <Button icon={<ShareAltOutlined />} type="text">
                    Chia sẻ
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              <div className={styles.stockStatus}>
                {product.in_stock ? (
                  <Text type="success">✅ Còn hàng</Text>
                ) : (
                  <Text type="danger">❌ Hết hàng</Text>
                )}
              </div>

              {/* Seller Info */}
              <Card size="small" className={styles.sellerCard}>
                <div className={styles.sellerInfo}>
                  <Text strong>Người bán: {product.seller}</Text>
                  {/* <div>
                    <Rate disabled value={product.seller.rating} size="small" />
                    <Text className={styles.sellerRating}>
                      ({product.seller.rating})
                    </Text>
                  </div> */}
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

            {product.specifications && product.specifications.length > 0 && (
              <TabPane tab="Thông số kỹ thuật" key="specifications">
                <div className={styles.tabContent}>
                  <div className={styles.specifications}>
                    {product.specifications.map((spec, index) => (
                      <div key={index} className={styles.specRow}>
                        <div className={styles.specLabel}>{spec.key}:</div>
                        <div className={styles.specValue}>{spec.value}</div>
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