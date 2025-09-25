'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductDetail from '@/components/customer/product-detail/ProductDetail'
import { Spin, Result } from 'antd'
import { Product } from '@/library/models/product/product'
import { ProductService } from '@/library/services/product-service'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const productId : number  = Number(params.id)
  const [loading, setLoading] = useState(false)

  const [product, setProduct] = useState<Product>({} as Product);
  const productService = new ProductService() ;
  // Tìm sản phẩm theo ID
  useEffect(()=> {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const product = await productService.getProductById(productId)
        setProduct(product)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  } , [])

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
          <Link href="/customer/products">
            Quay lại danh sách sản phẩm
          </Link>
        }
      />
    )
  }


  return <ProductDetail product={product} />
}