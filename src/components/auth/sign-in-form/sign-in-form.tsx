'use client'

import { useState } from 'react'
import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons'
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

    // hooks
    const message = useMessage()
    const router = useRouter()
    const { setToken, setUser } = useAuth()

    // services
    const authService = new AuthService()

    const handleSubmit = async (values: { username: string; password: string; remember?: boolean }) => {
        setIsLoading(true)
        try {
            const response = await authService.signIn(values.username, values.password, values.remember);

            // response contains { access_token, refresh_token, user?, ... }
            const responseData = response as Record<string, unknown>;
            const token = responseData.access_token as string;

            // Set token
            setToken(token);

            // Fetch user data
            const user = await authService.getUserByToken(token);
            setUser(user);

            message.success('Đăng nhập thành công!');
            router.push('/');
            form.resetFields();
        } catch (error) {
            console.error('Login error:', error);
            message.error('Đăng nhập thất bại. Vui lòng thử lại!');
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
                        />
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