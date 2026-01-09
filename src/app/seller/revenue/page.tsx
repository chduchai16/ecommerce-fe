'use client'

import { Card, Col, Row, Statistic, Table, Tag } from 'antd'
import { DollarOutlined, RiseOutlined, FallOutlined, LineChartOutlined } from '@ant-design/icons'
import { mockSellerProducts, mockSellerOrders, formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ColumnsType } from 'antd/es/table'

interface RevenueProduct {
  id: number
  name: string
  sold: number
  revenue: number
  avgPrice: number
}

const SellerRevenuePage = () => {
  const totalRevenue = mockSellerProducts.reduce((sum, p) => sum + p.revenue, 0)
  const totalOrders = mockSellerOrders.length
  const completedOrders = mockSellerOrders.filter(o => o.status === 3).length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Top 10 sản phẩm theo doanh thu
  const topProducts: RevenueProduct[] = mockSellerProducts
    .map(p => ({
      id: p.id,
      name: p.name,
      sold: p.sold,
      revenue: p.revenue,
      avgPrice: p.sold > 0 ? p.revenue / p.sold : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)

  const columns: ColumnsType<RevenueProduct> = [
    {
      title: 'Hạng',
      key: 'rank',
      width: 70,
      align: 'center',
      render: (_: any, __: RevenueProduct, index: number) => {
        const colors = ['#FFD700', '#C0C0C0', '#CD7F32']
        return (
          <Tag color={index < 3 ? colors[index] : 'default'}>
            {index + 1}
          </Tag>
        )
      },
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 180,
      render: (value: number) => formatCurrency(value),
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'Giá TB/SP',
      dataIndex: 'avgPrice',
      key: 'avgPrice',
      width: 150,
      render: (value: number) => formatCurrency(value),
    },
    {
      title: '% Đóng góp',
      key: 'contribution',
      width: 120,
      render: (_: any, record: RevenueProduct) => {
        const percentage = (record.revenue / totalRevenue * 100).toFixed(1)
        return `${percentage}%`
      },
    },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Doanh thu</h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đơn hàng hoàn thành"
              value={completedOrders}
              suffix={`/ ${totalOrders}`}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Giá trị TB/Đơn"
              value={avgOrderValue}
              prefix={<LineChartOutlined />}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ hoàn thành"
              value={(completedOrders / totalOrders * 100).toFixed(1)}
              suffix="%"
              prefix={totalOrders > 0 && completedOrders / totalOrders > 0.7 ? <RiseOutlined /> : <FallOutlined />}
              valueStyle={{ color: completedOrders / totalOrders > 0.7 ? '#3f8600' : '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Top 10 sản phẩm bán chạy">
        <Table
          columns={columns}
          dataSource={topProducts}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default SellerRevenuePage
