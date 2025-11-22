'use client'

import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Typography, Card, Tag, Button, Empty, Image } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { CurrencyHelper } from '@/library/helpers'
import styles from './UserOrders.module.scss'
import { Order } from '@/library/models/order/order'
import { mediaProductBaseUrl } from '@/library/consts/app_constants'
import { OrderStatus } from '@/library/enums/order-status'
import OrderDetailComponent from './order-detail'
import { OrderService } from '@/library/services/order-service'
import { OrderDetail } from '@/library/models/order/order-detail'

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

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // thông tin phân trang 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);


  const orderService = useMemo(() => new OrderService(), []);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedOrder(null)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrdersByUser();
        setOrders(response.page_content);
        setCurrentPage(response.pagination_info.current_page);
        setPageSize(response.pagination_info.page_size);
        setTotalItems(response.pagination_info.total_elements);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log('Orders updated:', orders);
  }, [orders])

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
                      {(order.order_details ?? order.order_details)?.map((item: OrderDetail) => {
                        const qty = item.quantity ?? 0;
                        const total = item.total ?? (item.price * qty);
                        const productName = item.product_name ?? item.product_name;
                        const productImage = (item.product_image ?? item.product_image) || '';
                        const price = item.price;

                        return (
                          <div key={item.id} className={styles.orderItem}>
                            <div className={styles.itemImageWrapper}>
                              <Image
                                src={mediaProductBaseUrl + productImage}
                                alt={productName}
                                width={60}
                                height={60}
                                style={{ objectFit: 'contain' }}
                                preview={false}
                              />
                            </div>
                            <div className={styles.itemInfo}>
                              <Text className={styles.itemName}>{productName}</Text>
                              <Text className={styles.itemDetails}>{CurrencyHelper.formatVND(price)} x {qty}</Text>
                            </div>
                          </div>
                        )
                      })}
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
        <OrderDetailComponent order={selectedOrder} visible={modalVisible} onClose={handleCloseModal} />
      </div>
    </div>
  )
}
