'use client'

import { Badge, Button, Card, Col, Descriptions, Divider, Row, Space, Steps, Table, Tag, Timeline } from 'antd'
import { ArrowLeftOutlined, PrinterOutlined } from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { formatCurrency } from '@/library/mocks/admin-mock-data'
import type { ColumnsType } from 'antd/es/table'

interface OrderItem {
  id: number
  productName: string
  quantity: number
  price: number
  total: number
}

// Mock chi tiết đơn hàng - trong thực tế sẽ fetch từ API
const getOrderDetail = (id: string) => {
  return {
    id: parseInt(id),
    customerName: 'Nguyễn Văn A',
    customerEmail: 'nguyenvana@email.com',
    customerPhone: '0123456789',
    totalAmount: 65470000,
    status: 2,
    statusText: 'Đang giao',
    shippingAddress: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    createdAt: '2024-12-05T10:30:00',
    paymentMethod: 'Chuyển khoản',
    shippingFee: 30000,
    discount: 550000,
    note: 'Giao hàng ngoài giờ hành chính',
    orderItems: [
      { id: 1, productName: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 29990000, total: 29990000 },
      { id: 2, productName: 'AirPods Pro 2', quantity: 2, price: 6490000, total: 12980000 },
      { id: 3, productName: 'Apple Watch Series 9', quantity: 2, price: 10990000, total: 21980000 },
      { id: 4, productName: 'MagSafe Charger', quantity: 1, price: 1070000, total: 1070000 },
    ],
    timeline: [
      { time: '2024-12-05 10:30', status: 'Đơn hàng đã được tạo', description: 'Chờ xác nhận từ người bán' },
      { time: '2024-12-05 11:15', status: 'Đã xác nhận đơn hàng', description: 'Đang chuẩn bị hàng' },
      { time: '2024-12-05 14:20', status: 'Đã bàn giao cho đơn vị vận chuyển', description: 'Mã vận đơn: GHTK123456789' },
      { time: '2024-12-05 16:45', status: 'Đang giao hàng', description: 'Shipper: Trần Văn B - 0987654321' },
    ]
  }
}

export default function AdminOrderDetailPage() {
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
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <strong>Phí vận chuyển:</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      {formatCurrency(order.shippingFee || 0)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <strong>Giảm giá:</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <span style={{ color: '#cf1322' }}>-{formatCurrency(order.discount || 0)}</span>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
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
                <Tag color="blue">{order.paymentMethod}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">
                {new Date(order.createdAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge
                  status={order.status === 3 ? 'success' : 'processing'}
                  text={order.status === 3 ? 'Đã thanh toán' : 'Chưa thanh toán'}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {order.note && (
            <Card title="Ghi chú">
              <p style={{ margin: 0, color: '#666' }}>{order.note}</p>
            </Card>
          )}

          <Card style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" block>
                Cập nhật trạng thái
              </Button>
              <Button block>Liên hệ khách hàng</Button>
              <Button danger block>
                Hủy đơn hàng
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
