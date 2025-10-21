'use client'

import { useState } from 'react'
import { Row, Col, Typography, Card, Tag, Button, Empty, Image } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { CurrencyHelper } from '@/library/helpers'
import styles from './UserOrders.module.scss'
import { Order } from '@/library/models/order/order'
import { OrderStatus } from '@/library/enums/order-status'
import OrderDetail from './order-detail'

const { Text } = Typography

const getOrderStatusColor = (status?: number) => {
  switch (status) {
    case OrderStatus.PENDING: return 'blue'
    case OrderStatus.CONFIRMED: return 'gold'
    case OrderStatus.SHIPPING: return 'processing'
    case OrderStatus.DELIVERED: return 'success'
    case OrderStatus.CANCELLED: return 'error'
    default: return 'default'
  }
}

const getOrderStatusText = (status?: number) => {
  switch (status) {
    case OrderStatus.PENDING: return 'Chờ xác nhận'
    case OrderStatus.CONFIRMED: return 'Đã xác nhận'
    case OrderStatus.SHIPPING: return 'Đang giao hàng'
    case OrderStatus.DELIVERED: return 'Đã giao hàng'
    case OrderStatus.CANCELLED: return 'Đã hủy'
    default: return 'Không xác định'
  }
}

const mockOrders: Order[] = [
  {
    id: 1,
    user_id: 101,
    order_number: 'DH001-2025',
    subtotal: 25900000,
    shipping_fee: 50000,
    discount: 0,
    total_price: 25950000,
    final_amount: 25950000,
    status: 2,
    order_date: '2025-10-05T14:30:00',
    shipping_address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP HCM',
    shipping_address_details: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      street: '123 Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP HCM'
    },
    shipping_method: 'standard',
    tracking_number: 'VN123456789',
    customer_name: 'Nguyễn Văn A',
    phone_number: '0901234567',
    email: 'nguyenvana@example.com',
    payment_method: 'vnpay',
    payment_status: 1,
    notes: 'Giao hàng giờ hành chính',
    items: [
      {
        id: 101,
        productName: 'Laptop Asus ZenBook',
        productImage: 'https://picsum.photos/200/300',
        price: 25000000,
        quantity: 1
      },
      {
        id: 102,
        productName: 'Chuột không dây Logitech',
        productImage: 'https://picsum.photos/200',
        price: 450000,
        quantity: 2
      }
    ]
  },
  {
    id: 2,
    user_id: 101,
    order_number: 'DH002-2025',
    subtotal: 10800000,
    shipping_fee: 30000,
    discount: 200000,
    total_price: 10630000,
    final_amount: 10630000,
    status: 3,
    order_date: '2025-09-28T09:15:00',
    delivered_date: '2025-09-30T14:20:00',
    shipping_address: '456 Lê Lợi, Phường Bến Thành, Quận 1, TP HCM',
    shipping_address_details: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      street: '456 Lê Lợi',
      ward: 'Phường Bến Thành',
      district: 'Quận 1',
      city: 'TP HCM'
    },
    shipping_method: 'express',
    tracking_number: 'VN987654321',
    customer_name: 'Nguyễn Văn A',
    phone_number: '0901234567',
    email: 'nguyenvana@example.com',
    payment_method: 'cod',
    payment_status: 1,
    coupon_code: 'DISCOUNT200K',
    items: [
      {
        id: 201,
        productName: 'iPhone 15',
        productImage: 'https://picsum.photos/200/300?random=1',
        price: 10800000,
        quantity: 1
      }
    ]
  }
]

export default function UserOrders() {
  const [orders] = useState<Order[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedOrder(null)
  }

  return (
    <div className={styles.userOrders}>
      <div className={styles.container}>
        {orders.length === 0 ? (
          <Card>
            <Empty description="Không tìm thấy đơn hàng nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Card>
        ) : (
          <div className={styles.ordersList}>
            {orders.map(order => (
              <Card key={order.id} className={styles.orderCard}>
                <Row gutter={[16, 16]}>
                  {/* header */}
                  <Col span={24}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <Text strong className={styles.orderNumber}>Đơn hàng #{order.order_number}</Text>
                        <Text className={styles.orderDate}>{dayjs(order.order_date).format('DD/MM/YYYY HH:mm')}</Text>
                      </div>
                      <div className={styles.orderActions}>
                        <Tag color={getOrderStatusColor(order.status)} className={styles.statusTag}>{getOrderStatusText(order.status)}</Tag>
                        <Button type="primary" icon={<EyeOutlined />} onClick={() => handleViewOrder(order)}>Xem chi tiết</Button>
                      </div>
                    </div>
                  </Col>
                  {/* danh sách đơn hàng */}
                  <Col span={24}>
                    <div className={styles.orderItems}>
                      {order.items?.map(item => (
                        <div key={item.id} className={styles.orderItem}>
                          <div className={styles.itemImageWrapper}>
                            <Image src={item.productImage} alt={item.productName} width={60} height={60} style={{ objectFit: 'contain' }} preview={false} />
                          </div>
                          <div className={styles.itemInfo}>
                            <Text className={styles.itemName}>{item.productName}</Text>
                            <Text className={styles.itemDetails}>{CurrencyHelper.formatVND(item.price)} x {item.quantity}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className={styles.orderTotal}>
                      <Text>Tổng tiền: </Text>
                      <Text strong className={styles.totalAmount}>{CurrencyHelper.formatVND(order.final_amount || order.total_price)}</Text>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}
        <OrderDetail order={selectedOrder} visible={modalVisible} onClose={handleCloseModal} />
      </div>
    </div>
  )
}
