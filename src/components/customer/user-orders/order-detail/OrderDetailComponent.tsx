'use client'

import { Row, Col, Typography, Card, Tag, Image, Timeline, Modal, Descriptions } from 'antd'
import dayjs from 'dayjs'
import { CurrencyHelper } from '@/library/helpers'
import { mediaProductBaseUrl } from '@/library/consts/app_constants'
import { Order } from '@/library/models/order/order'
import { OrderStatus } from '@/library/enums/order-status'
import styles from './OrderDetail.module.scss'
import { OrderDetail } from '@/library/models/order/order-detail'

const { Title, Text } = Typography

interface Props {
    order: Order | null
    visible: boolean
    onClose: () => void
}

// Helper functions for order status and payment methods
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

const getPaymentMethodText = (method?: string) => {
    switch (method) {
        case 'cod': return 'Thanh toán khi nhận hàng'
        case 'vnpay': return 'VNPAY'
        case 'momo': return 'MoMo'
        case 'bank_transfer': return 'Chuyển khoản ngân hàng'
        default: return 'Không xác định'
    }
}

const getTimelineItems = (order: Order) => {
    const items = [
        {
            color: 'green',
            children: (
                <div>
                    <Text strong>Đặt hàng thành công</Text>
                    <br />
                    <Text type="secondary">{dayjs(order.order_date).format('DD/MM/YYYY HH:mm')}</Text>
                </div>
            )
        }
    ]

    if (order.status === OrderStatus.CONFIRMED || order.status === OrderStatus.SHIPPING || order.status === OrderStatus.DELIVERED) {
        items.push({
            color: 'green',
            children: (
                <div>
                    <Text strong>Đã xác nhận đơn hàng</Text>
                    <br />
                    <Text type="secondary">{dayjs(order.order_date).add(1, 'hour').format('DD/MM/YYYY HH:mm')}</Text>
                </div>
            )
        })
    }

    if (order.status === OrderStatus.SHIPPING || order.status === OrderStatus.DELIVERED) {
        items.push({
            color: 'blue',
            children: (
                <div>
                    <Text strong>Đang giao hàng</Text>
                    <br />
                    <Text type="secondary">{dayjs(order.order_date).add(1, 'day').format('DD/MM/YYYY HH:mm')}</Text>
                    {order.tracking_number && (
                        <>
                            <br />
                            <Text>Mã vận đơn: <Text code>{order.tracking_number}</Text></Text>
                        </>
                    )}
                </div>
            )
        })
    }

    if (order.status === OrderStatus.DELIVERED) {
        items.push({
            color: 'green',
            children: (
                <div>
                    <Text strong>Giao hàng thành công</Text>
                    <br />
                    <Text type="secondary">{order.delivered_date ? dayjs(order.delivered_date).format('DD/MM/YYYY HH:mm') : 'Chưa có thông tin'}</Text>
                </div>
            )
        })
    }

    if (order.status === OrderStatus.CANCELLED) {
        items.push({
            color: 'red',
            children: (
                <div>
                    <Text strong>Đơn hàng đã bị hủy</Text>
                    <br />
                    <Text type="secondary">{dayjs(order.order_date).add(2, 'hour').format('DD/MM/YYYY HH:mm')}</Text>
                </div>
            )
        })
    }

    return items
}

export default function OrderDetailComponent({ order, visible, onClose }: Props) {
    if (!order) return null

    return (
        <Modal
            title={`Chi tiết đơn hàng #${order.order_number}`}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={1200}
            className={styles.orderModal}
        >
            <div className={styles.orderDetail}>
                <Row gutter={[24, 24]}>
                    {/* Left Column - Order Status & Products */}
                    <Col xs={24} lg={14}>
                        {/* Order Status Timeline */}
                        <Card className={styles.detailCard}>
                            <Title level={5}>Trạng thái đơn hàng</Title>
                            <Timeline items={getTimelineItems(order)} />
                        </Card>

                        {/* Products List */}
                        <Card className={styles.detailCard} style={{ marginTop: '16px' }}>
                            <Title level={5}>Sản phẩm đã đặt ({order.order_details?.length || 0} sản phẩm)</Title>
                            <div className={styles.modalProducts}>
                                {(order.order_details ?? order.order_details)?.map((item: OrderDetail) => {
                                    const qty = item.quantity ?? 0;
                                    const total = item.total ?? (item.price * qty);
                                    const productName = item.product_name ?? item.product_name;
                                    const productImage = (item.product_image ?? item.product_image) || '';
                                    const price = item.price;

                                    return (
                                        <div key={item.id} className={styles.modalItem}>
                                            <div className={styles.productImageWrapper}>
                                                <Image
                                                    src={
                                                        mediaProductBaseUrl +
                                                        productImage
                                                    }
                                                    alt={productName}
                                                    width={80}
                                                    height={80}
                                                    style={{ objectFit: 'contain' }}
                                                    preview={{
                                                        mask: <div style={{ fontSize: '12px' }}>Xem ảnh</div>
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.modalItemInfo}>
                                                <Text strong className={styles.productName}>{productName}</Text>
                                                <div className={styles.productDetails}>
                                                    <Text type="secondary">Đơn giá: {CurrencyHelper.formatVND(price)} • Số lượng: x{qty}</Text>
                                                    <Text strong style={{ color: '#ff4d4f', fontSize: '15px' }}>
                                                        Thành tiền: {CurrencyHelper.formatVND(total)}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    </Col>

                    {/* Right Column - Order Info, Summary & Address */}
                    <Col xs={24} lg={10}>
                        {/* Order Info */}
                        <Card className={styles.detailCard}>
                            <Title level={5}>Thông tin đơn hàng</Title>
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Mã đơn hàng">
                                    <Text strong>{order.order_number}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày đặt">
                                    {dayjs(order.order_date).format('DD/MM/YYYY HH:mm')}
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Tag color={getOrderStatusColor(order.status)}>
                                        {getOrderStatusText(order.status)}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Phương thức thanh toán">
                                    {getPaymentMethodText(order.payment_method)}
                                </Descriptions.Item>
                                {order.tracking_number && (
                                    <Descriptions.Item label="Mã vận đơn">
                                        <Text code>{order.tracking_number}</Text>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>

                        {/* Order Summary */}
                        <Card className={styles.detailCard} style={{ marginTop: '16px' }}>
                            <Title level={5}>Tóm tắt thanh toán</Title>
                            <div className={styles.modalSummary}>
                                <div className={styles.summaryRow}>
                                    <Text>Tạm tính:</Text>
                                    <Text>{CurrencyHelper.formatVND(order.subtotal ?? 0)}</Text>
                                </div>
                                <div className={styles.summaryRow}>
                                    <Text>Phí vận chuyển:</Text>
                                    <Text>{CurrencyHelper.formatVND(order.shipping_fee ?? 0)}</Text>
                                </div>
                                {(order.discount ?? 0) > 0 && (
                                    <div className={styles.summaryRow}>
                                        <Text>Giảm giá:</Text>
                                        <Text style={{ color: '#52c41a' }}>-{CurrencyHelper.formatVND(order.discount ?? 0)}</Text>
                                    </div>
                                )}
                                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                    <Text strong>Tổng cộng:</Text>
                                    <Text strong className={styles.finalAmount}>
                                        {CurrencyHelper.formatVND(order.final_amount ?? order.total_price ?? 0)}
                                    </Text>
                                </div>
                            </div>
                        </Card>

                        {/* Shipping Address */}
                        <Card className={styles.detailCard} style={{ marginTop: '16px' }}>
                            <Title level={5}>Địa chỉ giao hàng</Title>
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Người nhận">
                                    <Text strong>
                                        {order.shipping_address_details?.fullName || order.customer_name}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">
                                    {order.shipping_address_details?.phone || order.phone_number}
                                </Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ">
                                    {order.shipping_address_details ?
                                        `${order.shipping_address_details.street}, ${order.shipping_address_details.ward}, ${order.shipping_address_details.district}, ${order.shipping_address_details.city}` :
                                        order.shipping_address
                                    }
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Notes if available */}
                        {order.notes && (
                            <Card className={styles.detailCard} style={{ marginTop: '16px' }}>
                                <Title level={5}>Ghi chú</Title>
                                <Text>{order.notes}</Text>
                            </Card>
                        )}
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}
