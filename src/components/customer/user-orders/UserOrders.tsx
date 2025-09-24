'use client'

import { useState } from 'react'
import { Row, Col, Typography, Card, Tag, Button, Empty, Image, Timeline, Modal, Descriptions, Space, Input } from 'antd'
import { EyeOutlined, SearchOutlined, ShopOutlined, TruckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { mockOrders, getOrderStatusText, getOrderStatusColor, getPaymentMethodText, type Order } from '@/data/mockUserData'
import { CurrencyHelper } from '@/library/helpers'
import styles from './UserOrders.module.scss'

const { Title, Text } = Typography
const { Search } = Input

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setModalVisible(true)
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesStatus && matchesSearch
  })

  const getTimelineItems = (order: Order) => {
    const items = [
      {
        color: 'green',
        children: (
          <div>
            <Text strong>Đặt hàng thành công</Text>
            <br />
            <Text type="secondary">{dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}</Text>
          </div>
        )
      }
    ]

    if (order.status === 'confirmed' || order.status === 'shipping' || order.status === 'delivered') {
      items.push({
        color: 'green',
        children: (
          <div>
            <Text strong>Đã xác nhận đơn hàng</Text>
            <br />
            <Text type="secondary">{dayjs(order.orderDate).add(1, 'hour').format('DD/MM/YYYY HH:mm')}</Text>
          </div>
        )
      })
    }

    if (order.status === 'shipping' || order.status === 'delivered') {
      items.push({
        color: 'blue',
        children: (
          <div>
            <Text strong>Đang giao hàng</Text>
            <br />
            <Text type="secondary">{dayjs(order.orderDate).add(1, 'day').format('DD/MM/YYYY HH:mm')}</Text>
            {order.trackingNumber && (
              <>
                <br />
                <Text>Mã vận đơn: <Text code>{order.trackingNumber}</Text></Text>
              </>
            )}
          </div>
        )
      })
    }

    if (order.status === 'delivered') {
      items.push({
        color: 'green',
        children: (
          <div>
            <Text strong>Giao hàng thành công</Text>
            <br />
            <Text type="secondary">{order.deliveredDate ? dayjs(order.deliveredDate).format('DD/MM/YYYY HH:mm') : 'Chưa có thông tin'}</Text>
          </div>
        )
      })
    }

    if (order.status === 'cancelled') {
      items.push({
        color: 'red',
        children: (
          <div>
            <Text strong>Đơn hàng đã bị hủy</Text>
            <br />
            <Text type="secondary">{dayjs(order.orderDate).add(2, 'hour').format('DD/MM/YYYY HH:mm')}</Text>
          </div>
        )
      })
    }

    return items
  }

  return (
    <div className={styles.userOrders}>
      <div className={styles.container}>

        {/* Filters */}
        <Card className={styles.filtersCard}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Tìm đơn hàng theo mã đơn hoặc sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%' }}
              />
            </Col>
            
            <Col xs={24} sm={12} md={16}>
              <Space wrap>
                <Button 
                  type={filterStatus === 'all' ? 'primary' : 'default'}
                  onClick={() => setFilterStatus('all')}
                >
                  Tất cả
                </Button>
                <Button 
                  type={filterStatus === 'pending' ? 'primary' : 'default'}
                  onClick={() => setFilterStatus('pending')}
                >
                  Chờ xác nhận
                </Button>
                <Button 
                  type={filterStatus === 'shipping' ? 'primary' : 'default'}
                  onClick={() => setFilterStatus('shipping')}
                >
                  Đang giao
                </Button>
                <Button 
                  type={filterStatus === 'delivered' ? 'primary' : 'default'}
                  onClick={() => setFilterStatus('delivered')}
                >
                  Đã giao
                </Button>
                <Button 
                  type={filterStatus === 'cancelled' ? 'primary' : 'default'}
                  onClick={() => setFilterStatus('cancelled')}
                >
                  Đã hủy
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <Empty
              description="Không tìm thấy đơn hàng nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card>
        ) : (
          <div className={styles.ordersList}>
            {filteredOrders.map(order => (
              <Card key={order.id} className={styles.orderCard}>
                <Row gutter={[16, 16]}>
                  
                  {/* Order Header */}
                  <Col span={24}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <Text strong className={styles.orderNumber}>
                          Đơn hàng #{order.orderNumber}
                        </Text>
                        <Text className={styles.orderDate}>
                          {dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}
                        </Text>
                      </div>
                      
                      <div className={styles.orderActions}>
                        <Tag color={getOrderStatusColor(order.status)} className={styles.statusTag}>
                          {getOrderStatusText(order.status)}
                        </Tag>
                        <Button
                          type="primary"
                          size="small"
                          icon={<EyeOutlined />}
                          onClick={() => handleViewOrder(order)}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </Col>

                  {/* Order Items */}
                  <Col span={24}>
                    <div className={styles.orderItems}>
                      {order.items.map(item => (
                        <div key={item.id} className={styles.orderItem}>
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={60}
                            height={60}
                            style={{ objectFit: 'contain' }}
                            className={styles.itemImage}
                          />
                          <div className={styles.itemInfo}>
                            <Text className={styles.itemName}>
                              {item.productName}
                            </Text>
                            <Text className={styles.itemDetails}>
                              {CurrencyHelper.formatVND(item.price)} x {item.quantity}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>

                  {/* Order Total */}
                  <Col span={24}>
                    <div className={styles.orderTotal}>
                      <Text>Tổng tiền: </Text>
                      <Text strong className={styles.totalAmount}>
                        {CurrencyHelper.formatVND(order.finalAmount)}
                      </Text>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}

        {/* Order Detail Modal */}
        <Modal
          title={`Chi tiết đơn hàng #${selectedOrder?.orderNumber}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={800}
          className={styles.orderModal}
        >
          {selectedOrder && (
            <div className={styles.orderDetail}>
              
              {/* Order Status Timeline */}
              <div className={styles.statusTimeline}>
                <Title level={5}>Trạng thái đơn hàng</Title>
                <Timeline items={getTimelineItems(selectedOrder)} />
              </div>

              {/* Order Info */}
              <Descriptions title="Thông tin đơn hàng" column={1} bordered>
                <Descriptions.Item label="Mã đơn hàng">
                  {selectedOrder.orderNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày đặt">
                  {dayjs(selectedOrder.orderDate).format('DD/MM/YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color={getOrderStatusColor(selectedOrder.status)}>
                    {getOrderStatusText(selectedOrder.status)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Phương thức thanh toán">
                  {getPaymentMethodText(selectedOrder.paymentMethod)}
                </Descriptions.Item>
                {selectedOrder.trackingNumber && (
                  <Descriptions.Item label="Mã vận đơn">
                    <Text code>{selectedOrder.trackingNumber}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>

              {/* Products */}
              <div className={styles.modalProducts}>
                <Title level={5}>Sản phẩm đã đặt</Title>
                {selectedOrder.items.map(item => (
                  <div key={item.id} className={styles.modalItem}>
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={80}
                      height={80}
                      style={{ objectFit: 'contain' }}
                    />
                    <div className={styles.modalItemInfo}>
                      <Text strong>{item.productName}</Text>
                      <Text>Giá: {CurrencyHelper.formatVND(item.price)}</Text>
                      <Text>Số lượng: {item.quantity}</Text>
                      <Text strong>
                        Thành tiền: {CurrencyHelper.formatVND(item.price * item.quantity)}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className={styles.modalSummary}>
                <Title level={5}>Tóm tắt đơn hàng</Title>
                <div className={styles.summaryRow}>
                  <Text>Tạm tính:</Text>
                  <Text>{CurrencyHelper.formatVND(selectedOrder.totalAmount)}</Text>
                </div>
                <div className={styles.summaryRow}>
                  <Text>Phí vận chuyển:</Text>
                  <Text>{CurrencyHelper.formatVND(selectedOrder.shippingFee)}</Text>
                </div>
                <div className={styles.summaryRow}>
                  <Text>Giảm giá:</Text>
                  <Text>-{CurrencyHelper.formatVND(selectedOrder.discount)}</Text>
                </div>
                <div className={styles.summaryRow}>
                  <Text strong>Tổng cộng:</Text>
                  <Text strong className={styles.finalAmount}>
                    {CurrencyHelper.formatVND(selectedOrder.finalAmount)}
                  </Text>
                </div>
              </div>

              {/* Shipping Address */}
              <Descriptions title="Địa chỉ giao hàng" column={1} bordered>
                <Descriptions.Item label="Người nhận">
                  {selectedOrder.shippingAddress.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {selectedOrder.shippingAddress.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.ward}, {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.city}
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}