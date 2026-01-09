'use client'

import { Badge, Button, Card, Col, Descriptions, Divider, Modal, Row, Space, Steps, Table, Tag, Timeline, message, Spin } from 'antd'
import { ArrowLeftOutlined, PrinterOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ColumnsType } from 'antd/es/table'
import { useState, useEffect } from 'react'
import { OrderService } from '@/library/services/order-service'
import { Order } from '@/library/models/order/order'

const orderService = new OrderService()

export default function SellerOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrderDetail()
  }, [orderId])

  const fetchOrderDetail = async () => {
    try {
      setLoading(true)
      const data = await orderService.getOrderById(parseInt(orderId))
      
      // Fix data từ backend: tính lại quantity nếu bị 0, tính total_price nếu null
      if (data.order_details) {
        data.order_details = data.order_details.map((detail: any) => {
          // Tính lại quantity từ total/price nếu quantity = 0
          const correctedQuantity = detail.quantity === 0 && detail.total && detail.price 
            ? Math.round(detail.total / detail.price) 
            : (detail.quantity || 1)
          
          return {
            ...detail,
            quantity: correctedQuantity,
          }
        })
        
        // Cập nhật total_price nếu null
        if (!data.total_price && data.order_details.length > 0) {
          data.total_price = data.order_details.reduce((sum: number, d: any) => sum + (d.total || 0), 0)
        }
      }
      
      setOrder(data)
    } catch (error) {
      console.error('Failed to fetch order detail:', error)
      message.error('Không thể tải chi tiết đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (newStatus: number) => {
    if (!order) return
    
    try {
      // Calculate total_price if not available
      const calculatedTotalPrice = order.total_price || 
        (order.order_details?.reduce((sum, item) => sum + (item.total || 0), 0) || 0)

      // Map order_details từ OrderDetail sang OrderDetailDTO format
      const mappedOrderDetails = (order.order_details || []).map((detail) => ({
        id: detail.id,
        order_id: detail.order_id,
        product_id: detail.product_id,
        product_name: detail.product_name,
        product_image: detail.product_image,
        number_of_products: detail.quantity,
        price: detail.price,
        quantity: detail.quantity,
        total: detail.total,
        total_money: detail.total,
      }))

      const updatedOrder = {
        id: order.id,
        user_id: order.user_id,
        customer_name: order.customer_name,
        phone_number: order.phone_number,
        email: order.email,
        shipping_address: order.shipping_address,
        payment_method: order.payment_method,
        shipping_method: order.shipping_method,
        total_price: calculatedTotalPrice,
        status: newStatus,
        notes: order.notes,
        coupon_code: order.coupon_code,
        order_details: mappedOrderDetails,
      }
      const data = await orderService.updateOrder(updatedOrder)
      setOrder(data)
      message.success('Cập nhật trạng thái đơn hàng thành công')
    } catch (error) {
      console.error('Failed to update order status:', error)
      message.error('Không thể cập nhật trạng thái đơn hàng')
    }
  }

  const handleConfirmOrder = () => {
    if (order?.status === 0) {
      handleUpdateStatus(1)
    }
  }

  const handleShipping = () => {
    if (order?.status === 1) {
      handleUpdateStatus(2)
    }
  }

  const handleCancelOrder = () => {
    Modal.confirm({
      title: 'Hủy đơn hàng',
      content: 'Bạn chắc chắn muốn hủy đơn hàng này?',
      okText: 'Hủy đơn',
      cancelText: 'Không',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          const updatedOrder = { ...order, status: 4 }
          const data = await orderService.updateOrder(updatedOrder)
          setOrder(data)
          message.success('Đơn hàng đã được hủy')
        } catch (error) {
          console.error('Failed to cancel order:', error)
          message.error('Không thể hủy đơn hàng')
        }
      },
    })
  }

  const getStatusText = (status: number | undefined) => {
    const statusMap: { [key: number]: string } = {
      0: 'Chờ xác nhận',
      1: 'Đã xác nhận',
      2: 'Đang giao',
      3: 'Hoàn thành',
      4: 'Hủy',
    }
    return statusMap[status ?? -1] || 'Không xác định'
  }

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'default'
      case 1: return 'processing'
      case 2: return 'warning'
      case 3: return 'success'
      case 4: return 'error'
      default: return 'default'
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!order) {
    return (
      <Card>
        <p>Không tìm thấy đơn hàng</p>
        <Button type="primary" onClick={() => router.back()}>
          Quay lại
        </Button>
      </Card>
    )
  }



  const columns: ColumnsType<any> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      align: 'right',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      align: 'right',
      render: (value: number) => formatCurrency(value),
    },
  ]

  const subtotal = order.order_details ? order.order_details.reduce((sum, item) => sum + (item.total || 0), 0) : 0

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            Quay lại
          </Button>
          <h2 style={{ margin: 0 }}>Chi tiết đơn hàng #{order.id}</h2>
          <Tag color={getStatusColor(order.status ?? 0)}>{getStatusText(order.status)}</Tag>
        </Space>
        <Button icon={<PrinterOutlined />}>In đơn hàng</Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Thông tin đơn hàng" style={{ marginBottom: 16 }}>
            <Steps
              current={order.status}
              items={[
                { title: 'Chờ xác nhận' },
                { title: 'Đã xác nhận' },
                { title: 'Đang giao' },
                { title: 'Hoàn thành' },
              ]}
              style={{ marginBottom: 24 }}
            />

            <Divider orientation="left">Danh sách sản phẩm</Divider>
            <Table
              columns={columns}
              dataSource={order.order_details || []}
              rowKey="id"
              pagination={false}
              summary={() => (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <strong>Tạm tính:</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      {formatCurrency(subtotal)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  {(order.shipping_fee || 0) > 0 && (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3} align="right">
                        <strong>Phí vận chuyển:</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        {formatCurrency(order.shipping_fee || 0)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  {(order.discount || 0) > 0 && (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3} align="right">
                        <strong>Giảm giá:</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        <span style={{ color: '#cf1322' }}>-{formatCurrency(order.discount || 0)}</span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <strong style={{ fontSize: 16 }}>Tổng cộng:</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <strong style={{ fontSize: 16, color: '#cf1322' }}>
                        {formatCurrency(order.final_amount || subtotal)}
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )}
            />
          </Card>

          <Card title="Lịch sử đơn hàng">
            <Timeline
              items={[
                {
                  dot: order.status === 0 ? <div style={{ width: 12, height: 12, background: '#1890ff', borderRadius: '50%' }} /> : undefined,
                  children: (
                    <div>
                      <strong>Chờ xác nhận</strong>
                      <p style={{ color: '#999', marginBottom: 0 }}>
                        {order.order_date ? new Date(order.order_date).toLocaleString('vi-VN') : '-'}
                      </p>
                    </div>
                  ),
                  color: order.status >= 0 ? 'green' : 'gray',
                },
                {
                  children: (
                    <div>
                      <strong>Đã xác nhận</strong>
                      <p style={{ color: '#999', marginBottom: 0 }}>
                        {order.status >= 1 ? 'Đã xác nhận' : 'Đang chờ'}
                      </p>
                    </div>
                  ),
                  color: order.status >= 1 ? 'green' : 'gray',
                },
                {
                  children: (
                    <div>
                      <strong>Đang giao</strong>
                      <p style={{ color: '#999', marginBottom: 0 }}>
                        {order.status >= 2 ? 'Đang giao hàng' : 'Đang chờ'}
                      </p>
                    </div>
                  ),
                  color: order.status >= 2 ? 'green' : 'gray',
                },
                {
                  children: (
                    <div>
                      <strong>Hoàn thành</strong>
                      <p style={{ color: '#999', marginBottom: 0 }}>
                        {order.status === 3 ? new Date(order.delivered_date || '').toLocaleString('vi-VN') : 'Đang chờ'}
                      </p>
                    </div>
                  ),
                  color: order.status === 3 ? 'green' : 'gray',
                },
                {
                  children: (
                    <div>
                      <strong style={{ color: '#cf1322' }}>Hủy</strong>
                      <p style={{ color: '#999', marginBottom: 0 }}>
                        {order.status === 4 ? 'Đơn hàng đã bị hủy' : 'Không hủy'}
                      </p>
                    </div>
                  ),
                  color: order.status === 4 ? 'red' : 'gray',
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Thông tin khách hàng" style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Họ tên">{order.customer_name}</Descriptions.Item>
              <Descriptions.Item label="Email">{order.email || '-'}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{order.phone_number}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{order.shipping_address}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Thông tin thanh toán" style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Phương thức">
                <Tag color={order.payment_method === 'cod' ? 'orange' : 'blue'}>
                  {order.payment_method?.toUpperCase() || '-'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">
                {new Date(order.order_date || '').toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge
                  status={order.status === 3 ? 'success' : 'processing'}
                  text={getStatusText(order.status)}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {order.notes && (
            <Card title="Ghi chú đơn hàng" style={{ marginBottom: 16 }}>
              <p style={{ margin: 0, color: '#666' }}>{order.notes}</p>
            </Card>
          )}

          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              {order.status === 0 && (
                <Button type="primary" block onClick={handleConfirmOrder}>
                  Xác nhận đơn hàng
                </Button>
              )}
              {order.status === 1 && (
                <Button type="primary" block onClick={handleShipping}>
                  Bàn giao vận chuyển
                </Button>
              )}
              <Button block>In phiếu giao hàng</Button>
              <Button block>Liên hệ khách hàng</Button>
              {(order.status ?? 0) < 2 && (
                <Button danger block onClick={handleCancelOrder}>
                  Hủy đơn hàng
                </Button>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
