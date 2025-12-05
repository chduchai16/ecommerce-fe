'use client'

import { mockProducts, formatCurrency, getProductStatusText, Product } from '@/library/mocks/admin-mock-data'
import { mockProductReviews, getProductReviews } from '@/library/mocks/seller-mock-data'
import { Button, Table, Tag, Space } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined, StarFilled, PlusOutlined } from '@ant-design/icons'
import { ProductModal } from '@/components/shared/product-modal'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import styles from './page.module.scss'

export default function AdminProductsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view')

  const handleView = (record: Product) => {
    setSelectedProduct(record)
    setModalMode('view')
    setModalOpen(true)
  }

  const handleEdit = (record: Product) => {
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

  const handleDelete = (record: Product) => {
    console.log('Delete product:', record.id)
  }
  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
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
      width: 150,
      sorter: (a, b) => a.price - b.price,
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <span style={{ color: stock > 0 ? '#52c41a' : '#ff4d4f', fontWeight: 500 }}>
          {stock}
        </span>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 110,
      sorter: (a, b) => (a.rating || 0) - (b.rating || 0),
      render: (rating) => rating && (
        <span>
          <StarFilled style={{ color: '#faad14', marginRight: 4 }} />
          {rating}
        </span>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 110,
      sorter: (a, b) => (a.views || 0) - (b.views || 0),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'Đang bán', value: 1 },
        { text: 'Ngừng bán', value: 0 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {getProductStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link"
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button 
            type="link"
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button 
            type="link"
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className={styles.header}>
        <h1>Quản lý sản phẩm</h1>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm sản phẩm mới
        </Button>
      </div>
      
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={mockProducts}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          scroll={{ x: 1300 }}
        />
      </div>

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
