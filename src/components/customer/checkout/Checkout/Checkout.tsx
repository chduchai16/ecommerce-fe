'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button, Steps, App } from 'antd'
import { ShoppingCartOutlined, CreditCardOutlined, CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

import DeliveryInfoStep, { DeliveryFormValues } from '../DeliveryInfoStep/DeliveryInfoStep'
import PaymentMethodStep from '../PaymentMethodStep/PaymentMethodStep'
import VnpayPaymentStep from '../VnpayPaymentStep/VnpayPaymentStep'
import { CartService } from '@/library/services/cart-service'
import { Order } from '@/library/models/order/order'

import styles from './Checkout.module.scss'
import { CartItem } from '@/library/models/cart/cart-item'

const { Step } = Steps

interface CheckoutProps {
    cartId?: string | null;
}

// Giả lập dữ liệu đơn hàng
const mockOrderData = {
    items: [
        { id: 1, name: 'Laptop Asus ZenBook', quantity: 1, price: 25000000 },
        { id: 2, name: 'Chuột không dây Logitech', quantity: 2, price: 450000 }
    ],
    subtotal: 25900000,
    shippingFee: 50000,
    discount: 0,
    total: 25950000
}

export default function Checkout({ cartId }: CheckoutProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedPayment, setSelectedPayment] = useState('vnpay')
    const [isProcessing, setIsProcessing] = useState(false)
    const [countdownSeconds, setCountdownSeconds] = useState(300) // 5 phút đếm ngược
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState(mockOrderData)
    const { message } = App.useApp()
    const router = useRouter()
    const cartService = useMemo(() => new CartService(), [])

    // Khởi tạo trạng thái form giao hàng
    const [deliveryFormValues, setDeliveryFormValues] = useState<DeliveryFormValues>({
        customer_name: '',
        phone_number: '',
        email: '',
        shipping_address: '',
        shipping_method: 'standard',
        notes: ''
    })

    // Lưu trữ thông tin đầy đủ của đơn hàng
    const [orderInfo, setOrderInfo] = useState<Partial<Order>>({
        payment_method: selectedPayment
    })

    useEffect(() => {
        // Nếu có cartId, dùng để load thông tin giỏ hàng
        const fetchCartDetails = async () => {
            if (cartId) {
                try {
                    setLoading(true)
                    console.log(`Đang tải thông tin giỏ hàng với ID: ${cartId}`)
                    // Gọi API để lấy chi tiết giỏ hàng theo cartId
                    const cart = await cartService.getCart()
                    setCartItems(cart.cart_items)

                    // Cập nhật orderData từ cart items thực tế
                    if (cart.cart_items.length > 0) {
                        const items = cart.cart_items.map(item => ({
                            id: item.id || 0,
                            name: item.product?.name || 'Sản phẩm không xác định',
                            quantity: item.quantity || 1,
                            price: item.product?.price || 0
                        }))

                        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
                        const shippingFee = 50000 // Phí cố định hoặc tính toán dựa trên logic khác

                        setOrderData({
                            items,
                            subtotal,
                            shippingFee,
                            discount: 0,
                            total: subtotal + shippingFee
                        })
                    }
                } catch (err) {
                    console.error('Không thể tải thông tin giỏ hàng:', err)
                    message.error('Không thể tải thông tin giỏ hàng. Vui lòng thử lại sau.')
                } finally {
                    setLoading(false)
                }
            } else {
                message.warning('Không tìm thấy thông tin giỏ hàng')
                setLoading(false)
            }
        }

        fetchCartDetails()
    }, [cartId, cartService, message])

    const handleNextStep = () => {
        // Kiểm tra điều kiện trước khi chuyển bước
        if (currentStep === 0) {
            // Đang ở bước nhập thông tin giao hàng, kiểm tra thông tin cần thiết
            const { customer_name, phone_number, shipping_address, shipping_method } = deliveryFormValues;
            if (!customer_name || !phone_number || !shipping_address || !shipping_method) {
                message.error('Vui lòng điền đầy đủ thông tin giao hàng');
                return;
            }
        }

        // Tiến hành chuyển bước
        setCurrentStep(currentStep + 1);

        // Nếu đến bước thanh toán VNPAY, bắt đầu đếm ngược và tạo đơn hàng
        if (currentStep + 1 === 2) {
            setIsProcessing(true);

            // Chuẩn bị dữ liệu đơn hàng để gửi đi
            const order: Partial<Order> = {
                ...orderInfo,
                total_price: orderData.total,
                payment_method: selectedPayment,
                status: 1, // Đang xử lý
                // Trong trường hợp thực tế, sẽ chuyển đổi cart_items thành order_details
                order_details: cartItems.map(item => ({
                    // product_id: item.product?.id,
                    quantity: item.quantity,
                    total: (item.product?.price || 0) * item.quantity
                }))
            };

            console.log('Đơn hàng sẽ được tạo:', order);
            // Trong trường hợp thực tế, ở đây sẽ gọi API tạo đơn hàng
            // const createdOrder = await orderService.createOrder(order);

            // Giả lập xử lý thanh toán trong 2 giây
            setTimeout(() => {
                setIsProcessing(false);
                // Đây là nơi sẽ xử lý kết quả tạo đơn hàng (nếu thành công/thất bại)
                message.success('Đã tạo đơn hàng thành công!');
            }, 2000);

            // Đếm ngược từ 5 phút
            const countdown = setInterval(() => {
                setCountdownSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    }

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1)
    }

    // Định dạng thời gian đếm ngược
    const formatCountdown = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // Xử lý thay đổi form giao hàng
    const handleDeliveryFormChange = (values: DeliveryFormValues) => {
        setDeliveryFormValues(values);

        // Cập nhật thông tin đơn hàng từ form
        setOrderInfo(prevOrder => ({
            ...prevOrder,
            customer_name: values.customer_name,
            phone_number: values.phone_number,
            email: values.email || null,
            shipping_address: values.shipping_address,
            shipping_method: values.shipping_method,
            notes: values.notes || null
        }));
    };

    // Nội dung các bước thanh toán
    const stepContent = [
        // Bước 1: Thông tin giao hàng
        <DeliveryInfoStep
            key="delivery-info"
            orderData={orderData}
            formValues={deliveryFormValues}
            onFormValuesChange={handleDeliveryFormChange}
        />,

        // Bước 2: Chọn phương thức thanh toán
        <PaymentMethodStep
            key="payment-method"
            selectedPayment={selectedPayment}
            setSelectedPayment={(method) => {
                setSelectedPayment(method);
                // Cập nhật phương thức thanh toán trong thông tin đơn hàng
                setOrderInfo(prevOrder => ({
                    ...prevOrder,
                    payment_method: method
                }));
            }}
        />,

        // Bước 3: Thanh toán qua VNPAY
        <VnpayPaymentStep
            key="payment-process"
            isProcessing={isProcessing}
            orderData={orderData}
            countdownSeconds={countdownSeconds}
            formatCountdown={formatCountdown}
        />
    ]

    return (
        <div className={styles.checkoutPage}>
            <Steps current={currentStep} responsive={true}>
                <Step title="Thông tin giao hàng" icon={<ShoppingCartOutlined />} />
                <Step title="Phương thức thanh toán" icon={<CreditCardOutlined />} />
                <Step title="Hoàn thành thanh toán" icon={<CheckCircleOutlined />} />
            </Steps>

            <div className={styles.stepContent}>
                {stepContent[currentStep]}
            </div>

            <div className={styles.actionButtons}>
                {currentStep > 0 && (
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={handlePreviousStep}
                        className={styles.backButton}
                    >
                        Quay lại
                    </Button>
                )}

                {currentStep === 0 && (
                    <Button type="primary" onClick={handleNextStep}>
                        Tiếp tục
                    </Button>
                )}

                {currentStep === 1 && (
                    <Button type="primary" onClick={handleNextStep}>
                        Thanh toán ngay
                    </Button>
                )}

                {currentStep === 2 && (
                    <Button type="primary" onClick={() => {
                        message.success('Đơn hàng của bạn đã được xác nhận!');
                        // Trong thực tế, ở đây sẽ lưu thông tin đơn hàng nếu cần
                        // Chuyển hướng đến trang đơn hàng hoặc trang sản phẩm
                        router.push('/customer/orders');
                    }}>
                        Xem đơn hàng
                    </Button>
                )}
            </div>
        </div>
    )
}