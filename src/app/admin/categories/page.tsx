'use client'

import { mockCategories, Category } from '@/library/mocks/admin-mock-data'
import { Button, Table, Tag, Space, Badge } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CategoryModal } from '@/components/admin/category-modal'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import styles from '../products/page.module.scss'

export default function AdminCategoriesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleAdd = () => {
    setSelectedCategory(null)
    setModalOpen(true)
  }

  const handleEdit = (record: Category) => {
    setSelectedCategory(record)
    setModalOpen(true)
  }

  const handleSave = (values: any) => {
    console.log('Save category:', values)
    // Thực hiện lưu dữ liệu vào API
  }

  const handleDelete = (record: Category) => {
    console.log('Delete category:', record.id)
    // Thực hiện xóa
  }
  const columns: ColumnsType<Category> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 350,
      ellipsis: true,
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'productCount',
      key: 'productCount',
      width: 130,
      align: 'center',
      sorter: (a, b) => a.productCount - b.productCount,
      render: (count) => <Badge count={count} showZero color="#1677ff" />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'Hoạt động', value: 1 },
        { text: 'Ẩn', value: 0 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? 'Hoạt động' : 'Ẩn'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_: any, record: Category) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            ghost
            onClick={() => handleEdit(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className={styles.header}>
        <h1>Quản lý danh mục</h1>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm danh mục
        </Button>
      </div>
      
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={mockCategories}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} danh mục`,
            pageSizeOptions: ['5', '10', '20'],
          }}
        />
      </div>

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
  )
}
