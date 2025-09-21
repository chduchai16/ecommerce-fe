'use client'

import { useState } from 'react'
import { Row, Col, Typography, Button, Table, InputNumber, Image, Card, Divider, Empty, App } from 'antd'
import { DeleteOutlined, ShoppingOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import type { CartItem } from '@/data/mockProducts'
import { mockProducts } from '@/data/mockProducts'
import { CurrencyHelper } from '@/library/helpers'
import styles from './ShoppingCart.module.scss'

const { Title, Text } = Typography

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: '1',
    productId: '1',
    product: mockProducts[0],
    quantity: 2,
    addedAt: new Date()
  },
  {
    id: '2',
    productId: '3',
    product: mockProducts[2],
    quantity: 1,
    addedAt: new Date()
  }
]

export default function ShoppingCart() {
  const { message } = App.useApp();

  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [loading, setLoading] = useState(false)

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
    message.success('Đã xóa sản phẩm khỏi giỏ hàng')
  }

  const clearCart = () => {
    setCartItems([])
    message.success('Đã xóa tất cả sản phẩm')
  }

  const calculateSubtotal = (item: CartItem) => {
    return item.product.price * item.quantity
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0)
  }

  const handleCheckout = () => {
    setLoading(true)
    // TODO: Implement checkout logic
    setTimeout(() => {
      setLoading(false)
      message.success('Chuyển đến trang thanh toán...')
    }, 1000)
  }

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (_: any, record: CartItem) => (
        <div className={styles.productInfo}>
          <Image
            src={record.product.imageUrl}
            alt={record.product.name}
            width={80}
            height={80}
            style={{ objectFit: 'contain' }}
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <Link href={`/customer/products/${record.product.id}`}>
              <Text strong className={styles.productName}>
                {record.product.name}
              </Text>
            </Link>
            <Text className={styles.productBrand}>
              {record.product.brand}
            </Text>
            <Text className={styles.productPrice}>
              {CurrencyHelper.formatVND(record.product.price)}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (_: any, record: CartItem) => (
        <InputNumber
          min={1}
          max={99}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value || 1)}
          style={{ width: '100px' }}
        />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'subtotal',
      width: 150,
      render: (_: any, record: CartItem) => (
        <Text strong className={styles.subtotal}>
          {CurrencyHelper.formatVND(calculateSubtotal(record))}
        </Text>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      render: (_: any, record: CartItem) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.id)}
          className={styles.deleteBtn}
          title="Xóa sản phẩm"
        />
      ),
    },
  ]

  if (cartItems.length === 0) {
    return (
      <div className={styles.shoppingCart}>
        <div className={styles.container}>
          <Title level={2} className={styles.pageTitle}>
            Giỏ hàng của bạn
          </Title>

          <div className={styles.emptyCart}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text>Giỏ hàng của bạn đang trống</Text>
                  <br />
                  <Text type="secondary">Hãy thêm sản phẩm để tiếp tục mua sắm</Text>
                </div>
              }
            >
              <Link href="/customer/products">
                <Button type="primary" icon={<ShoppingOutlined />}>
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </Empty>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <Link href="/customer/products">
            <Button icon={<ArrowLeftOutlined />} type="text">
              Tiếp tục mua sắm
            </Button>
          </Link>
          <Title level={2} className={styles.pageTitle}>
            Giỏ hàng ({cartItems.length} sản phẩm)
          </Title>
          <Button onClick={clearCart} type="text" className={styles.clearBtn}>
            Xóa tất cả
          </Button>
        </div>

        <Row gutter={[24, 24]}>

          {/* Cart Items */}
          <Col xs={24} lg={16}>
            <Card className={styles.cartTable}>
              <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
                rowKey="id"
                className={styles.table}
              />
            </Card>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card className={styles.orderSummary}>
              <Title level={4} className={styles.summaryTitle}>
                Tóm tắt đơn hàng
              </Title>

              <div className={styles.summaryContent}>
                <div className={styles.summaryRow}>
                  <Text>Tạm tính:</Text>
                  <Text strong>{CurrencyHelper.formatVND(calculateTotal())}</Text>
                </div>

                <div className={styles.summaryRow}>
                  <Text>Phí vận chuyển:</Text>
                  <Text>Miễn phí</Text>
                </div>

                <Divider className={styles.divider} />

                <div className={styles.summaryRow}>
                  <Text strong>Tổng cộng:</Text>
                  <Text strong className={styles.totalAmount}>
                    {CurrencyHelper.formatVND(calculateTotal())}
                  </Text>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                onClick={handleCheckout}
                loading={loading}
                className={styles.checkoutBtn}
              >
                Tiến hành thanh toán
              </Button>

              <div className={styles.securityNote}>
                <Text type="secondary" className={styles.noteText}>
                  🔒 Thanh toán an toàn và bảo mật
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}