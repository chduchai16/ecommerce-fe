'use client'

import { Button, Typography, Result } from 'antd'
import { useRouter } from 'next/navigation'

const { Title, Text } = Typography

export default function ForbiddenPage() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
        extra={
          <Button type="primary" onClick={handleGoBack}>
            Quay lại
          </Button>
        }
      />
    </div>
  )
}