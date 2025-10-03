'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import ProductDetail from '@/components/customer/product-detail/ProductDetail'
import { Spin, Result } from 'antd'
import { Product } from '@/library/models/product/product'
import { ProductService } from '@/library/services/product-service'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productId: number = Number(params.id);
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<Product | null>(null);
  const productService = useMemo(() => new ProductService(), []);

  // Lấy dữ liệu sản phẩm từ URL query params (nếu có)
  const serializedProduct = searchParams.get('data');

  // Tìm sản phẩm theo ID
  useEffect(() => {
    const fetchProduct = async () => {
      // Nếu đã có dữ liệu từ URL params thì dùng luôn, không cần gọi API
      if (serializedProduct) {
        try {
          const parsedProduct = JSON.parse(decodeURIComponent(serializedProduct)) as Product;
          setProduct(parsedProduct);
          setLoading(false);
          return;
        } catch (e) {
          // Nếu parse lỗi, tiếp tục gọi API như thông thường
          console.warn('Failed to parse product data from URL, fetching from API instead');
        }
      }

      // Không có data từ URL hoặc parse lỗi, gọi API
      try {
        setLoading(true);
        const fetchedProduct = await productService.getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setProduct(null); // Đánh dấu là không tìm thấy sản phẩm
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, serializedProduct, productService])

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