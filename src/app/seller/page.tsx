'use client'

import { Card, Col, Row, Statistic, Table, Tag } from 'antd'
import { DollarOutlined, InboxOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { mockSellerStats, mockSellerOrders, formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ColumnsType } from 'antd/es/table'
import type { SellerOrder } from '@/library/mocks/seller-mock-data'

const SellerPage = () => {
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'default'
      case 1: return 'processing'
      case 2: return 'warning'
      case 3: return 'success'
      default: return 'default'
    }
  }

  const columns: ColumnsType<SellerOrder> = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'SL',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 60,
      align: 'center',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusText',
      key: 'status',
      width: 130,
      render: (text: string, record: SellerOrder) => (
        <Tag color={getStatusColor(record.status)}>{text}</Tag>
      ),
    },
  ]

  const recentOrders = mockSellerOrders.slice(0, 10)

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Dashboard</h2>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={mockSellerStats.totalProducts}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={mockSellerStats.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={mockSellerStats.totalRevenue}
              prefix={<DollarOutlined />}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn chờ xử lý"
              value={mockSellerStats.pendingOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Đơn hàng gần đây">
        <Table
          columns={columns}
          dataSource={recentOrders}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default SellerPage