'use client'

import { useState } from 'react'
import { Row, Col, Card, Form, Input, Button, Upload, Avatar, Select, DatePicker, Switch, Typography, Divider, Space, App } from 'antd'
import { UserOutlined, EditOutlined, SaveOutlined, CameraOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import dayjs from 'dayjs'
import { mockUserProfile, type UserProfile } from '@/data/mockUserData'
import { CurrencyHelper } from '@/library/helpers'
import styles from './UserProfile.module.scss'

const { Title, Text } = Typography
const { Option } = Select

export default function UserProfile() {
  const { message } = App.useApp();

  const [form] = Form.useForm()
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  const handleEdit = () => {
    setEditing(true)
    form.setFieldsValue({
      ...profile,
      dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null
    })
  }

  const handleCancel = () => {
    setEditing(false)
    form.resetFields()
  }

  const handleSave = async (values: any) => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const updatedProfile: UserProfile = {
        ...profile,
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : undefined
      }

      setProfile(updatedProfile)
      setEditing(false)
      message.success('Cập nhật thông tin thành công!')

    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (info: any) => {
    const { fileList: newFileList } = info
    setFileList(newFileList)

    // Nếu có file được chọn, tạo preview URL
    if (newFileList.length > 0) {
      const file = newFileList[0]
      if (file.originFileObj) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewAvatar(e.target?.result as string)
        }
        reader.readAsDataURL(file.originFileObj)
      }
    } else {
      setPreviewAvatar(null)
    }
  }

  return (
    <div className={styles.userProfile}>
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          {/* Profile Summary */}
          <Col xs={24} lg={8}>
            <Card className={styles.profileCard}>

              {/* Avatar Section */}
              <div className={styles.avatarSection}>
                {editing ? (
                  <div className={styles.avatarUploadContainer}>
                    <Avatar
                      size={120}
                      src={previewAvatar || profile.avatar}
                      icon={<UserOutlined />}
                      className={styles.avatar}
                    />
                    {!previewAvatar ? (
                      <Upload
                        listType="text"
                        fileList={fileList}
                        onChange={handleAvatarChange}
                        beforeUpload={() => false}
                        maxCount={1}
                        accept="image/*"
                        showUploadList={false}
                      >
                        <Button 
                          icon={<CameraOutlined />} 
                          size="small" 
                          className={styles.changeAvatarButton}
                        >
                          Thay đổi
                        </Button>
                      </Upload>
                    ) : (
                      <div className={styles.avatarActions}>
                        <Upload
                          listType="text"
                          fileList={[]}
                          onChange={handleAvatarChange}
                          beforeUpload={() => false}
                          maxCount={1}
                          accept="image/*"
                          showUploadList={false}
                        >
                          <Button 
                            icon={<CameraOutlined />} 
                            size="small"
                          >
                            Chọn ảnh khác
                          </Button>
                        </Upload>
                        <Button 
                          size="small" 
                          onClick={() => {
                            setPreviewAvatar(null)
                            setFileList([])
                          }}
                        >
                          Hủy
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Avatar
                    size={120}
                    src={profile.avatar}
                    icon={<UserOutlined />}
                    className={styles.avatar}
                  />
                )}

                <div className={styles.userInfo}>
                  <Title level={4} className={styles.userName}>
                    {profile.firstName} {profile.lastName}
                  </Title>
                  <Text className={styles.userEmail}>
                    {profile.email}
                  </Text>
                  {!editing && (
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={handleEdit}
                      size="small"
                      className={styles.editButton}
                    >
                      Chỉnh sửa thông tin
                    </Button>
                  )}
                </div>
              </div>

              <Divider />

              {/* Stats */}
              <div className={styles.statsSection}>
                <div className={styles.statItem}>
                  <Text className={styles.statLabel}>Thành viên từ</Text>
                  <Text className={styles.statValue}>
                    {dayjs(profile.memberSince).format('DD/MM/YYYY')}
                  </Text>
                </div>

                <div className={styles.statItem}>
                  <Text className={styles.statLabel}>Tổng đơn hàng</Text>
                  <Text className={styles.statValue}>
                    {profile.totalOrders} đơn
                  </Text>
                </div>

                <div className={styles.statItem}>
                  <Text className={styles.statLabel}>Tổng chi tiêu</Text>
                  <Text className={styles.statValue}>
                    {CurrencyHelper.formatVND(profile.totalSpent)}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          {/* Profile Details */}
          <Col xs={24} lg={16}>
            <Card className={styles.detailsCard}>
              {editing ? (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSave}
                  className={styles.editForm}
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Họ"
                        name="lastName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                      >
                        <Input placeholder="Nhập họ" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Tên"
                        name="firstName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                      >
                        <Input placeholder="Nhập tên" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
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
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Ngày sinh"
                        name="dateOfBirth"
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          placeholder="Chọn ngày sinh"
                          format="DD/MM/YYYY"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Giới tính"
                        name="gender"
                      >
                        <Select placeholder="Chọn giới tính">
                          <Option value="male">Nam</Option>
                          <Option value="female">Nữ</Option>
                          <Option value="other">Khác</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Title level={5}>Địa chỉ</Title>

                  <Form.Item
                    label="Số nhà, tên đường"
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                  >
                    <Input placeholder="Nhập số nhà, tên đường" />
                  </Form.Item>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Phường/Xã"
                        name={['address', 'ward']}
                        rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
                      >
                        <Input placeholder="Phường/Xã" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Tỉnh/Thành phố"
                        name={['address', 'city']}
                        rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
                      >
                        <Input placeholder="Tỉnh/Thành phố" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Title level={5}>Tùy chọn thông báo</Title>

                  <Form.Item name={['preferences', 'newsletter']} valuePropName="checked">
                    <Switch /> <span style={{ marginLeft: 8 }}>Nhận bản tin qua email</span>
                  </Form.Item>

                  <Form.Item name={['preferences', 'promotions']} valuePropName="checked">
                    <Switch /> <span style={{ marginLeft: 8 }}>Nhận thông báo khuyến mãi</span>
                  </Form.Item>

                  <Form.Item name={['preferences', 'smsNotifications']} valuePropName="checked">
                    <Switch /> <span style={{ marginLeft: 8 }}>Nhận thông báo qua SMS</span>
                  </Form.Item>

                  <div className={styles.formActions}>
                    <Space>
                      <Button onClick={handleCancel} size='small'>
                        Hủy
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size='small'
                        icon={<SaveOutlined />}
                      >
                        Lưu thông tin
                      </Button>
                    </Space>
                  </div>
                </Form>
              ) : (
                <div className={styles.profileDetails}>
                  <Title level={4}>Thông tin cá nhân</Title>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <div className={styles.infoItem}>
                        <Text className={styles.infoLabel}>Họ và tên:</Text>
                        <Text className={styles.infoValue}>
                          {profile.firstName} {profile.lastName}
                        </Text>
                      </div>
                    </Col>

                    <Col xs={24} sm={12}>
                      <div className={styles.infoItem}>
                        <Text className={styles.infoLabel}>Email:</Text>
                        <Text className={styles.infoValue}>{profile.email}</Text>
                      </div>
                    </Col>

                    <Col xs={24} sm={12}>
                      <div className={styles.infoItem}>
                        <Text className={styles.infoLabel}>Số điện thoại:</Text>
                        <Text className={styles.infoValue}>{profile.phone}</Text>
                      </div>
                    </Col>

                    <Col xs={24} sm={12}>
                      <div className={styles.infoItem}>
                        <Text className={styles.infoLabel}>Ngày sinh:</Text>
                        <Text className={styles.infoValue}>
                          {profile.dateOfBirth ? dayjs(profile.dateOfBirth).format('DD/MM/YYYY') : 'Chưa cập nhật'}
                        </Text>
                      </div>
                    </Col>

                    <Col xs={24} sm={12}>
                      <div className={styles.infoItem}>
                        <Text className={styles.infoLabel}>Giới tính:</Text>
                        <Text className={styles.infoValue}>
                          {profile.gender === 'male' ? 'Nam' : profile.gender === 'female' ? 'Nữ' : 'Khác'}
                        </Text>
                      </div>
                    </Col>
                  </Row>

                  <Divider />

                  <Title level={4}>Địa chỉ</Title>
                  <div className={styles.addressInfo}>
                    <Text>
                      {profile.address.street}, {profile.address.ward}, {profile.address.city}
                      {profile.address.zipCode && `, ${profile.address.zipCode}`}
                    </Text>
                  </div>

                  <Divider />

                  <Title level={4}>Tùy chọn thông báo</Title>
                  <div className={styles.preferencesInfo}>
                    <div className={styles.preferenceItem}>
                      <Switch checked={profile.preferences.newsletter} disabled />
                      <span>Nhận bản tin qua email</span>
                    </div>
                    <div className={styles.preferenceItem}>
                      <Switch checked={profile.preferences.promotions} disabled />
                      <span>Nhận thông báo khuyến mãi</span>
                    </div>
                    <div className={styles.preferenceItem}>
                      <Switch checked={profile.preferences.smsNotifications} disabled />
                      <span>Nhận thông báo qua SMS</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}