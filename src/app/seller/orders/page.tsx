'use client'

import { Button, Space, Table, Tag } from 'antd'
import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { mockSellerOrders, formatCurrency } from '@/library/mocks/seller-mock-data'
import { useRouter } from 'next/navigation'
import type { ColumnsType } from 'antd/es/table'
import type { SellerOrder } from '@/library/mocks/seller-mock-data'

const SellerOrdersPage = () => {
  const router = useRouter()
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 180,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      width: 250,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
      render: (value: number) => formatCurrency(value),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusText',
      key: 'status',
      width: 130,
      render: (text: string, record: SellerOrder) => (
        <Tag color={getStatusColor(record.status)}>{text}</Tag>
      ),
      filters: [
        { text: 'Chờ xác nhận', value: 0 },
        { text: 'Đang xử lý', value: 1 },
        { text: 'Đang giao', value: 2 },
        { text: 'Hoàn thành', value: 3 },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (value: string) => new Date(value).toLocaleString('vi-VN'),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_: any, record: SellerOrder) => (
        <Space size="small">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => router.push(`/seller/orders/${record.id}`)}>
            Chi tiết
          </Button>
          {record.status === 0 && (
            <Button type="link" icon={<CheckCircleOutlined />} size="small" onClick={() => router.push(`/seller/orders/${record.id}`)}>
              Xác nhận
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Đơn hàng</h2>

      <Table
        columns={columns}
        dataSource={mockSellerOrders}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} đơn hàng`,
          pageSizeOptions: ['10', '15', '20', '50'],
        }}
      />
    </div>
  )
}

export default SellerOrdersPage
