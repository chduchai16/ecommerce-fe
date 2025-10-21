import { Alert, Spin, Typography, Button } from 'antd';
import { CurrencyHelper } from '@/library/helpers/CurrencyHelper';
import styles from './VnpayPaymentStep.module.scss';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface OrderData {
    items: {
        id: number;
        name: string;
        quantity: number;
        price: number;
    }[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
}

interface VnpayPaymentStepProps {
    isProcessing: boolean;
    orderData: OrderData;
    countdownSeconds: number;
    formatCountdown: (seconds: number) => string;
}

export default function VnpayPaymentStep({
    isProcessing,
    orderData,
    countdownSeconds: initialCountdown,
    formatCountdown
}: VnpayPaymentStepProps) {
    const [remainingSeconds, setRemainingSeconds] = useState<number>(initialCountdown);
    const [isExpired, setIsExpired] = useState<boolean>(false);

    // Thiết lập interval để đếm ngược
    useEffect(() => {
        // Đảm bảo giá trị khởi tạo
        setRemainingSeconds(initialCountdown);

        const intervalId = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    setIsExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Xóa interval khi component unmount
        return () => clearInterval(intervalId);
    }, [initialCountdown]);

    return (
        <div className={styles.vnpaySection}>
            <div className={styles.vnpayHeader}>
                <div className={styles.vnpayLogo}>
                    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="40" rx="4" fill="#005BAA" />
                        <path d="M20 12H100V28H20V12Z" fill="white" />
                        <text x="30" y="24" fill="#005BAA" fontSize="14" fontWeight="bold">VNPAY</text>
                    </svg>
                </div>
                <div className={styles.vnpayTitle}>Thanh toán trực tuyến VNPAY</div>
            </div>

            {isProcessing ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                    <Spin size="large" tip="Đang xử lý thanh toán..." />
                </div>
            ) : (
                <>
                    {isExpired ? (
                        <Alert
                            message="Giao dịch đã hết hạn"
                            description="Thời gian thanh toán đã hết hạn. Vui lòng thực hiện lại giao dịch."
                            type="error"
                            showIcon
                            style={{ marginBottom: 20 }}
                            action={
                                <Button type="primary" danger onClick={() => window.location.reload()}>
                                    Thử lại
                                </Button>
                            }
                        />
                    ) : (
                        <Alert
                            message="Giao dịch đang chờ xử lý"
                            description={
                                <div>
                                    Vui lòng hoàn thành thanh toán trong thời gian còn lại:
                                    <span className={styles.countdown}>
                                        {formatCountdown(remainingSeconds)}
                                    </span>
                                </div>
                            }
                            type="warning"
                            showIcon
                            style={{ marginBottom: 20 }}
                        />
                    )}

                    <div className={styles.vnpayAmount}>
                        <div className={styles.amountLabel}>Số tiền thanh toán</div>
                        <div className={styles.amountValue}>{CurrencyHelper.formatVND(orderData.total)}</div>
                    </div>

                    {!isExpired && (
                        <div className={styles.qrCodeSection}>
                            <div className={styles.qrDescription}>
                                <Text>Quét mã QR để thanh toán</Text>
                            </div>
                            <div className={styles.qrPlaceholder}>
                                <Text type="secondary">[Mã QR thanh toán]</Text>
                            </div>
                            <Text type="secondary">Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã</Text>
                        </div>
                    )}

                    <Alert
                        message="Lưu ý"
                        description={isExpired
                            ? "Giao dịch đã hết hạn. Bạn cần tạo lại giao dịch mới để tiếp tục thanh toán."
                            : "Nếu có bất kỳ vấn đề nào trong quá trình thanh toán, vui lòng liên hệ bộ phận hỗ trợ khách hàng."}
                        type="info"
                        showIcon
                    />
                </>
            )}
        </div>
    );
}