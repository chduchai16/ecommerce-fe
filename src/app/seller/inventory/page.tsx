'use client'

import { Badge, Button, Card, Col, Progress, Row, Space, Statistic, Table } from 'antd'
import { InboxOutlined, WarningOutlined, CheckCircleOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { mockSellerProducts, formatCurrency, getProductReviews } from '@/library/mocks/seller-mock-data'
import { ProductModal } from '@/components/shared/product-modal'
import type { ColumnsType } from 'antd/es/table'
import type { SellerProduct } from '@/library/mocks/seller-mock-data'
import { useState } from 'react'

const SellerInventoryPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<SellerProduct | null>(null)
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view')

  const handleView = (record: SellerProduct) => {
    setSelectedProduct(record)
    setModalMode('view')
    setModalOpen(true)
  }

  const handleEdit = (record: SellerProduct) => {
    setSelectedProduct(record)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleSave = (values: any) => {
    console.log('Update stock:', values)
  }
  const totalProducts = mockSellerProducts.length
  const outOfStock = mockSellerProducts.filter(p => p.stock === 0).length
  const lowStock = mockSellerProducts.filter(p => p.stock > 0 && p.stock < 15).length
  const inStock = mockSellerProducts.filter(p => p.stock >= 15).length

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'red', text: 'Hết hàng' }
    if (stock < 15) return { color: 'orange', text: 'Sắp hết' }
    return { color: 'green', text: 'Còn hàng' }
  }

  const columns: ColumnsType<SellerProduct> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      width: 120,
      align: 'center',
      render: (value: number) => {
        const status = getStockStatus(value)
        return (
          <Badge count={value} showZero color={status.color} overflowCount={999} />
        )
      },
      sorter: (a, b) => a.stock - b.stock,
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
      title: 'Tỷ lệ tồn',
      key: 'stockRate',
      width: 150,
      render: (_: any, record: SellerProduct) => {
        const total = record.stock + record.sold
        const rate = total > 0 ? (record.stock / total) * 100 : 0
        return (
          <Progress
            percent={Number(rate.toFixed(1))}
            size="small"
            status={rate < 20 ? 'exception' : rate < 50 ? 'normal' : 'success'}
          />
        )
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 110,
      render: (_: any, record: SellerProduct) => {
        const status = getStockStatus(record.stock)
        return <Badge status={status.color === 'red' ? 'error' : status.color === 'orange' ? 'warning' : 'success'} text={status.text} />
      },
      filters: [
        { text: 'Hết hàng', value: 'out' },
        { text: 'Sắp hết', value: 'low' },
        { text: 'Còn hàng', value: 'in' },
      ],
      onFilter: (value, record) => {
        if (value === 'out') return record.stock === 0
        if (value === 'low') return record.stock > 0 && record.stock < 15
        return record.stock >= 15
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 130,
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_: any, record: SellerProduct) => (
        <Space size="small">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            Nhập hàng
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Quản lý kho hàng</h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={totalProducts}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Còn hàng"
              value={inStock}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sắp hết hàng"
              value={lowStock}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Hết hàng"
              value={outOfStock}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={mockSellerProducts}
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} sản phẩm`,
          pageSizeOptions: ['10', '15', '20', '50'],
        }}
      />

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
        mode={modalMode}
        reviews={selectedProduct ? getProductReviews(selectedProduct.id) : []}
      />
    </div>
  )
}

export default SellerInventoryPage
