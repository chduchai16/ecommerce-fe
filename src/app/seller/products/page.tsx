'use client'

import { Badge, Button, Space, Table, Tag } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import { mockSellerProducts, formatCurrency, getProductReviews } from '@/library/mocks/seller-mock-data'
import { ProductModal } from '@/components/shared/product-modal'
import type { ColumnsType } from 'antd/es/table'
import type { SellerProduct } from '@/library/mocks/seller-mock-data'
import { useState } from 'react'

const SellerProductsPage = () => {
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

  const handleAdd = () => {
    setSelectedProduct(null)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleSave = (values: any) => {
    console.log('Save product:', values)
  }

  const handleDelete = (record: SellerProduct) => {
    console.log('Delete product:', record.id)
  }
  const columns: ColumnsType<SellerProduct> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      filters: [
        { text: 'Điện thoại', value: 'Điện thoại' },
        { text: 'Laptop', value: 'Laptop' },
        { text: 'Tai nghe', value: 'Tai nghe' },
        { text: 'Tablet', value: 'Tablet' },
        { text: 'Đồng hồ', value: 'Đồng hồ' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 140,
      render: (value: number) => formatCurrency(value),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      width: 90,
      align: 'center',
      render: (value: number) => (
        <Badge
          count={value}
          showZero
          color={value === 0 ? 'red' : value < 15 ? 'orange' : 'green'}
          overflowCount={999}
        />
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      width: 90,
      align: 'center',
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (value?: number) => value ? (
        <span><StarFilled style={{ color: '#faad14' }} /> {value}</span>
      ) : '-',
      sorter: (a, b) => (a.rating || 0) - (b.rating || 0),
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 150,
      render: (value: number) => formatCurrency(value),
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (value: number) => (
        <Tag color={value === 1 ? 'success' : 'default'}>
          {value === 1 ? 'Đang bán' : 'Hết hàng'}
        </Tag>
      ),
      filters: [
        { text: 'Đang bán', value: 1 },
        { text: 'Hết hàng', value: 0 },
      ],
      onFilter: (value, record) => record.status === value,
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
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Sản phẩm của tôi</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockSellerProducts}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} sản phẩm`,
          pageSizeOptions: ['10', '20', '50'],
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

export default SellerProductsPage
