'use client'

import { useState } from 'react'
import { Form, Input, Button, Select, Typography, Space, Divider, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title, Text } = Typography
const { Option } = Select

interface SignUpProps {
  onSubmit?: (userData: {
    name: string
    email: string
    password: string
    role?: string
  }) => void
}

export default function SignUp({ onSubmit }: SignUpProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values: {
    name: string
    email: string
    password: string
    confirmPassword: string
    role: string
    terms: boolean
  }) => {
    setIsLoading(true)
    
    try {
      if (onSubmit) {
        await onSubmit({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role
        })
        message.success('Đăng ký thành công!')
      }
    } catch (error) {
      console.error('Registration error:', error)
      message.error('Đăng ký thất bại. Vui lòng thử lại!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 480,
        padding: 32,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#1677ff', marginBottom: 8 }}>
            Đăng ký tài khoản
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Tạo tài khoản mới để bắt đầu mua sắm
          </Text>
        </div>

        <Form
          form={form}
          name="signup"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên!' },
              { min: 2, message: 'Tên phải có ít nhất 2 ký tự!' },
              { max: 50, message: 'Tên không được quá 50 ký tự!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#1677ff' }} />} 
              placeholder="Nhập họ và tên của bạn"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#1677ff' }} />} 
              placeholder="Nhập email của bạn"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Loại tài khoản"
            rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
            initialValue="customer"
          >
            <Select 
              placeholder="Chọn loại tài khoản"
              style={{ borderRadius: 8 }}
            >
              <Option value="customer">
                <Space>
                  👤 Khách hàng
                </Space>
              </Option>
              <Option value="seller">
                <Space>
                  🏪 Người bán
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              { 
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!'
              }
            ]}
            hasFeedback
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#1677ff' }} />} 
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#1677ff' }} />} 
              placeholder="Nhập lại mật khẩu"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              { 
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với điều khoản!')),
              },
            ]}
          >
            <Checkbox>
              Tôi đồng ý với{' '}
              <Link href="/terms">
                <span style={{ color: '#1677ff' }}>Điều khoản sử dụng</span>
              </Link>
              {' '}và{' '}
              <Link href="/privacy">
                <span style={{ color: '#1677ff' }}>Chính sách bảo mật</span>
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              style={{ 
                width: '100%', 
                height: 48,
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600
              }}
            >
              {isLoading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 14 }}>
            Đã có tài khoản? {' '}
            <Link href="/auth/sign-in">
              <span style={{ color: '#1677ff', fontWeight: 600 }}>
                Đăng nhập ngay
              </span>
            </Link>
          </Text>
        </div>

        <Divider style={{ margin: '24px 0' }}>
          <Text type="secondary">Hoặc đăng ký với</Text>
        </Divider>

        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Button 
            icon={<GoogleOutlined />} 
            style={{ 
              width: '100%', 
              height: 44,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Đăng ký với Google
          </Button>
          <Button 
            icon={<FacebookOutlined />} 
            style={{ 
              width: '100%', 
              height: 44,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: '#1877f2',
              borderColor: '#1877f2',
              color: 'white'
            }}
          >
            Đăng ký với Facebook
          </Button>
        </Space>
      </div>
    </div>
  )
}