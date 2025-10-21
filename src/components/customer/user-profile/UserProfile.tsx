'use client'

import { useState, useEffect, useMemo } from 'react'
import { Row, Col, Card, Form, Input, Button, Upload, Avatar, Select, DatePicker, Typography, Divider, Space, App, Tabs } from 'antd'
import { UserOutlined, EditOutlined, SaveOutlined, CameraOutlined, InfoCircleOutlined, ShopOutlined, LockOutlined } from '@ant-design/icons'
import type { UploadFile, UploadChangeParam } from 'antd/es/upload/interface'
import dayjs from 'dayjs'
import { User } from '@/library/models/user/user'
import styles from './UserProfile.module.scss'
import { UserService } from '@/library/services/user-service'

const { Title, Text } = Typography
const { Option } = Select

export default function UserProfile() {
  const { message } = App.useApp();
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [profile, setProfile] = useState<User | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('basic')

  // Sử dụng useMemo để tránh tạo mới UserService mỗi khi render
  const userService = useMemo(() => new UserService(), [])

  // Tải thông tin người dùng
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await userService.getProfile();
        setProfile(userData);
      } catch (error) {
        message.error('Không thể tải thông tin người dùng. Vui lòng thử lại sau.');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userService, message]);

  const handleEdit = () => {
    if (!profile) return;

    setEditing(true)
    form.setFieldsValue({
      ...profile,
      date_of_birth: profile.date_of_birth ? dayjs(profile.date_of_birth) : null,
      // Load shop data if user is seller
      shop_name: profile.shop_name,
      shop_description: profile.shop_description,
      tax_code: profile.tax_code,
      business_license: profile.business_license
    })
  }

  const handleCancel = () => {
    setEditing(false)
    form.resetFields()
  }

  // Định nghĩa kiểu dữ liệu cho form values
  interface UserFormValues {
    fullname: string;
    email: string;
    phone_number: string;
    date_of_birth?: dayjs.Dayjs;
    gender?: string;
    address: string;
    shop_name?: string;
    shop_description?: string;
    tax_code?: string;
    business_license?: string;
  }

  const handleSave = async (values: UserFormValues) => {
    if (!profile) return;
    setLoading(true)

    try {
      // Simulate API call - Ở đây bạn có thể thêm API gọi thực sự
      await new Promise(resolve => setTimeout(resolve, 1000))

      const updatedProfile: User = {
        ...profile,
        ...values,
        date_of_birth: values.date_of_birth ? values.date_of_birth.format('YYYY-MM-DD') : profile.date_of_birth
      }

      setProfile(updatedProfile)
      setEditing(false)
      console.log('Updated profile:', updatedProfile)
      message.success('Cập nhật thông tin thành công!')

    } catch (error: unknown) {
      console.error('Lỗi cập nhật thông tin:', error);
      message.error('Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (info: UploadChangeParam<UploadFile>) => {
    console.log('Upload info:', info)

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

  const handleChangePassword = async (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    setLoading(true)
    try {
      // Simulate API call - Ở đây bạn có thể thêm API gọi thực sự
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Password changed:', values)
      message.success('Đổi mật khẩu thành công!')
      passwordForm.resetFields()
    } catch (error) {
      console.error('Error changing password:', error)
      message.error('Đổi mật khẩu thất bại!')
    } finally {
      setLoading(false)
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
                      src={previewAvatar || profile?.avatar}
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
                          >
                            Chọn ảnh khác
                          </Button>
                        </Upload>
                        <Button
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
                    src={profile?.avatar}
                    icon={<UserOutlined />}
                    className={styles.avatar}
                  />
                )}

                <div className={styles.userInfo}>
                  <Title level={4} className={styles.userName}>
                    {profile?.fullname}
                  </Title>
                  <Text className={styles.userEmail}>
                    {profile?.email}
                  </Text>
                  {profile?.role_name === 'SELLER' && (
                    <Text className={styles.userRole}>
                      Người bán {profile.is_verified && '✓'}
                    </Text>
                  )}
                </div>
              </div>

              <Divider />

              {/* Stats */}
              <div className={styles.statsSection}>
                {/* Thông tin về thành viên */}
                <div className={styles.statItem}>
                  <Text className={styles.statLabel}>ID Thành viên</Text>
                  <Text className={styles.statValue}>
                    {profile?.id || 'N/A'}
                  </Text>
                </div>

                {/* Thông tin về vai trò */}
                <div className={styles.statItem}>
                  <Text className={styles.statLabel}>Vai trò</Text>
                  <Text className={styles.statValue}>
                    {profile?.role_name === 'SELLER' ? 'Người bán' :
                      profile?.role_name === 'ADMIN' ? 'Quản trị viên' :
                        profile?.role_name === 'CUSTOMER' ? 'Khách hàng' : profile?.role_name || 'Khách hàng'}
                  </Text>
                </div>

                {/* Nếu là người bán thì hiển thị số lượng bán hàng */}
                {profile?.role_name === 'SELLER' && (
                  <div className={styles.statItem}>
                    <Text className={styles.statLabel}>Đã bán</Text>
                    <Text className={styles.statValue}>
                      {profile.total_sales || 0} sản phẩm
                    </Text>
                  </div>
                )}
              </div>
            </Card>
          </Col>

          {/* Profile Details */}
          <Col xs={24} lg={16}>
            <Card className={styles.detailsCard}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: 'basic',
                    label: (
                      <span>
                        <InfoCircleOutlined />
                        Thông tin cơ bản
                      </span>
                    ),
                    children: (
                      <>
                        {!editing && (
                          <div className={styles.tabActions}>
                            <Button
                              type="primary"
                              icon={<EditOutlined />}
                              onClick={handleEdit}

                            >
                              Chỉnh sửa thông tin
                            </Button>
                          </div>
                        )}
                        {editing ? (
                          <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSave}
                            className={styles.editForm}
                          >
                            <Form.Item
                              label="Họ và tên"
                              name="fullname"
                              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                              <Input placeholder="Nhập họ và tên" />
                            </Form.Item>

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
                                  name="phone_number"
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
                                  name="date_of_birth"
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
                              label="Địa chỉ đầy đủ"
                              name="address"
                              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                              <Input.TextArea
                                placeholder="Nhập địa chỉ đầy đủ (số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                                rows={3}
                              />
                            </Form.Item>

                            <div className={styles.formActions}>
                              <Space>
                                <Button onClick={handleCancel} >
                                  Hủy
                                </Button>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  loading={loading}

                                  icon={<SaveOutlined />}
                                >
                                  Lưu thông tin
                                </Button>
                              </Space>
                            </div>
                          </Form>
                        ) : (
                          <div className={styles.profileDetails}>
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Họ và tên:</Text>
                                  <Text className={styles.infoValue}>
                                    {profile?.fullname}
                                  </Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Email:</Text>
                                  <Text className={styles.infoValue}>{profile?.email}</Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Số điện thoại:</Text>
                                  <Text className={styles.infoValue}>{profile?.phone_number}</Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Ngày sinh:</Text>
                                  <Text className={styles.infoValue}>
                                    {profile?.date_of_birth ? dayjs(profile.date_of_birth).format('DD/MM/YYYY') : 'Chưa cập nhật'}
                                  </Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Giới tính:</Text>
                                  <Text className={styles.infoValue}>
                                    {profile?.gender === 'male' ? 'Nam' : profile?.gender === 'female' ? 'Nữ' : 'Khác'}
                                  </Text>
                                </div>
                              </Col>
                            </Row>

                            <Divider />

                            <Title level={4}>Địa chỉ</Title>
                            <div className={styles.addressInfo}>
                              <Text>
                                {profile?.address || 'Chưa cập nhật'}
                              </Text>
                            </div>
                          </div>
                        )}
                      </>
                    )
                  },
                  ...(profile?.role_name === 'SELLER' ? [{
                    key: 'shop',
                    label: (
                      <span>
                        <ShopOutlined />
                        Thông tin cửa hàng
                      </span>
                    ),
                    children: (
                      <>
                        {!editing && (
                          <div className={styles.tabActions}>
                            <Button
                              type="primary"
                              icon={<EditOutlined />}
                              onClick={handleEdit}

                            >
                              Chỉnh sửa thông tin
                            </Button>
                          </div>
                        )}
                        {editing ? (
                          <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSave}
                            className={styles.editForm}
                          >
                            <Form.Item
                              label="Tên cửa hàng"
                              name="shop_name"
                              rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
                            >
                              <Input placeholder="Nhập tên cửa hàng" />
                            </Form.Item>

                            <Form.Item
                              label="Mô tả cửa hàng"
                              name="shop_description"
                            >
                              <Input.TextArea placeholder="Mô tả về cửa hàng của bạn" rows={3} />
                            </Form.Item>

                            <Row gutter={[16, 0]}>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  label="Mã số thuế"
                                  name="tax_code"
                                >
                                  <Input placeholder="Nhập mã số thuế" />
                                </Form.Item>
                              </Col>

                              <Col xs={24} sm={12}>
                                <Form.Item
                                  label="Giấy phép kinh doanh"
                                  name="business_license"
                                >
                                  <Input placeholder="Nhập số giấy phép kinh doanh" />
                                </Form.Item>
                              </Col>
                            </Row>

                            <div className={styles.formActions}>
                              <Space>
                                <Button onClick={handleCancel} >
                                  Hủy
                                </Button>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  loading={loading}

                                  icon={<SaveOutlined />}
                                >
                                  Lưu thông tin
                                </Button>
                              </Space>
                            </div>
                          </Form>
                        ) : (
                          <div className={styles.profileDetails}>
                            <Title level={4}>Thông tin cửa hàng</Title>
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Tên cửa hàng:</Text>
                                  <Text className={styles.infoValue}>{profile.shop_name || 'Chưa cập nhật'}</Text>
                                </div>
                              </Col>

                              <Col xs={24}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Mô tả cửa hàng:</Text>
                                  <Text className={styles.infoValue}>{profile.shop_description || 'Chưa cập nhật'}</Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Mã số thuế:</Text>
                                  <Text className={styles.infoValue}>{profile.tax_code || 'Chưa cập nhật'}</Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Giấy phép kinh doanh:</Text>
                                  <Text className={styles.infoValue}>{profile.business_license || 'Chưa cập nhật'}</Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Đánh giá:</Text>
                                  <Text className={styles.infoValue}>{profile.seller_rating || 0}/5</Text>
                                </div>
                              </Col>

                              <Col xs={24} sm={12}>
                                <div className={styles.infoItem}>
                                  <Text className={styles.infoLabel}>Đã bán:</Text>
                                  <Text className={styles.infoValue}>{profile.total_sales || 0} sản phẩm</Text>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </>
                    )
                  }] : []),
                  {
                    key: 'password',
                    label: (
                      <span>
                        <LockOutlined />
                        Mật khẩu
                      </span>
                    ),
                    children: (
                      <div className={styles.profileDetails}>
                        <Title level={4}>Đổi mật khẩu</Title>
                        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                        </Text>
                        <Form
                          form={passwordForm}
                          layout="vertical"
                          onFinish={handleChangePassword}
                          className={styles.passwordForm}
                        >
                          <Form.Item
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                          >
                            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                          </Form.Item>

                          <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                            ]}
                          >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                          </Form.Item>

                          <Form.Item
                            label="Xác nhận mật khẩu mới"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                              }),
                            ]}
                          >
                            <Input.Password placeholder="Nhập lại mật khẩu mới" />
                          </Form.Item>

                          <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} >
                              Đổi mật khẩu
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    )
                  }
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}