'use client'

import { Badge, Descriptions, Divider, Form, Input, InputNumber, List, Modal, Rate, Select, Tabs, Tag, message, Upload, Row, Col } from 'antd'
import { StarFilled, UserOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { formatCurrency } from '@/library/mocks/seller-mock-data'
import type { ProductReview } from '@/library/mocks/seller-mock-data'
import type { UploadFile } from 'antd/es/upload/interface'
import { Product } from '@/library/models/product/product'


interface ProductModalProps {
  open: boolean
  onClose: () => void
  product: Product | null
  onSave: (values: any) => void
  mode: 'view' | 'edit'
  reviews?: ProductReview[]
  categories?: any[]
}

export const ProductModal = ({ open, onClose, product, onSave, mode, reviews = [], categories = [] }: ProductModalProps) => {
  const [form] = Form.useForm()
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>(mode)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  useEffect(() => {
    if (open) {
      if (product) {
        form.setFieldsValue({
          ...product,
          status: product.status ?? 0, // Đảm bảo status có giá trị, mặc định 0
        })
        // Load existing images if any
        setFileList([])
      } else {
        form.resetFields()
        form.setFieldsValue({ status: 0 }) // Mặc định status = 0 cho sản phẩm mới
        setFileList([])
      }
    }
  }, [open, product, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
      onClose()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleEdit = () => {
    setCurrentMode('edit')
  }

  // Cho phép modal mở khi không có product (trường hợp thêm mới)
  const isAddMode = !product && currentMode === 'edit'

  const getStockStatus = (stock?: number) => {
    if (!stock || stock === 0) return { color: 'red', text: 'Hết hàng' }
    if (stock < 15) return { color: 'orange', text: 'Sắp hết' }
    return { color: 'green', text: 'Còn hàng' }
  }

  const stockStatus = product ? getStockStatus(product.stock_quantity) : { color: 'green', text: 'Còn hàng' }

  const tabItems = [
    {
      key: 'info',
      label: 'Thông tin sản phẩm',
      children: currentMode === 'view' && product ? (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID" span={2}>
            {product.id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={2}>
            {product.name}
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục" span={2}>
            <Tag>{product.category_name}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Giá bán">
            {formatCurrency(product.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Giá gốc">
            {product.original_price ? formatCurrency(product.original_price) : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Tồn kho">
            <Badge count={product.stock_quantity || 0} showZero color={stockStatus.color} overflowCount={999} />
            <span style={{ marginLeft: 8 }}>{stockStatus.text}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Lượt xem">
            {product.views || 0}
          </Descriptions.Item>
          <Descriptions.Item label="Đánh giá">
            {product.average_rating ? (
              <>
                <Rate disabled value={product.average_rating} style={{ fontSize: 14 }} />
                <span style={{ marginLeft: 8 }}>
                  {product.average_rating.toFixed(1)} ({product.review_count || 0} đánh giá)
                </span>
              </>
            ) : (
              'Chưa có đánh giá'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={product.status === 0 ? 'success' : 'default'}>
              {product.status === 0 ? 'Đang bán' : 'Ngừng bán'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="category_id"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map(cat => (
                    <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Thương hiệu" name="brand">
                <Input placeholder="Nhập thương hiệu" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Màu sắc" name="color">
                <Input placeholder="Nhập màu sắc" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tồn kho"
                name="stock_quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá bán"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
              >
                <InputNumber<number>
                  style={{ width: '100%' }}
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, '')) as number}
                  addonAfter="VND"
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá gốc" name="original_price">
                <InputNumber<number>
                  style={{ width: '100%' }}
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, '')) as number}
                  addonAfter="VND"
                  placeholder="0"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value={0}>Đang bán</Select.Option>
              <Select.Option value={1}>Ngừng bán</Select.Option>
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
    },
    {
      key: 'images',
      label: `Hình ảnh (${fileList.length}/5)`,
      children: (
        <div style={{ padding: '20px 0' }}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            beforeUpload={() => false}
            maxCount={5}
            accept="image/*"
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
          <div style={{ marginTop: 16, color: '#666' }}>
            <p>• Tối đa 5 ảnh</p>
            <p>• Định dạng: JPG, PNG, GIF</p>
            <p>• Kích thước tối đa: 5MB/ảnh</p>
          </div>
        </div>
      )
    }
  ]

  const getModalTitle = () => {
    if (isAddMode) return 'Thêm sản phẩm mới'
    return currentMode === 'view' ? 'Chi tiết sản phẩm' : 'Chỉnh sửa sản phẩm'
  }

  return (
    <Modal
      title={getModalTitle()}
      open={open}
      onCancel={onClose}
      onOk={currentMode === 'edit' ? handleSubmit : handleEdit}
      okText={currentMode === 'edit' ? 'Lưu' : 'Chỉnh sửa'}
      cancelText="Đóng"
      width={800}
      style={{ top: 20 }}
    >
      {isAddMode ? (
        <Tabs 
          defaultActiveKey="info" 
          style={{ marginTop: 24 }}
          items={[
            {
              key: 'info',
              label: 'Thông tin cơ bản',
              children: (
                <Form form={form} layout="vertical">
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                  >
                    <Input placeholder="Nhập tên sản phẩm" />
                  </Form.Item>

                  <Form.Item label="Mô tả" name="description">
                    <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Danh mục"
                        name="category_id"
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                      >
                        <Select placeholder="Chọn danh mục">
                          {categories.map(cat => (
                            <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Thương hiệu" name="brand">
                        <Input placeholder="Nhập thương hiệu" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Màu sắc" name="color">
                        <Input placeholder="Nhập màu sắc" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Tồn kho"
                        name="stock_quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                      >
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Giá bán"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                      >
                        <InputNumber<number>
                          style={{ width: '100%' }}
                          min={0}
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, '')) as number}
                          addonAfter="VND"
                          placeholder="0"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Giá gốc" name="original_price">
                        <InputNumber<number>
                          style={{ width: '100%' }}
                          min={0}
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, '')) as number}
                          addonAfter="VND"
                          placeholder="0"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                  >
                    <Select placeholder="Chọn trạng thái">
                      <Select.Option value={1}>Đang bán</Select.Option>
                      <Select.Option value={0}>Ngừng bán</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              )
            },
            {
              key: 'images',
              label: `Hình ảnh (${fileList.length}/5)`,
              children: (
                <div style={{ padding: '20px 0' }}>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                    beforeUpload={() => false}
                    maxCount={5}
                    accept="image/*"
                  >
                    {fileList.length >= 5 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                      </div>
                    )}
                  </Upload>
                  <div style={{ marginTop: 16, color: '#666' }}>
                    <p>• Tối đa 5 ảnh</p>
                    <p>• Định dạng: JPG, PNG, GIF</p>
                    <p>• Kích thước tối đa: 5MB/ảnh</p>
                  </div>
                </div>
              )
            }
          ]}
        />
      ) : (
        <Tabs defaultActiveKey="info" items={tabItems} style={{ marginTop: 24 }} />
      )}
    </Modal>
  )
}
