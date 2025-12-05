'use client'

import { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  InputNumber,
  Divider,
  Space,
  message,
  Tabs,
  Upload,
  Radio,
  ColorPicker
} from 'antd'
import {
  SaveOutlined,
  UploadOutlined,
  MailOutlined,
  DollarOutlined,
  GlobalOutlined,
  BellOutlined,
  LockOutlined,
  SettingOutlined
} from '@ant-design/icons'
import type { Color } from 'antd/es/color-picker'
import styles from './page.module.scss'

const { TextArea } = Input

export default function AdminSettingsPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [primaryColor, setPrimaryColor] = useState<Color | string>('#1890ff')

  const handleSave = async (values: any) => {
    setLoading(true)
    try {
      // Gọi API lưu cài đặt
      console.log('Lưu cài đặt:', values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success('Lưu cài đặt thành công!')
    } catch (error) {
      message.error('Lưu cài đặt thất bại!')
    } finally {
      setLoading(false)
    }
  }

  const tabItems = [
    {
      key: 'general',
      label: (
        <span>
          <SettingOutlined /> Chung
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item
              label="Tên website"
              name="siteName"
              initialValue="Exona E-Commerce"
              rules={[{ required: true, message: 'Vui lòng nhập tên website!' }]}
            >
              <Input placeholder="Nhập tên website" />
            </Form.Item>

            <Form.Item
              label="Mô tả website"
              name="siteDescription"
              initialValue="Nền tảng thương mại điện tử hàng đầu Việt Nam"
            >
              <TextArea rows={3} placeholder="Nhập mô tả ngắn về website" />
            </Form.Item>

            <Form.Item label="Logo website" name="logo">
              <Upload listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Tải logo lên</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Favicon" name="favicon">
              <Upload listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Tải favicon lên</Button>
              </Upload>
            </Form.Item>

            <Divider />

            <Form.Item label="Chế độ bảo trì" name="maintenanceMode" valuePropName="checked" initialValue={false}>
              <Switch />
            </Form.Item>

            <Form.Item
              label="Thông báo bảo trì"
              name="maintenanceMessage"
              initialValue="Website đang được bảo trì. Vui lòng quay lại sau."
            >
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'email',
      label: (
        <span>
          <MailOutlined /> Email
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item
              label="SMTP Host"
              name="smtpHost"
              initialValue="smtp.gmail.com"
              rules={[{ required: true }]}
            >
              <Input placeholder="smtp.gmail.com" />
            </Form.Item>

            <Form.Item label="SMTP Port" name="smtpPort" initialValue={587} rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} placeholder="587" />
            </Form.Item>

            <Form.Item label="SMTP Username" name="smtpUsername" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="your-email@gmail.com" />
            </Form.Item>

            <Form.Item label="SMTP Password" name="smtpPassword" rules={[{ required: true }]}>
              <Input.Password placeholder="Mật khẩu ứng dụng" />
            </Form.Item>

            <Form.Item label="Email người gửi" name="fromEmail" initialValue="noreply@exona.vn">
              <Input />
            </Form.Item>

            <Form.Item label="Tên người gửi" name="fromName" initialValue="Exona E-Commerce">
              <Input />
            </Form.Item>

            <Divider />

            <Form.Item label="Gửi email xác nhận đơn hàng" name="orderConfirmEmail" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item label="Gửi email thông báo vận chuyển" name="shippingEmail" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                  Lưu cấu hình
                </Button>
                <Button icon={<MailOutlined />}>Gửi email test</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'payment',
      label: (
        <span>
          <DollarOutlined /> Thanh toán
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <h3>Cổng thanh toán VNPay</h3>
            <Form.Item label="TmnCode" name="vnpayTmnCode">
              <Input placeholder="Nhập TmnCode" />
            </Form.Item>

            <Form.Item label="Hash Secret" name="vnpayHashSecret">
              <Input.Password placeholder="Nhập Hash Secret" />
            </Form.Item>

            <Form.Item label="URL thanh toán" name="vnpayUrl" initialValue="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html">
              <Input />
            </Form.Item>

            <Form.Item label="Kích hoạt VNPay" name="vnpayEnabled" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Divider />

            <h3>Thanh toán khi nhận hàng (COD)</h3>
            <Form.Item label="Kích hoạt COD" name="codEnabled" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item label="Phí COD (%)" name="codFee" initialValue={0}>
              <InputNumber style={{ width: '100%' }} min={0} max={100} />
            </Form.Item>

            <Divider />

            <h3>Đơn vị tiền tệ</h3>
            <Form.Item label="Tiền tệ" name="currency" initialValue="VND">
              <Select
                options={[
                  { value: 'VND', label: 'Việt Nam Đồng (₫)' },
                  { value: 'USD', label: 'US Dollar ($)' },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Lưu cấu hình
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'shipping',
      label: (
        <span>
          <GlobalOutlined /> Vận chuyển
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item label="Phí vận chuyển cố định" name="shippingFee" initialValue={30000}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                addonAfter="₫"
              />
            </Form.Item>

            <Form.Item label="Miễn phí vận chuyển cho đơn từ" name="freeShippingThreshold" initialValue={500000}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                addonAfter="₫"
              />
            </Form.Item>

            <Form.Item label="Thời gian giao hàng ước tính" name="estimatedDelivery" initialValue="3-5 ngày">
              <Input />
            </Form.Item>

            <Form.Item label="Kích hoạt tính phí theo khoảng cách" name="distanceBasedShipping" valuePropName="checked" initialValue={false}>
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Lưu cấu hình
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined /> Thông báo
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <h3>Thông báo cho Admin</h3>
            <Form.Item label="Thông báo đơn hàng mới" name="notifyNewOrder" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item label="Thông báo sản phẩm sắp hết hàng" name="notifyLowStock" valuePropName="checked" initialValue={true}>
              <Switch>
              </Switch>
            </Form.Item>

            <Form.Item label="Ngưỡng cảnh báo tồn kho" name="lowStockThreshold" initialValue={10}>
              <InputNumber style={{ width: '100%' }} min={1} />
            </Form.Item>

            <Divider />

            <h3>Thông báo cho khách hàng</h3>
            <Form.Item label="Gửi email xác nhận đăng ký" name="notifyRegistration" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item label="Gửi thông báo khuyến mãi" name="notifyPromotion" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Lưu cấu hình
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'appearance',
      label: (
        <span>
          <GlobalOutlined /> Giao diện
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item label="Màu chủ đạo" name="primaryColor" initialValue="#1890ff">
              <ColorPicker
                value={primaryColor}
                onChange={setPrimaryColor}
                showText
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item label="Chế độ hiển thị mặc định" name="defaultTheme" initialValue="light">
              <Radio.Group>
                <Radio value="light">Sáng</Radio>
                <Radio value="dark">Tối</Radio>
                <Radio value="auto">Tự động</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Số sản phẩm trên trang" name="productsPerPage" initialValue={12}>
              <Select
                options={[
                  { value: 8, label: '8 sản phẩm' },
                  { value: 12, label: '12 sản phẩm' },
                  { value: 24, label: '24 sản phẩm' },
                  { value: 48, label: '48 sản phẩm' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Hiển thị sản phẩm liên quan" name="showRelatedProducts" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Lưu cấu hình
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <LockOutlined /> Bảo mật
        </span>
      ),
      children: (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item label="Yêu cầu xác thực 2 bước" name="require2FA" valuePropName="checked" initialValue={false}>
              <Switch />
            </Form.Item>

            <Form.Item label="Độ dài mật khẩu tối thiểu" name="minPasswordLength" initialValue={8}>
              <InputNumber style={{ width: '100%' }} min={6} max={20} />
            </Form.Item>

            <Form.Item label="Thời gian hết hạn phiên đăng nhập (phút)" name="sessionTimeout" initialValue={60}>
              <InputNumber style={{ width: '100%' }} min={15} max={1440} />
            </Form.Item>

            <Form.Item label="Số lần đăng nhập sai tối đa" name="maxLoginAttempts" initialValue={5}>
              <InputNumber style={{ width: '100%' }} min={3} max={10} />
            </Form.Item>

            <Form.Item label="Khóa tài khoản sau số lần sai (phút)" name="lockoutDuration" initialValue={30}>
              <InputNumber style={{ width: '100%' }} min={5} max={120} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Lưu cấu hình
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ]

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <div>
          <h1>Cài đặt hệ thống</h1>
          <p>Quản lý cấu hình và tùy chỉnh hệ thống</p>
        </div>
      </div>

      <div className={styles.content}>
        <Tabs items={tabItems} tabPosition="left" />
      </div>
    </div>
  )
}
