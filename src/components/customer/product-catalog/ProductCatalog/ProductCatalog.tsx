'use client'

import { useState, useEffect, useMemo } from 'react'
import { Row, Col, Spin, Result, Button, App, Pagination } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClearOutlined } from '@ant-design/icons'
import ProductCard from '../ProductCard'
import styles from './ProductCatalog.module.scss'
import { ProductService } from '@/library/services/product-service'
import { Product } from '@/library/models/product/product'
import { CartService } from '@/library/services/cart-service'
import { WishlistService } from '@/library/services/wishlist-service'
import ProductFilter from '../ProductFilter'
import { PaginationInfo } from '@/common/models/pagination-info'


export default function ProductCatalog() {

  // Sử dụng useMemo để tránh tạo lại service mỗi khi render
  const productService = useMemo(() => new ProductService(), []);
  const cartService = useMemo(() => new CartService(), []);
  const wishListService = useMemo(() => new WishlistService(), []);

  const { message } = App.useApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false)
  const [productList, setProductList] = useState<Product[]>([]);
  const [noResults, setNoResults] = useState(false);
  
  // thông tin phân trang
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Lấy search query từ URL params
  const searchQuery = searchParams.get('search') || '';

  // Giữ category cho các URL trực tiếp
  const categoryQuery = searchParams.get('category') || '';

  const handleFilterChange = () => {
    message.success('Áp dụng bộ lọc thành công')
  }

  const handleClearFilters = () => {
    // Xóa các query params và quay về trang sản phẩm không có filter
    router.push('/customer/products');
    message.success('Đã xóa bộ lọc')
  }

  const handleAddToCart = async (product: Product) => {
    if (!product) return;

    cartService.addItem(product)
      .then((cartItemId) => {
        if (cartItemId) {
          message.success(`Đã thêm ${product.name} vào giỏ hàng`)
        } else {
          message.error(`Không thể thêm ${product.name} vào giỏ hàng. Vui lòng thử lại sau.`)
        }
      })
      .catch((err) => {
        console.error('Add to cart failed:', err);
        message.error(`Không thể thêm ${product.name} vào giỏ hàng. Vui lòng thử lại sau.`)
      })
  }

  const handleAddToWishlist = (productId: number) => {
    const result = wishListService.add(productId);
    if (result) {
      message.success(`Đã thêm sản phẩm vào danh sách yêu thích`)
    }
    else {
      message.info(`Sản phẩm đã có trong danh sách yêu thích`)
    }
  }

  // handle phân trang
  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page - 1);
    if (size && size !== pageSize) setPageSize(size);
  }

  // lấy hàng hoá khi thay đổi phân trang
  useEffect( () => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let products: Product[] = [];
        const data = await productService.getProducts({ page: currentPage, limit: pageSize });
        products = data.page_content;
        setProductList(products);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        message.error("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  } , [currentPage, pageSize])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setNoResults(false);
      try {
        let products: Product[] = [];
        let paginationInfo : PaginationInfo = {} as PaginationInfo;
        const searchParams: Record<string, unknown> = {};

        // Thêm các tham số tìm kiếm vào object params
        if (searchQuery) searchParams.name = searchQuery; // Tìm theo tên sản phẩm
        if (categoryQuery) searchParams.category_name = categoryQuery;

        // Nếu có tham số tìm kiếm
        if (Object.keys(searchParams).length > 0) {
          const data = await productService.getProducts(searchParams);
          products = data.page_content;
          paginationInfo = data.pagination_info;
        } else {
          // Nếu không có filter nào thì lấy tất cả sản phẩm
          const data = await productService.getProducts();
          products = data.page_content;
          paginationInfo = data.pagination_info;
        }

        setProductList(products);
        setTotalItems(paginationInfo.total_elements);
        setCurrentPage(paginationInfo.current_page);
        setPageSize(paginationInfo.page_size);
        setTotalPages(paginationInfo.total_pages);

        // Xác định xem có đang tìm kiếm không
        const isSearching = searchQuery || categoryQuery;

        // Nếu không có kết quả tìm kiếm
        if (products.length === 0 && isSearching) {
          setNoResults(true);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        message.error("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, categoryQuery, productService, message]);

  return (
    <div className={styles.catalogContainer}>
      <Row gutter={24} className={styles.mainContent}>
        {/* Thanh bộ lọc */}
        <Col xs={24} lg={6} className={styles.filterSidebar}>
          <ProductFilter
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </Col>

        {/* Lưới sản phẩm */}
        <Col xs={24} lg={18} className={styles.productSection}>
          {/* Đang tải */}
          {loading && (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          )}

          {/* Không có kết quả lọc*/}
          {!loading && noResults && (
            <div className={styles.emptyContainer}>
              <Result
                status="info"
                title="Không tìm thấy sản phẩm nào"
                subTitle={
                  searchQuery ? `Không tìm thấy sản phẩm cho "${searchQuery}". Thử từ khóa khác hoặc bỏ lọc.` :
                    categoryQuery ? `Không tìm thấy sản phẩm trong danh mục "${categoryQuery}".` :
                      "Thử bỏ lọc hoặc tìm kiếm khác để mở rộng kết quả."
                }
                extra={
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Button onClick={handleClearFilters} icon={<ClearOutlined />}>
                      Xóa tìm kiếm
                    </Button>
                    {(searchQuery || categoryQuery) && (
                      <Button type="primary" onClick={() => router.push('/customer/products')}>
                        Xem tất cả sản phẩm
                      </Button>
                    )}
                  </div>
                }
              />
            </div>
          )}

          {/* Lưới sản phẩm */}
          {!loading && productList.length > 0 && (
            <div className={styles.productsGrid}>
              {/* Hiển thị thông tin tìm kiếm khi có tìm kiếm */}
              {(searchQuery || categoryQuery) && (
                <div className={styles.searchResultsInfo}>
                  <span>
                    <strong>
                      {searchQuery && `Kết quả tìm kiếm cho "${searchQuery}"`}
                      {categoryQuery && `Sản phẩm trong danh mục "${categoryQuery}"`}
                    </strong>
                    : {productList.length} sản phẩm
                  </span>
                  <Button
                    type="text"
                    icon={<ClearOutlined />}
                    onClick={handleClearFilters}
                  >
                    Xóa tìm kiếm
                  </Button>
                </div>
              )}
              {/* danh sách sản phẩm */}
              <Row gutter={[16, 16]} className={styles.productGridRow}>
                {productList.map(product => (
                  <Col
                    key={product.id}
                    xs={24}
                    sm={12}
                    md={8}
                    xl={6}
                    className={styles.productCol}
                  >
                    {
                      <ProductCard
                        product={product}
                        onAddToCart={() => handleAddToCart(product)}
                        onAddToWishlist={() => handleAddToWishlist(product.id)}
                      />
                    }
                  </Col>
                ))}
              </Row>
              {/* phân trang */}
              <div className={styles.paginationContainer}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={handlePaginationChange}
                  showSizeChanger
                  showQuickJumper
                  pageSizeOptions={["8", "12", "24", "48"]}
                />
              </div>
            </div>
          )}

        </Col>
      </Row>
    </div>
  )
}