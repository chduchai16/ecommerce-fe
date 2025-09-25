'use client'

import { useState } from 'react'
import { Form, Input, Button, Select, Typography, Space, Divider, App, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from './sign-up-form.module.scss'

const { Title, Text } = Typography
const { Option } = Select
const { useApp } = App

interface SignUpFormProps {
    onSubmit?: (userData: {
        name: string
        email: string
        password: string
        role?: string
    }) => void
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()
    const { message } = useApp()

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
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <Title level={2} className={styles.title}>
                        Đăng ký tài khoản
                    </Title>
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
                        className={styles.formItem}
                        rules={[
                            { required: true, message: 'Vui lòng nhập họ và tên!' },
                            { min: 2, message: 'Tên phải có ít nhất 2 ký tự!' },
                            { max: 50, message: 'Tên không được quá 50 ký tự!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className={styles.inputIcon} />}
                            placeholder="Nhập họ và tên của bạn"
                            className={styles.inputField}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        className={styles.formItem}
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className={styles.inputIcon} />}
                            placeholder="Nhập email của bạn"
                            className={styles.inputField}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        className={styles.formItem}
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
                            prefix={<LockOutlined className={styles.inputIcon} />}
                            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                            className={styles.inputField}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        className={styles.formItem}
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
                            prefix={<LockOutlined className={styles.inputIcon} />}
                            placeholder="Nhập lại mật khẩu"
                            className={styles.inputField}
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
                        className={styles.termsSection}
                    >
                        <Checkbox>
                            <span className={styles.termsText}>
                                Tôi đồng ý với{' '}
                                <Link href="/terms">
                                    <span className={styles.termsLink}>Điều khoản sử dụng</span>
                                </Link>
                                {' '}và{' '}
                                <Link href="/privacy">
                                    <span className={styles.termsLink}>Chính sách bảo mật</span>
                                </Link>
                            </span>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item className={styles.submitButtonMargin}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className={styles.submitButton}
                        >
                            {isLoading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
                        </Button>
                    </Form.Item>
                </Form>

                <div className={styles.signinSection}>
                    <Text className={styles.signinText}>
                        Đã có tài khoản? {' '}
                        <Link href="/auth/sign-in">
                            <span className={styles.signinLink}>
                                Đăng nhập ngay
                            </span>
                        </Link>
                    </Text>
                </div>

                <Divider>
                    <Text type="secondary">Hoặc đăng ký với</Text>
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