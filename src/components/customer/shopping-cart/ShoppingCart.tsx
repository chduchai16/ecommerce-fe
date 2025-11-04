'use client'

import { useEffect, useState, useMemo } from 'react'
import { Row, Col, Typography, Button, Table, InputNumber, Image, Card, Divider, Empty, App } from 'antd'
import { DeleteOutlined, ShoppingOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CurrencyHelper } from '@/library/helpers'
import { mediaProductBaseUrl } from '@/library/consts/app_constants'
import styles from './ShoppingCart.module.scss'
import { CartService } from '@/library/services/cart-service'
import { Cart } from '@/library/models/cart/cart'
import { CartItem } from '@/library/models/cart/cart-item'

const { Title, Text } = Typography

export default function ShoppingCart() {
  const { message } = App.useApp();
  const router = useRouter();
  const cartService = useMemo(() => new CartService(), [])

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // lấy giỏ hàng từ api
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const cart: Cart = await cartService.getCart();
        setCartItems(cart.cart_items);
        setCartId(cart.id);
      } catch (err) {
        console.error('Load cart failed', err)
      }
      finally {
        setLoading(false)
      }
    }
    fetchCart();
  }, [cartService, message])

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (itemId?: number) => {
    if (!itemId) return;
    setCartItems(cartItems.filter(i => i.id !== itemId));
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateItemQuantity = (quantity: number, itemId?: number) => {
    if (!itemId) return;
    setCartItems(prev =>
      prev.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      )
    );
  };

  // Xóa tất cả sản phẩm khỏi giỏ hàng
  const clearCart = () => {
    setCartItems([]);
    handleSaveCart([]); // Truyền giá trị rỗng vào
  };


  // Tính thành tiền cho mỗi sản phẩm
  const calculateSubtotal = (item: CartItem) => {
    const price = item.product?.price ?? 0
    const qty = item.quantity ?? 0
    return price * qty
  }

  // Tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0)
  }

  // Cập nhật giỏ hàng lên server
  const handleSaveCart = async (items?: CartItem[]) => {
    const newItems = items ?? cartItems; // nếu không truyền thì dùng state hiện tại

    if (cartId === 0) return;

    setSaving(true);
    try {
      const updateItems = newItems.map(item => ({
        id: item.id,
        product_id: item.product?.id,
        quantity: item.quantity,
        cart_id: cartId
      }));

      const cart: Cart = { id: cartId, cart_items: updateItems };
      const apiResponse = await cartService.updateCart(cart);

      if (apiResponse.status === 200) {
        message.success('Cập nhật giỏ hàng thành công');
      } else {
        message.error('Cập nhật giỏ hàng thất bại. Vui lòng thử lại sau.');
      }
    } catch {
      message.error('Cập nhật giỏ hàng thất bại. Vui lòng thử lại sau.');
    } finally {
      setSaving(false);
    }
  };

  const handleCheckout = () => {
    // Kiểm tra nếu giỏ hàng trống thì hiển thị thông báo
    if (cartItems.length <= 0) {
      message.warning('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng để tiếp tục.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/customer/checkout?cartId=${cartId}`);
    }, 300);
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (_: unknown, record: CartItem) => (
        <div className={styles.productInfo}>
          {record.product ? (
            <>
              <Image
                src={
                  mediaProductBaseUrl +
                  (record.product.thumbnail ?? record.product.product_images?.[0]?.image_name ?? '')
                }
                alt={record.product.name}
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <Link href={`/customer/products/${record.product.id}`}>
                  <Text strong className={styles.productName}>
                    {record.product.name}
                  </Text>
                </Link>
                <Text className={styles.productBrand}>
                  {record.product.brand}
                </Text>
                <Text className={styles.productPrice}>
                  {CurrencyHelper.formatVND(record.product.price)}
                </Text>
              </div>
            </>
          ) : (
            <div className={styles.productDetails}>
              <Text type="secondary">Sản phẩm không khả dụng</Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (_: unknown, record: CartItem) => (
        <InputNumber
          min={1}
          max={99}
          value={record.quantity}
          onChange={(value) => updateItemQuantity(value || 1, record.id)}
          style={{ width: '100px' }}
        />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'subtotal',
      width: 150,
      render: (_: unknown, record: CartItem) => (
        <Text strong className={styles.subtotal}>
          {CurrencyHelper.formatVND(calculateSubtotal(record))}
        </Text>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      render: (_: unknown, record: CartItem) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.id)}
          className={styles.deleteBtn}
          title="Xóa sản phẩm"
        />
      ),
    },
  ]

  if (cartItems.length === 0) {
    return (
      <div className={styles.shoppingCart}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text>Giỏ hàng của bạn đang trống</Text>
                  <br />
                  <Text type="secondary">Hãy thêm sản phẩm để tiếp tục mua sắm</Text>
                </div>
              }
            >
              <Link href="/customer/products">
                <Button type="primary" icon={<ShoppingOutlined />}>
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </Empty>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <Link href="/customer/products">
            <Button icon={<ArrowLeftOutlined />} type="text">
              Tiếp tục mua sắm
            </Button>
          </Link>
          <Button type="text" onClick={clearCart} className={styles.clearBtn}>
            Xoá tất cả
          </Button>
        </div>

        <Row gutter={[24, 24]}>
          {/* Cart Items */}
          <Col xs={24} lg={17}>
            <Card className={styles.cartTable}>
              <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
                rowKey="id"
                className={styles.table}
              />
            </Card>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={7}>
            <Card className={styles.orderSummary}>
              <Title level={4} className={styles.summaryTitle}>
                Tổng kết đơn hàng
              </Title>

              <div className={styles.summaryContent}>
                <div className={styles.summaryRow}>
                  <Text>Tạm tính:</Text>
                  <Text strong>{CurrencyHelper.formatVND(calculateTotal())}</Text>
                </div>

                <div className={styles.summaryRow}>
                  <Text>Phí vận chuyển:</Text>
                  <Text>Miễn phí</Text>
                </div>

                <Divider className={styles.divider} />

                <div className={styles.summaryRow}>
                  <Text strong>Tổng cộng:</Text>
                  <Text strong className={styles.totalAmount}>
                    {CurrencyHelper.formatVND(calculateTotal())}
                  </Text>
                </div>
              </div>

              <Button
                type="default"
                block
                onClick={() => handleSaveCart()}
                loading={saving}
                className={styles.saveBtn}
                style={{ marginBottom: 12 }}
              >
                Lưu lại thông tin
              </Button>

              <Button
                type="primary"
                block
                onClick={handleCheckout}
                loading={loading}
                disabled={cartItems.length <= 0}
                className={styles.checkoutBtn}
              >
                Tiến hành đặt hàng
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}