'use client'

import { Badge, Button, Card, Col, Descriptions, Divider, Row, Space, Steps, Table, Tag, Timeline } from 'antd'
import { ArrowLeftOutlined, PrinterOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ColumnsType } from 'antd/es/table'

interface OrderItem {
  id: number
  productName: string
  quantity: number
  price: number
  total: number
}

// Mock chi tiết đơn hàng
const getOrderDetail = (id: string) => {
  return {
    id: parseInt(id),
    customerName: 'Trần Thị B',
    customerEmail: 'tranthib@email.com',
    customerPhone: '0987654321',
    totalAmount: 52990000,
    status: 2,
    statusText: 'Đang giao',
    shippingAddress: '456 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    createdAt: '2024-12-05T09:15:00',
    paymentMethod: 'COD',
    shippingFee: 0,
    discount: 0,
    note: 'Kiểm tra kỹ hàng trước khi giao',
    orderItems: [
      { id: 1, productName: 'MacBook Pro 14" M3 512GB', quantity: 1, price: 52990000, total: 52990000 },
    ],
    timeline: [
      { time: '2024-12-05 09:15', status: 'Đơn hàng đã được tạo', description: 'Khách hàng đã đặt hàng' },
      { time: '2024-12-05 10:00', status: 'Đã xác nhận đơn hàng', description: 'Đã xác nhận và đang chuẩn bị hàng' },
      { time: '2024-12-05 13:30', status: 'Đã đóng gói', description: 'Sản phẩm đã được đóng gói cẩn thận' },
      { time: '2024-12-05 15:00', status: 'Đã bàn giao vận chuyển', description: 'Mã vận đơn: VNP987654321' },
    ]
  }
}

export default function SellerOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const order = getOrderDetail(orderId)

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'default'
      case 1: return 'processing'
      case 2: return 'warning'
      case 3: return 'success'
      default: return 'default'
    }
  }

  const getCurrentStep = (status: number) => {
    switch (status) {
      case 0: return 0
      case 1: return 1
      case 2: return 2
      case 3: return 3
      default: return 0
    }
  }

  const columns: ColumnsType<OrderItem> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
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

  const subtotal = order.orderItems.reduce((sum, item) => sum + item.total, 0)

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            Quay lại
          </Button>
          <h2 style={{ margin: 0 }}>Chi tiết đơn hàng #{order.id}</h2>
          <Tag color={getStatusColor(order.status)}>{order.statusText}</Tag>
        </Space>
        <Button icon={<PrinterOutlined />}>In đơn hàng</Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Thông tin đơn hàng" style={{ marginBottom: 16 }}>
            <Steps
              current={getCurrentStep(order.status)}
              items={[
                { title: 'Chờ xác nhận' },
                { title: 'Đang xử lý' },
                { title: 'Đang giao' },
                { title: 'Hoàn thành' },
              ]}
              style={{ marginBottom: 24 }}
            />

            <Divider orientation="left">Danh sách sản phẩm</Divider>
            <Table
              columns={columns}
              dataSource={order.orderItems}
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
                  {order.shippingFee > 0 && (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3} align="right">
                        <strong>Phí vận chuyển:</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        {formatCurrency(order.shippingFee)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  {order.discount > 0 && (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3} align="right">
                        <strong>Giảm giá:</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        <span style={{ color: '#cf1322' }}>-{formatCurrency(order.discount)}</span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <strong style={{ fontSize: 16 }}>Tổng cộng:</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <strong style={{ fontSize: 16, color: '#cf1322' }}>
                        {formatCurrency(order.totalAmount)}
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )}
            />
          </Card>

          <Card title="Lịch sử đơn hàng">
            <Timeline
              items={order.timeline.map(item => ({
                children: (
                  <>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{item.status}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: 13 }}>{item.description}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#999', fontSize: 12 }}>{item.time}</p>
                  </>
                )
              }))}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Thông tin khách hàng" style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Họ tên">{order.customerName}</Descriptions.Item>
              <Descriptions.Item label="Email">{order.customerEmail}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{order.customerPhone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{order.shippingAddress}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Thông tin thanh toán" style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Phương thức">
                <Tag color={order.paymentMethod === 'COD' ? 'orange' : 'blue'}>{order.paymentMethod}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">
                {new Date(order.createdAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge
                  status={order.status === 3 ? 'success' : 'processing'}
                  text={order.status === 3 ? 'Đã thanh toán' : order.paymentMethod === 'COD' ? 'Thu hộ COD' : 'Chưa thanh toán'}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {order.note && (
            <Card title="Ghi chú đơn hàng" style={{ marginBottom: 16 }}>
              <p style={{ margin: 0, color: '#666' }}>{order.note}</p>
            </Card>
          )}

          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              {order.status === 0 && (
                <Button type="primary" block>
                  Xác nhận đơn hàng
                </Button>
              )}
              {order.status === 1 && (
                <Button type="primary" block>
                  Bàn giao vận chuyển
                </Button>
              )}
              <Button block>In phiếu giao hàng</Button>
              <Button block>Liên hệ khách hàng</Button>
              {order.status < 2 && (
                <Button danger block>
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
