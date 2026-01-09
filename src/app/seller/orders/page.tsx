'use client'

import { Button, Space, Table, Tag, Card, Row, Col, Input, Select, InputNumber, message } from 'antd'
import { EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { formatCurrency } from '@/library/mocks/seller-mock-data'
import { useRouter } from 'next/navigation'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useState, useEffect } from 'react'
import { OrderService } from '@/library/services/order-service'
import { useAuth } from '@/contexts/auth-context'
import { Order } from '@/library/models/order/order'

const orderService = new OrderService()

const SellerOrdersPage = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  })

  // Filter states
  const [filters, setFilters] = useState({
    customerName: undefined as string | undefined,
    shippingAddress: undefined as string | undefined,
    minTotalAmount: undefined as number | undefined,
    maxTotalAmount: undefined as number | undefined,
    status: undefined as number | undefined,
  })

  useEffect(() => {
    if (user?.id) {
      fetchOrders()
    }
  }, [user?.id, pagination.current, pagination.pageSize, filters])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params: any = {
        page: pagination.current - 1,
        limit: pagination.pageSize,
      }

      if (filters.customerName) params.customerName = filters.customerName
      if (filters.shippingAddress) params.shippingAddress = filters.shippingAddress
      if (filters.minTotalAmount !== undefined) params.minTotalAmount = filters.minTotalAmount
      if (filters.maxTotalAmount !== undefined) params.maxTotalAmount = filters.maxTotalAmount
      if (filters.status !== undefined) params.status = filters.status

      const response = await orderService.getSellerOrders(params)

      if (response) {
        setOrders(response.page_content || [])
        setPagination(prev => ({
          ...prev,
          total: response.pagination_info?.total_elements || 0,
        }))
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      message.error('Không thể tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status: number) => {
    const statusMap: { [key: number]: string } = {
      0: 'Chờ xác nhận',
      1: 'Đã xác nhận',
      2: 'Đang giao',
      3: 'Hoàn thành',
      4: 'Hủy',
    }
    return statusMap[status] || 'Không xác định'
  }

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'default'
      case 1: return 'processing'
      case 2: return 'warning'
      case 3: return 'success'
      case 4: return 'error'
      default: return 'default'
    }
  }

  // Tính tổng tiền từ order_details nếu total_price là null
  const calculateTotalPrice = (order: Order): number => {
    if (order.total_price) {
      return order.total_price
    }
    if (order.order_details && order.order_details.length > 0) {
      return order.order_details.reduce((sum, item) => sum + (item.total || 0), 0)
    }
    return 0
  }

  // Tính thành tiền (giống total_price vì final_amount cũng null)
  const calculateFinalAmount = (order: Order): number => {
    if (order.final_amount) {
      return order.final_amount
    }
    return calculateTotalPrice(order) - (order.discount || 0) + (order.shipping_fee || 0)
  }

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  const handleResetFilters = () => {
    setFilters({
      customerName: undefined,
      shippingAddress: undefined,
      minTotalAmount: undefined,
      maxTotalAmount: undefined,
      status: undefined,
    })
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 12,
      total: pagination.total,
    })
  }

  const columns: ColumnsType<Order> = [
    {
      title: 'Mã đơn',
      dataIndex: 'order_number',
      key: 'order_number',
      width: 120,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 150,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 120,
    },
    {
      title: 'Địa chỉ giao',
      dataIndex: 'shipping_address',
      key: 'shipping_address',
      width: 200,
      render: (text: string) => (
        <span title={text} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 130,
      render: (value: number | undefined, record: Order) => formatCurrency(calculateTotalPrice(record)),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'final_amount',
      key: 'final_amount',
      width: 130,
      render: (value: number | undefined, record: Order) => formatCurrency(calculateFinalAmount(record)),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: number) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'order_date',
      key: 'order_date',
      width: 160,
      render: (value?: string) => value ? new Date(value).toLocaleString('vi-VN') : '-',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_: any, record: Order) => (
        <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => router.push(`/seller/orders/${record.id}`)}>
          Chi tiết
        </Button>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Đơn hàng</h2>
      </div>

      {/* Filter Section */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tên khách hàng"
              value={filters.customerName}
              onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Địa chỉ giao hàng"
              value={filters.shippingAddress}
              onChange={(e) => setFilters({ ...filters, shippingAddress: e.target.value })}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Trạng thái"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              allowClear
            >
              <Select.Option value={0}>Chờ xác nhận</Select.Option>
              <Select.Option value={1}>Đã xác nhận</Select.Option>
              <Select.Option value={2}>Đang giao</Select.Option>
              <Select.Option value={3}>Hoàn thành</Select.Option>
              <Select.Option value={4}>Hủy</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} block>
              Tìm kiếm
            </Button>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <InputNumber
              placeholder="Tổng tiền tối thiểu"
              style={{ width: '100%' }}
              value={filters.minTotalAmount}
              onChange={(value) => setFilters({ ...filters, minTotalAmount: value || undefined })}
              min={0}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <InputNumber
              placeholder="Tổng tiền tối đa"
              style={{ width: '100%' }}
              value={filters.maxTotalAmount}
              onChange={(value) => setFilters({ ...filters, maxTotalAmount: value || undefined })}
              min={0}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Button onClick={handleResetFilters} block>
              Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1400 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} đơn hàng`,
          pageSizeOptions: ['12', '20', '50'],
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default SellerOrdersPage
