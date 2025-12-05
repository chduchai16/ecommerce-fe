'use client'

import { Badge, Descriptions, Form, Input, Modal, Select, Tag, message } from 'antd'
import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: number
  registeredAt: string
  totalOrders: number
  totalSpent: number
}

interface UserModalProps {
  open: boolean
  onClose: () => void
  user: User | null
  onSave: (values: any) => void
  mode: 'view' | 'edit'
}

export const UserModal = ({ open, onClose, user, onSave, mode }: UserModalProps) => {
  const [form] = Form.useForm()
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>(mode)

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue(user)
    }
  }, [open, user, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSave(values)
      message.success('Cập nhật người dùng thành công!')
      onClose()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleEdit = () => {
    setCurrentMode('edit')
  }

  if (!user) return null

  return (
    <Modal
      title={currentMode === 'view' ? 'Thông tin người dùng' : 'Chỉnh sửa người dùng'}
      open={open}
      onCancel={onClose}
      onOk={currentMode === 'edit' ? handleSubmit : handleEdit}
      okText={currentMode === 'edit' ? 'Lưu' : 'Chỉnh sửa'}
      cancelText="Đóng"
      width={700}
    >
      {currentMode === 'view' ? (
        <Descriptions bordered column={2} style={{ marginTop: 24 }}>
          <Descriptions.Item label="ID" span={2}>
            {user.id}
          </Descriptions.Item>
          <Descriptions.Item label="Họ tên" span={2}>
            {user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {user.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>
            {user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {user.role === 'admin' ? (
              <Tag color="red">Admin</Tag>
            ) : user.role === 'seller' ? (
              <Tag color="blue">Seller</Tag>
            ) : (
              <Tag>Customer</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Badge
              status={user.status === 1 ? 'success' : 'error'}
              text={user.status === 1 ? 'Đang hoạt động' : 'Đã khóa'}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Ngày đăng ký" span={2}>
            {new Date(user.registeredAt).toLocaleString('vi-VN')}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng đơn hàng">
            {user.totalOrders}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng chi tiêu">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(user.totalSpent)}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select>
              <Select.Option value="customer">Customer</Select.Option>
              <Select.Option value="seller">Seller</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Select.Option value={1}>Đang hoạt động</Select.Option>
              <Select.Option value={0}>Đã khóa</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}
