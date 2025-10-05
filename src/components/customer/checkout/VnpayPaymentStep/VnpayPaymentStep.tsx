import { Alert, Spin, Typography } from 'antd';
import { CurrencyHelper } from '@/library/helpers/CurrencyHelper';
import styles from './VnpayPaymentStep.module.scss';

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
    countdownSeconds,
    formatCountdown
}: VnpayPaymentStepProps) {
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
                    <Alert
                        message="Giao dịch đang chờ xử lý"
                        description={`Vui lòng hoàn thành thanh toán trong thời gian còn lại: ${formatCountdown(countdownSeconds)}`}
                        type="warning"
                        showIcon
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.vnpayAmount}>
                        <div className={styles.amountLabel}>Số tiền thanh toán</div>
                        <div className={styles.amountValue}>{CurrencyHelper.formatVND(orderData.total)}</div>
                    </div>

                    <div className={styles.qrCodeSection}>
                        <div className={styles.qrDescription}>
                            <Text>Quét mã QR để thanh toán</Text>
                        </div>
                        <div className={styles.qrPlaceholder}>
                            <Text type="secondary">[Mã QR thanh toán]</Text>
                        </div>
                        <Text type="secondary">Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã</Text>
                    </div>

                    <Alert
                        message="Lưu ý"
                        description="Đây chỉ là giao diện mô phỏng, không thực hiện thanh toán thật."
                        type="info"
                        showIcon
                    />
                </>
            )}
        </div>
    );
}