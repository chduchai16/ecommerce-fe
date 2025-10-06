'use client'

import { useState, useEffect } from 'react'
import { Button, Steps, App } from 'antd'
import { ShoppingCartOutlined, CreditCardOutlined, CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

import DeliveryInfoStep from '../DeliveryInfoStep/DeliveryInfoStep'
import PaymentMethodStep from '../PaymentMethodStep/PaymentMethodStep'
import VnpayPaymentStep from '../VnpayPaymentStep/VnpayPaymentStep'

import styles from './Checkout.module.scss'

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
    const { message } = App.useApp()
    const router = useRouter()

    useEffect(() => {
        // Nếu có cartId, có thể dùng để load thông tin giỏ hàng
        if (cartId) {
            console.log(`Đang tải thông tin giỏ hàng với ID: ${cartId}`)
            // Trong thực tế bạn sẽ gọi API để lấy chi tiết giỏ hàng theo cartId
            // fetchCartDetails(cartId)
        } else {
            message.warning('Không tìm thấy thông tin giỏ hàng')
        }
    }, [cartId, message])

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)

        // Nếu đến bước thanh toán VNPAY, bắt đầu đếm ngược
        if (currentStep + 1 === 2) {
            setIsProcessing(true)

            // Giả lập xử lý thanh toán trong 2 giây
            setTimeout(() => {
                setIsProcessing(false)
            }, 2000)

            // Đếm ngược từ 5 phút
            const countdown = setInterval(() => {
                setCountdownSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
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

    // Nội dung các bước thanh toán
    const stepContent = [
        // Bước 1: Thông tin giao hàng
        <DeliveryInfoStep key="delivery-info" orderData={mockOrderData} />,

        // Bước 2: Chọn phương thức thanh toán
        <PaymentMethodStep
            key="payment-method"
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
        />,

        // Bước 3: Thanh toán qua VNPAY
        <VnpayPaymentStep
            key="payment-process"
            isProcessing={isProcessing}
            orderData={mockOrderData}
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
                    <Button type="primary" onClick={() => router.push('/customer/orders')}>
                        Xem đơn hàng
                    </Button>
                )}
            </div>
        </div>
    )
}