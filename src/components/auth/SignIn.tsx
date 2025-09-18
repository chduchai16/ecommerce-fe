'use client'

import { useState } from 'react'
import { Form, Input, Button, Checkbox, Typography, Space, Divider, message } from 'antd'
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title, Text } = Typography

interface SignInProps {
  onSubmit?: (email: string, password: string) => void
}

export default function SignIn({ onSubmit }: SignInProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: { email: string; password: string; remember?: boolean }) => {
    setIsLoading(true)
    
    try {
      if (onSubmit) {
        await onSubmit(values.email, values.password)
        message.success('Đăng nhập thành công!')
      }
    } catch (error) {
      console.error('Login error:', error)
      message.error('Đăng nhập thất bại. Vui lòng thử lại!')
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
        maxWidth: 400,
        padding: 32,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#1677ff', marginBottom: 8 }}>
            Đăng nhập
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Chào mừng bạn trở lại!
          </Text>
        </div>

        <Form
          name="signin"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#1677ff' }} />} 
              placeholder="Nhập email của bạn"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#1677ff' }} />} 
              placeholder="Nhập mật khẩu"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link href="/auth/forgot-password">
                <Text type="secondary" style={{ color: '#1677ff' }}>
                  Quên mật khẩu?
                </Text>
              </Link>
            </div>
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
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 14 }}>
            Chưa có tài khoản? {' '}
            <Link href="/auth/sign-up">
              <span style={{ color: '#1677ff', fontWeight: 600 }}>
                Đăng ký ngay
              </span>
            </Link>
          </Text>
        </div>

        <Divider style={{ margin: '24px 0' }}>
          <Text type="secondary">Hoặc đăng nhập với</Text>
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
            Tiếp tục với Google
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
            Tiếp tục với Facebook
          </Button>
        </Space>
      </div>
    </div>
  )
}