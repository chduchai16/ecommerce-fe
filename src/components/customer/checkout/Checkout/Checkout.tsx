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
import { OrderService } from '@/library/services/order-service'

const { Step } = Steps

interface CheckoutProps {
    cartId?: string | null;
}

interface OrderData {
    items: { id: number; name: string; quantity: number; price: number }[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
}


export default function Checkout({ cartId }: CheckoutProps) {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [selectedPayment, setSelectedPayment] = useState<string>('vnpay')
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [countdownSeconds, setCountdownSeconds] = useState<number>(300)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [orderData, setOrderData] = useState<OrderData>({
        items: [],
        subtotal: 0,
        shippingFee: 0,
        discount: 0,
        total: 0
    })
    const { message } = App.useApp()
    const router = useRouter()
    const cartService = useMemo(() => new CartService(), [])
    const orderService = useMemo(() => new OrderService(), [])

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
                    // Gọi API để lấy chi tiết giỏ hàng theo cartId
                    const cart = await cartService.getCart()
                    setCartItems(cart.cart_items)

                    // Cập nhật orderData từ cart items
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

    // Tạo đơn hàng
    const createOrder = async (): Promise<boolean> => {
        try {
            setIsProcessing(true);

            const order: Partial<Order> = {
                ...orderInfo,
                total_price: orderData.total,
                payment_method: selectedPayment,
                status: 0,
                order_details: cartItems.map(item => ({
                    product_id: item.product?.id,
                    number_of_products: item.quantity,
                    price: item.product?.price || 0,
                    total_money: (item.product?.price || 0) * item.quantity
                }))
            };
            await orderService.createOrder(order as Order);
            message.success('Đơn hàng của bạn đã được tạo thành công!');
            return true;
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            message.error('Không thể tạo đơn hàng. Vui lòng thử lại sau.');
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleNextStep = async () => {
        if (currentStep === 0) {
            const { customer_name, phone_number, shipping_address, shipping_method } = deliveryFormValues;
            if (!customer_name || !phone_number || !shipping_address || !shipping_method) {
                message.error('Vui lòng điền đầy đủ thông tin giao hàng');
                return;
            }
        }

        // Nếu là phương thức COD và đang ở bước chọn phương thức thanh toán, tạo đơn hàng luôn
        if (currentStep === 1 && selectedPayment === 'cod') {
            await createOrder();
            redirectToOrders();
            return;
        }

        // Nếu là thanh toán VNPAY và chuyển sang bước cuối cùng
        if (currentStep === 1 && selectedPayment === 'vnpay') {
            setCountdownSeconds(300); // Đặt lại bộ đếm ngược thành 5 phút
        }
        setCurrentStep(currentStep + 1);
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

    const redirectToOrders = () => {
        router.push('/customer/orders');
    }

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

                {
                    currentStep === 1 && selectedPayment === 'cod' && (
                        <Button type="primary" onClick={handleNextStep} loading={isProcessing}>
                            Đặt hàng
                        </Button>
                    )
                }

                {
                    currentStep === 1 && selectedPayment === 'vnpay' && (
                        <Button type="primary" onClick={handleNextStep}>
                            Thanh toán với VNPAY
                        </Button>
                    )
                }

                {currentStep === 2 && (
                    <Button
                        type="primary"
                        onClick={async () => {
                            const success = await createOrder();
                            if (success) {
                                redirectToOrders();
                            }
                        }}
                        loading={isProcessing}
                    >
                        Hoàn thành thanh toán
                    </Button>
                )}
            </div>
        </div>
    )
}