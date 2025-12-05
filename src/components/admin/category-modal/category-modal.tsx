'use client'

import { Form, Input, InputNumber, Modal, Select, Switch, message } from 'antd'
import { useEffect } from 'react'

interface Category {
  id: number
  name: string
  description: string
  productCount: number
  status: number
}

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  category: Category | null
  onSave: (values: any) => void
}

export const CategoryModal = ({ open, onClose, category, onSave }: CategoryModalProps) => {
  const [form] = Form.useForm()
  const isEdit = !!category

  useEffect(() => {
    if (open) {
      if (category) {
        form.setFieldsValue(category)
      } else {
        form.resetFields()
      }
    }
  }, [open, category, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
      message.success(isEdit ? 'Cập nhật danh mục thành công!' : 'Thêm danh mục thành công!')
      onClose()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return (
    <Modal
      title={isEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEdit ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      width={600}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả danh mục" />
        </Form.Item>

        {isEdit && (
          <Form.Item label="Số lượng sản phẩm" name="productCount">
            <InputNumber disabled style={{ width: '100%' }} />
          </Form.Item>
        )}

        <Form.Item label="Trạng thái" name="status" valuePropName="checked">
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Tạm ẩn" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
