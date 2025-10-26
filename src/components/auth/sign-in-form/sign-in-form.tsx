'use client'

import { useState } from 'react'
import { Form, Input, Button, Checkbox, Typography, Divider, Radio } from 'antd'
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { AuthService } from '@/library/services/auth-service'
import { useMessage } from '@/hooks/use-message'
import { useAuth } from '@/contexts/auth-context'
import styles from './sign-in-form.module.scss'
import { useRouter } from 'next/navigation'

const { Title, Text } = Typography

export default function SignInForm() {
    // states 
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [loginRole, setLoginRole] = useState<1 | 2>(2)  // 1 = ADMIN, 2 = CUSTOMER

    // hooks
    const message = useMessage()
    const router = useRouter()
    const { setToken, setUser } = useAuth()

    // services
    const authService = new AuthService()

    const handleSubmit = async (values: { username: string; password: string; remember?: boolean }) => {
        setIsLoading(true)
        try {
            const response = await authService.signIn(values.username, values.password, loginRole, values.remember);
            const token = response as string;
            setToken(token);
            const user = await authService.getUserByToken(token);
            setUser(user);
            message.success('Đăng nhập thành công!');
            if (loginRole === 1) {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/customer/products');
            }
            form.resetFields();
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Vui lòng thử lại!');
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <Title level={2} className={styles.title}>
                        Đăng nhập
                    </Title>
                </div>

                <Form
                    form={form}
                    name="signin"
                    onFinish={handleSubmit}
                    layout="vertical"
                    size="large"
                    autoComplete="off"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="username"
                        label="Tài khoản"
                        className={styles.formItem}
                        rules={[
                            { required: true, message: 'Vui lòng nhập tài khoản!' },
                            { message: 'Tài khoản không hợp lệ!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className={styles.inputIcon} />}
                            placeholder="Nhập tài khoản của bạn"
                            className={styles.inputField}
                            autoComplete="username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        className={styles.formItem}
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 3, message: 'Mật khẩu phải có ít nhất 3 ký tự!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className={styles.inputIcon} />}
                            placeholder="Nhập mật khẩu"
                            className={styles.inputField}
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item
                        className={styles.formItem}
                    >
                        <Radio.Group
                            value={loginRole}
                            onChange={(e) => setLoginRole(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <Radio value={2} style={{ marginRight: '24px' }}>
                                <ShoppingCartOutlined /> Mua hàng
                            </Radio>
                            <Radio value={1}>
                                <SettingOutlined /> Quản trị
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className={styles.rememberSection}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                            </Form.Item>
                            <Link href="/auth/forgot-password">
                                <Text type="secondary" className={styles.forgotPassword}>
                                    Quên mật khẩu?
                                </Text>
                            </Link>
                        </div>
                    </Form.Item>

                    <Form.Item className={styles.submitButtonMargin}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className={styles.submitButton}
                        >
                            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>
                    </Form.Item>
                </Form>

                <div className={styles.signupSection}>
                    <Text className={styles.signupText}>
                        Chưa có tài khoản? {' '}
                        <Link href="/auth/sign-up">
                            <span className={styles.signupLink}>
                                Đăng ký ngay
                            </span>
                        </Link>
                    </Text>
                </div>

                <Divider className={styles.dividerSection}>
                    <Text type="secondary">Hoặc đăng nhập với</Text>
                </Divider>

                <div className={styles.socialButtons}>
                    <Button
                        icon={<GoogleOutlined />}
                        size="large"
                    />
                    <Button
                        icon={<FacebookOutlined />}
                        size="large"
                    />
                    <Button
                        icon={<GithubOutlined />}
                        size="large"
                    />
                </div>
            </div>
        </div>
    )
}