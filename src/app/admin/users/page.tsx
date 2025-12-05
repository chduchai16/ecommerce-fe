'use client'

import { mockUsers, formatDate, getUserStatusText, User } from '@/library/mocks/admin-mock-data'
import { Button, Table, Tag, Space, Badge } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined, CrownOutlined } from '@ant-design/icons'
import { UserModal } from '@/components/admin/user-modal'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import styles from '../products/page.module.scss'

export default function AdminUsersPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view')

  const handleView = (record: User) => {
    setSelectedUser(record)
    setModalMode('view')
    setModalOpen(true)
  }

  const handleEdit = (record: User) => {
    setSelectedUser(record)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleSave = (values: any) => {
    console.log('Save user:', values)
  }

  const handleDelete = (record: User) => {
    console.log('Delete user:', record.id)
  }
  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 130,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Seller', value: 'seller' },
        { text: 'Customer', value: 'customer' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        if (role === 'admin') {
          return <Tag icon={<CrownOutlined />} color="gold">Admin</Tag>
        }
        if (role === 'seller') {
          return <Tag color="blue">Seller</Tag>
        }
        return <Tag>Customer</Tag>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'Hoạt động', value: 1 },
        { text: 'Đã khóa', value: 0 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Badge 
          status={status === 1 ? 'success' : 'error'} 
          text={getUserStatusText(status)} 
        />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_: any, record: User) => (
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
        <h1>Quản lý người dùng</h1>
      </div>
      
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={mockUsers}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          scroll={{ x: 1400 }}
        />
      </div>

      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
        mode={modalMode}
      />
    </div>
  )
}
