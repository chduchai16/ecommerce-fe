'use client'

import { Badge, Descriptions, Divider, Form, Input, InputNumber, List, Modal, Rate, Select, Tabs, Tag, message } from 'antd'
import { StarFilled, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ProductReview } from '@/library/mocks/seller-mock-data'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  sold: number
  category: string
  status: number
  revenue: number
  rating?: number
  reviewCount?: number
}

interface ProductModalProps {
  open: boolean
  onClose: () => void
  product: Product | null
  onSave: (values: any) => void
  mode: 'view' | 'edit'
  reviews?: ProductReview[]
}

export const ProductModal = ({ open, onClose, product, onSave, mode, reviews = [] }: ProductModalProps) => {
  const [form] = Form.useForm()
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>(mode)

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  useEffect(() => {
    if (open && product) {
      form.setFieldsValue(product)
    }
  }, [open, product, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
      message.success('Cập nhật sản phẩm thành công!')
      onClose()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleEdit = () => {
    setCurrentMode('edit')
  }

  if (!product) return null

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'red', text: 'Hết hàng' }
    if (stock < 15) return { color: 'orange', text: 'Sắp hết' }
    return { color: 'green', text: 'Còn hàng' }
  }

  const stockStatus = getStockStatus(product.stock)

  const tabItems = [
    {
      key: 'info',
      label: 'Thông tin sản phẩm',
      children: currentMode === 'view' ? (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID" span={2}>
            {product.id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={2}>
            {product.name}
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục" span={2}>
            <Tag>{product.category}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Giá bán">
            {formatCurrency(product.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Tồn kho">
            <Badge count={product.stock} showZero color={stockStatus.color} overflowCount={999} />
            <span style={{ marginLeft: 8 }}>{stockStatus.text}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Đã bán">
            {product.sold}
          </Descriptions.Item>
          <Descriptions.Item label="Doanh thu">
            {formatCurrency(product.revenue)}
          </Descriptions.Item>
          <Descriptions.Item label="Đánh giá">
            {product.rating ? (
              <>
                <Rate disabled value={product.rating} style={{ fontSize: 14 }} />
                <span style={{ marginLeft: 8 }}>
                  {product.rating} ({reviews.length} đánh giá)
                </span>
              </>
            ) : (
              'Chưa có đánh giá'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={product.status === 1 ? 'success' : 'default'}>
              {product.status === 1 ? 'Đang bán' : 'Hết hàng'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select>
              <Select.Option value="Điện thoại">Điện thoại</Select.Option>
              <Select.Option value="Laptop">Laptop</Select.Option>
              <Select.Option value="Tai nghe">Tai nghe</Select.Option>
              <Select.Option value="Tablet">Tablet</Select.Option>
              <Select.Option value="Đồng hồ">Đồng hồ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá bán"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              addonAfter="VND"
            />
          </Form.Item>

          <Form.Item
            label="Tồn kho"
            name="stock"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Select.Option value={1}>Đang bán</Select.Option>
              <Select.Option value={0}>Hết hàng</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      )
    },
    {
      key: 'reviews',
      label: `Đánh giá (${reviews.length})`,
      children: (
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {reviews.length > 0 ? (
            <List
              dataSource={reviews}
              renderItem={(review) => (
                <List.Item key={review.id}>
                  <List.Item.Meta
                    avatar={<UserOutlined style={{ fontSize: 24, color: '#1677ff' }} />}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{review.userName}</span>
                        <span style={{ fontSize: 12, color: '#999' }}>
                          {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    }
                    description={
                      <>
                        <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
                        <p style={{ marginTop: 8, marginBottom: 0 }}>{review.comment}</p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              Chưa có đánh giá nào
            </div>
          )}
        </div>
      )
    }
  ]

  return (
    <Modal
      title={currentMode === 'view' ? 'Chi tiết sản phẩm' : 'Chỉnh sửa sản phẩm'}
      open={open}
      onCancel={onClose}
      onOk={currentMode === 'edit' ? handleSubmit : handleEdit}
      okText={currentMode === 'edit' ? 'Lưu' : 'Chỉnh sửa'}
      cancelText="Đóng"
      width={800}
    >
      <Tabs defaultActiveKey="info" items={tabItems} style={{ marginTop: 24 }} />
    </Modal>
  )
}
