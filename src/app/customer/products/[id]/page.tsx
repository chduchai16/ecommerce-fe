'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { mockProducts } from '@/data/mockProducts'
import ProductDetail from '@/components/customer/product-detail/ProductDetail'
import { Spin, Result } from 'antd'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [loading, setLoading] = useState(false)

  // Tìm sản phẩm theo ID
  const product = mockProducts.find(p => p.id === productId)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!product) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sản phẩm không tồn tại hoặc đã bị xóa."
        extra={
          <a href="/customer/products">
            Quay lại danh sách sản phẩm
          </a>
        }
      />
    )
  }

  return <ProductDetail product={product} />
}