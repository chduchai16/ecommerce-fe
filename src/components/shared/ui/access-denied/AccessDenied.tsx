"use client"

import React from 'react'
import styles from './AccessDenied.module.scss'
import { Result, Button } from 'antd'
import { useRouter } from 'next/navigation'

export type AccessDeniedProps = {
    message?: string
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ message }) => {
    const router = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.result}>
                <Result
                    status="403"
                    title="403"
                    subTitle={message || 'Bạn không có quyền truy cập trang này.'}
                    extra={
                        <div className={styles.actions}>
                            <Button onClick={() => router.back()}>Quay lại</Button>
                            <Button type="primary" onClick={() => router.push('/')}>Về trang chủ</Button>
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default AccessDenied
