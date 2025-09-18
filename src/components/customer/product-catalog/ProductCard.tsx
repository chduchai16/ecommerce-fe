'use client'

import { Card, Typography, Rate, Tag, Button, Image, Space } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import type { Product } from '@/data/mockProducts'

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
        style={{ height: '100%' }}
        cover={
          <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
            <Image
              alt={product.name}
              src={product.imageUrl}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                padding: 8
              }}
              preview={false}
            />
            {product.discount && (
              <Tag 
                color="red" 
                style={{ 
                  position: 'absolute', 
                  top: 8, 
                  left: 8,
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              >
                -{product.discount}%
              </Tag>
            )}
            {!product.inStock && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Hết hàng
                </Text>
              </div>
            )}
          </div>
        }
        actions={[
          <Button
            key="cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{ 
              width: '70%',
              fontSize: '12px',
              padding: '4px 8px'
            }}
          >
            Thêm giỏ
          </Button>,
          <Button
            key="wishlist"
            icon={<HeartOutlined />}
            onClick={handleAddToWishlist}
            style={{ 
              width: '25%',
              padding: '4px 8px'
            }}
            title="Thêm vào yêu thích"
          />
        ]}
      >
        <Meta
          title={
            <Title 
              level={5} 
              ellipsis={{ rows: 2 }}
              style={{ margin: 0, minHeight: 48 }}
            >
              {product.name}
            </Title>
          }
          description={
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {/* Price */}
              <div>
                <Text 
                  strong 
                  style={{ 
                    fontSize: 18, 
                    color: '#ff4d4f' 
                  }}
                >
                  {formatPrice(product.price)}
                </Text>
                {product.originalPrice && (
                  <Text 
                    delete 
                    type="secondary" 
                    style={{ 
                      marginLeft: 8,
                      fontSize: 14
                    }}
                  >
                    {formatPrice(product.originalPrice)}
                  </Text>
                )}
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Rate 
                  disabled 
                  defaultValue={product.rating} 
                  style={{ fontSize: 14 }} 
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  ({product.reviewCount})
                </Text>
              </div>

              {/* Brand & Seller */}
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {product.brand} • {product.seller.name}
                </Text>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div>
                  {product.tags.map(tag => (
                    <Tag 
                      key={tag} 
                      style={{ fontSize: 10 }}
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
            </Space>
          }
        />
      </Card>
    </Link>
  )
}