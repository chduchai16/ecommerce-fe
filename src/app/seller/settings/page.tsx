'use client'

import { Button, Card, Col, Form, Input, Row, Select, Switch, Upload, message } from 'antd'
import { UploadOutlined, SaveOutlined } from '@ant-design/icons'

const SellerSettingsPage = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Settings saved:', values)
    message.success('Cài đặt đã được lưu!')
  }

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Cài đặt</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          shopName: 'Cửa hàng điện tử',
          email: 'seller@example.com',
          phone: '0123456789',
          address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
          description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng',
          autoAcceptOrders: true,
          notifyNewOrders: true,
          notifyLowStock: true,
          lowStockThreshold: 10,
          currency: 'VND',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Thông tin cửa hàng" style={{ marginBottom: 16 }}>
              <Form.Item
                label="Tên cửa hàng"
                name="shopName"
                rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
              >
                <Input placeholder="Nhập tên cửa hàng" />
              </Form.Item>

              <Form.Item label="Logo cửa hàng">
                <Upload>
                  <Button icon={<UploadOutlined />}>Tải lên logo</Button>
                </Upload>
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
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
              </Form.Item>

              <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={4} placeholder="Mô tả về cửa hàng" />
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Cài đặt đơn hàng" style={{ marginBottom: 16 }}>
              <Form.Item label="Tự động chấp nhận đơn hàng" name="autoAcceptOrders" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item label="Thông báo đơn hàng mới" name="notifyNewOrders" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item label="Thông báo hàng sắp hết" name="notifyLowStock" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item
                label="Ngưỡng cảnh báo tồn kho"
                name="lowStockThreshold"
                rules={[{ required: true, message: 'Vui lòng nhập ngưỡng!' }]}
              >
                <Input type="number" min={1} placeholder="Số lượng tồn kho tối thiểu" />
              </Form.Item>

              <Form.Item
                label="Đơn vị tiền tệ"
                name="currency"
                rules={[{ required: true, message: 'Vui lòng chọn đơn vị tiền tệ!' }]}
              >
                <Select>
                  <Select.Option value="VND">VND (₫)</Select.Option>
                  <Select.Option value="USD">USD ($)</Select.Option>
                  <Select.Option value="EUR">EUR (€)</Select.Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="Bảo mật">
              <Form.Item label="Mật khẩu hiện tại">
                <Input.Password placeholder="Nhập mật khẩu hiện tại" />
              </Form.Item>

              <Form.Item label="Mật khẩu mới">
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>

              <Form.Item label="Xác nhận mật khẩu">
                <Input.Password placeholder="Nhập lại mật khẩu mới" />
              </Form.Item>

              <Button type="default">Đổi mật khẩu</Button>
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 16 }}>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
              Lưu cài đặt
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  )
}

export default SellerSettingsPage
