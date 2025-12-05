'use client'

import { mockOrders, formatCurrency, formatDate, Order } from '@/library/mocks/admin-mock-data'
import { Table, Tag, Space, Button } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import type { ColumnsType } from 'antd/es/table'
import styles from '../products/page.module.scss'

export default function AdminOrdersPage() {
  const router = useRouter()
  const getStatusColor = (status: number) => {
    const colors: Record<number, string> = {
      0: 'gold',
      1: 'blue',
      2: 'cyan',
      3: 'green',
      4: 'red',
    }
    return colors[status] || 'default'
  }

  const columns: ColumnsType<Order> = [
    {
      title: 'Mã ĐH',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => a.id - b.id,
      render: (id) => `#${id}`,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 180,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Số tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount) => formatCurrency(amount),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      filters: [
        { text: 'Chờ xác nhận', value: 0 },
        { text: 'Đang xử lý', value: 1 },
        { text: 'Đang giao', value: 2 },
        { text: 'Hoàn thành', value: 3 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, record) => (
        <Tag color={getStatusColor(status)}>
          {record.statusText}
        </Tag>
      ),
    },
    {
      title: 'Thời gian',
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
      render: (_, record: Order) => (
        <Space size="small">
          <Button 
            type="link"
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => router.push(`/admin/orders/${record.id}`)}
          >
            Chi tiết
          </Button>
          <Button 
            type="link"
            icon={<EditOutlined />} 
            size="small"
            onClick={() => router.push(`/admin/orders/${record.id}`)}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className={styles.header}>
        <h1>Quản lý đơn hàng</h1>
      </div>
      
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={mockOrders}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} đơn hàng`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          scroll={{ x: 1250 }}
        />
      </div>
    </div>
  )
}
