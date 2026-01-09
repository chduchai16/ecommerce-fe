'use client'

import { Badge, Button, Card, Col, Progress, Row, Space, Statistic, Table, Modal, Form, Input, InputNumber, message, Spin, Tag } from 'antd'
import { InboxOutlined, WarningOutlined, CheckCircleOutlined, ImportOutlined, ExportOutlined, HistoryOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ColumnsType } from 'antd/es/table'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { InventoryService, InventoryProduct, InventoryStats } from '@/library/services/inventory-service'
import { PageResponse } from '@/common/models/page-response'

const inventoryService = new InventoryService()

const SellerInventoryPage = () => {
  const router = useRouter()
  const [products, setProducts] = useState<InventoryProduct[]>([])
  const [stats, setStats] = useState<InventoryStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15, total: 0 })
  const [form] = Form.useForm()
  const [importModalVisible, setImportModalVisible] = useState(false)
  const [exportModalVisible, setExportModalVisible] = useState(false)
  const [adjustModalVisible, setAdjustModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Initial load
  useEffect(() => {
    fetchProducts()
  }, [])

  // Refetch when pagination changes
  useEffect(() => {
    if (pagination.current > 1) {
      fetchProducts()
    }
  }, [pagination.current, pagination.pageSize])

  const fetchStats = async () => {
    try {
      const data = await inventoryService.getInventoryStats()
      setStats(data)
    } catch (error) {
      console.error('Lỗi lấy thống kê:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await inventoryService.getSellerInventory(
        pagination.current - 1,
        pagination.pageSize
      )
      setProducts(data.page_content)
      setPagination(prev => ({
        ...prev,
        total: data.pagination_info.total_elements,
      }))
    } catch (error) {
      console.error('Lỗi lấy danh sách sản phẩm:', error)
      message.error('Không thể tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async (values: any) => {
    if (!selectedProduct) return
    try {
      setActionLoading(true)
      await inventoryService.importStock(selectedProduct.id, values.quantity, values.note)
      message.success('Nhập kho thành công')
      setImportModalVisible(false)
      form.resetFields()
      fetchProducts()
      fetchStats()
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Lỗi nhập kho')
    } finally {
      setActionLoading(false)
    }
  }

  const handleExport = async (values: any) => {
    if (!selectedProduct) return
    try {
      setActionLoading(true)
      await inventoryService.exportStock(selectedProduct.id, values.quantity, values.reason)
      message.success('Xuất kho thành công')
      setExportModalVisible(false)
      form.resetFields()
      fetchProducts()
      fetchStats()
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Lỗi xuất kho')
    } finally {
      setActionLoading(false)
    }
  }

  const handleAdjust = async (values: any) => {
    if (!selectedProduct) return
    try {
      setActionLoading(true)
      await inventoryService.adjustStock(selectedProduct.id, values.newQuantity, values.reason)
      message.success('Điều chỉnh tồn kho thành công')
      setAdjustModalVisible(false)
      form.resetFields()
      fetchProducts()
      fetchStats()
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Lỗi điều chỉnh')
    } finally {
      setActionLoading(false)
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'red', text: 'Hết hàng' }
    if (stock < 10) return { color: 'orange', text: 'Sắp hết' }
    return { color: 'green', text: 'Còn hàng' }
  }

  const columns: ColumnsType<InventoryProduct> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string, record: InventoryProduct) => (
        <div>
          <strong>{text}</strong>
          <br />
          <small style={{ color: '#999' }}>{record.brand || '-'}</small>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category_name',
      key: 'category_name',
      width: 120,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock_quantity',
      key: 'stock_quantity',
      width: 100,
      align: 'center',
      render: (value: number) => {
        const status = getStockStatus(value)
        return (
          <Badge count={value} showZero color={status.color} overflowCount={999} />
        )
      },
      sorter: (a, b) => a.stock_quantity - b.stock_quantity,
    },
    {
      title: 'Đã bán',
      dataIndex: 'total_sold',
      key: 'total_sold',
      width: 100,
      align: 'center',
      sorter: (a, b) => (a.total_sold || 0) - (b.total_sold || 0),
    },
    {
      title: 'Tỷ lệ tồn',
      key: 'stockRate',
      width: 150,
      render: (_: any, record: InventoryProduct) => {
        const total = (record.stock_quantity || 0) + (record.total_sold || 0)
        const rate = total > 0 ? (record.stock_quantity / total) * 100 : 0
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
      render: (_: any, record: InventoryProduct) => {
        const status = getStockStatus(record.stock_quantity)
        return <Badge status={status.color === 'red' ? 'error' : status.color === 'orange' ? 'warning' : 'success'} text={status.text} />
      },
      filters: [
        { text: 'Hết hàng', value: 'out' },
        { text: 'Sắp hết', value: 'low' },
        { text: 'Còn hàng', value: 'in' },
      ],
      onFilter: (value, record) => {
        if (value === 'out') return record.stock_quantity === 0
        if (value === 'low') return record.stock_quantity > 0 && record.stock_quantity < 10
        return record.stock_quantity >= 10
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 130,
      align: 'right',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (_: any, record: InventoryProduct) => (
        <Space size="small" wrap>
          <Button
            type="primary"
            size="small"
            icon={<ImportOutlined />}
            onClick={() => {
              setSelectedProduct(record)
              setImportModalVisible(true)
              form.resetFields()
            }}
          >
            Nhập
          </Button>
          <Button
            size="small"
            icon={<ExportOutlined />}
            onClick={() => {
              setSelectedProduct(record)
              setExportModalVisible(true)
              form.resetFields()
            }}
            disabled={record.stock_quantity === 0}
          >
            Xuất
          </Button>
          <Button
            size="small"
            onClick={() => {
              setSelectedProduct(record)
              setAdjustModalVisible(true)
              form.resetFields()
            }}
          >
            Điều chỉnh
          </Button>
          <Button size="small" icon={<HistoryOutlined />}>
            Lịch sử
          </Button>
        </Space>
      ),
    },
  ]

  const inStock = products.filter(p => p.stock_quantity >= 10).length
  const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 10).length
  const outOfStock = products.filter(p => p.stock_quantity === 0).length

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
          Quay lại
        </Button>
        <h2 style={{ margin: '16px 0 0 0' }}>Quản lý kho hàng</h2>
      </div>

      {/* Statistics */}
      {stats && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng sản phẩm"
                value={stats.total_products}
                prefix={<InboxOutlined />}
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Còn hàng"
                value={products.filter(p => p.stock_quantity >= 10).length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Sắp hết hàng"
                value={products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 10).length}
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Hết hàng"
                value={stats.warning_count}
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Table */}
      <Card loading={loading}>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          scroll={{ x: 1300 }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize, total: pagination.total })
            },
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20', '50'],
            showTotal: (total) => `Tổng ${total} sản phẩm`,
          }}
        />
      </Card>

      {/* Import Modal */}
      <Modal
        title={`Nhập kho - ${selectedProduct?.name}`}
        open={importModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setImportModalVisible(false)
          form.resetFields()
        }}
        confirmLoading={actionLoading}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleImport}>
          <Form.Item
            label="Số lượng nhập"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={3} placeholder="Ghi chú về nhập kho..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Export Modal */}
      <Modal
        title={`Xuất kho - ${selectedProduct?.name}`}
        open={exportModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setExportModalVisible(false)
          form.resetFields()
        }}
        confirmLoading={actionLoading}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleExport}>
          <Form.Item label="Số lượng hiện có">
            <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
              <strong>{selectedProduct?.stock_quantity || 0}</strong>
            </div>
          </Form.Item>
          <Form.Item
            label="Số lượng xuất"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              {
                validator: (_, value) => {
                  if (value && value > (selectedProduct?.stock_quantity || 0)) {
                    return Promise.reject(new Error('Số lượng vượt quá tồn kho'))
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <InputNumber min={1} max={selectedProduct?.stock_quantity} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Lý do xuất" name="reason">
            <Input.TextArea rows={3} placeholder="Lý do xuất kho..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Adjust Modal */}
      <Modal
        title={`Điều chỉnh tồn kho - ${selectedProduct?.name}`}
        open={adjustModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setAdjustModalVisible(false)
          form.resetFields()
        }}
        confirmLoading={actionLoading}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleAdjust}>
          <Form.Item label="Số lượng hiện có">
            <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
              <strong>{selectedProduct?.stock_quantity || 0}</strong>
            </div>
          </Form.Item>
          <Form.Item
            label="Số lượng mới"
            name="newQuantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Lý do điều chỉnh" name="reason">
            <Input.TextArea rows={3} placeholder="Lý do điều chỉnh..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SellerInventoryPage
