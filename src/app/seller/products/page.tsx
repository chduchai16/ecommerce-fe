'use client'

import { Badge, Button, Space, Table, Tag, Modal, message, Input, Select, Row, Col, Card, InputNumber } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, StarFilled, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { formatCurrency, getProductReviews } from '@/library/mocks/seller-mock-data'
import { ProductModal } from '@/components/shared/product-modal'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useState, useEffect } from 'react'
import { ProductService } from '@/library/services/product-service'
import { CategoryService } from '@/library/services/category-service'
import { useAuth } from '@/contexts/auth-context'

const productService = new ProductService()
const categoryService = new CategoryService()

const SellerProductsPage = () => {
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view')
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState<any | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  
  // Filter states
  const [filters, setFilters] = useState({
    searchString: '',
    category_name: undefined as string | undefined,
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    min_views: undefined as number | undefined,
    status: undefined as number | undefined,
  })

  // Load categories khi component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  // Load products khi component mount hoặc pagination/filters thay đổi
  // Chỉ gọi API khi user đã được load
  useEffect(() => {
    if (user?.id) {
      fetchProducts()
    }
  }, [user?.id, pagination.current, pagination.pageSize, filters])

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      message.error('Không thể tải danh mục')
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Gọi API lấy sản phẩm của seller
      const params: any = {
        page: pagination.current - 1,
        limit: pagination.pageSize,
        user_id: user?.id, // Lấy user_id từ AuthContext
      }

      // Thêm filters vào params nếu có
      if (filters.searchString) params.name = filters.searchString
      if (filters.category_name) params.category_name = filters.category_name
      if (filters.min_price !== undefined) params.min_price = filters.min_price
      if (filters.max_price !== undefined) params.max_price = filters.max_price
      if (filters.min_views !== undefined) params.min_views = filters.min_views
      if (filters.status !== undefined) params.status = filters.status

      const response = await productService.getMyProducts(params)
      
      // Response trực tiếp là { page_content, pagination_info }
      if (response) {
        setProducts(response.page_content || [])
        setPagination(prev => ({
          ...prev,
          total: response.pagination_info?.total_elements || 0,
        }))
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      message.error('Không thể tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }))
    fetchProducts()
  }

  const handleResetFilters = () => {
    setFilters({
      searchString: '',
      category_name: undefined,
      min_price: undefined,
      max_price: undefined,
      min_views: undefined,
      status: undefined,
    })
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: pagination.total,
    })
  }

  const handleView = (record: any) => {
    setSelectedProduct(record)
    setModalMode('view')
    setModalOpen(true)
    // Fetch chi tiết sản phẩm từ API
    fetchProductDetail(record.id)
  }

  const handleEdit = (record: any) => {
    setSelectedProduct(record)
    setModalMode('edit')
    setModalOpen(true)
    // Fetch chi tiết sản phẩm từ API
    fetchProductDetail(record.id)
  }

  const fetchProductDetail = async (productId: number) => {
    try {
      const detailedProduct = await productService.getProductById(productId)
      setSelectedProduct(detailedProduct)
    } catch (error) {
      message.error('Không thể tải chi tiết sản phẩm')
    }
  }

  const handleAdd = () => {
    setSelectedProduct(null)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleSave = async (values: any) => {
    try {
      if (!user?.id) {
        message.error('Không tìm thấy thông tin người dùng')
        return
      }

      const productDTO: any = {
        name: values.name,
        description: values.description || null,
        price: values.price,
        original_price: values.original_price || null,
        discount: 10 ,
        stock_quantity: values.stock_quantity,
        category_id: values.category_id,
        brand: values.brand || null,
        in_stock: (values.stock_quantity || 0) > 0,
        seller_id: user.id,
        tags: null,
        thumbnail: null,
        views: null,
        status: values.status || 0, // Mặc định là 0 (Đang bán)
      }

      if (selectedProduct?.id) {
        // Update product - thêm id vào DTO
        productDTO.id = selectedProduct.id
        await productService.updateProduct(productDTO)
        message.success('Cập nhật sản phẩm thành công!')
      } else {
        // Create new product
        await productService.createProduct(productDTO)
        message.success('Thêm sản phẩm thành công!')
      }
      setModalOpen(false)
      fetchProducts() // Reload danh sách
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra')
    }
  }

  const handleDelete = (record: any) => {
    setDeleteProduct(record)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteProduct) return
    try {
      await productService.deleteProduct(deleteProduct.id)
      message.success('Xóa sản phẩm thành công!')
      setDeleteModalOpen(false)
      setDeleteProduct(null)
      fetchProducts() // Reload danh sách
    } catch (error: any) {
      message.error(error.message || 'Không thể xóa sản phẩm')
    }
  }

  const cancelDelete = () => {
    setDeleteModalOpen(false)
    setDeleteProduct(null)
  }
  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category_name',
      key: 'category_name',
      width: 120,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 140,
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock_quantity',
      key: 'stock_quantity',
      width: 90,
      align: 'center',
      render: (value: number) => (
        <Badge
          count={value}
          showZero
          color={value === 0 ? 'red' : value < 15 ? 'orange' : 'green'}
          overflowCount={999}
        />
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'average_rating',
      key: 'average_rating',
      width: 100,
      render: (value?: number) => value ? (
        <span><StarFilled style={{ color: '#faad14' }} /> {value.toFixed(1)}</span>
      ) : '-',
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      render: (value?: number) => value || 0,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (value: number) => (
        <Tag color={value === 0 ? 'success' : 'default'}>
          {value === 0 ? 'Đang bán' : 'Ngừng bán'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Sản phẩm của tôi</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filter Section */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm tên sản phẩm..."
              prefix={<SearchOutlined />}
              value={filters.searchString}
              onChange={(e) => setFilters({ ...filters, searchString: e.target.value })}
              onPressEnter={handleSearch}
              allowClear
            />
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Danh mục"
              style={{ width: '100%' }}
              value={filters.category_name}
              onChange={(value) => setFilters({ ...filters, category_name: value })}
              allowClear
            >
              {categories.map(cat => (
                <Select.Option key={cat.id} value={cat.name}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Trạng thái"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              allowClear
            >
              <Select.Option value={1}>Đang bán</Select.Option>
              <Select.Option value={0}>Ngừng bán</Select.Option>
            </Select>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <InputNumber
              placeholder="Giá từ"
              style={{ width: '100%' }}
              value={filters.min_price}
              onChange={(value) => setFilters({ ...filters, min_price: value || undefined })}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
              min={0}
            />
          </Col>

          <Col xs={12} sm={6} md={4}>
            <InputNumber
              placeholder="Giá đến"
              style={{ width: '100%' }}
              value={filters.max_price}
              onChange={(value) => setFilters({ ...filters, max_price: value || undefined })}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
              min={0}
            />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <InputNumber
              placeholder="Lượt xem tối thiểu"
              style={{ width: '100%' }}
              value={filters.min_views}
              onChange={(value) => setFilters({ ...filters, min_views: value || undefined })}
              min={0}
            />
          </Col>

          <Col xs={24} md={8}>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                Tìm kiếm
              </Button>
              <Button onClick={handleResetFilters}>
                Đặt lại
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1400 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} sản phẩm`,
          pageSizeOptions: ['10', '20', '50'],
        }}
        onChange={handleTableChange}
      />

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
        mode={modalMode}
        reviews={selectedProduct ? getProductReviews(selectedProduct.id) : []}
        categories={categories}
      />

      <Modal
        title="Xác nhận xóa sản phẩm"
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        {deleteProduct && (
          <p>Bạn có chắc chắn muốn xóa sản phẩm "<strong>{deleteProduct.name}</strong>"?</p>
        )}
      </Modal>
    </div>
  )
}

export default SellerProductsPage
