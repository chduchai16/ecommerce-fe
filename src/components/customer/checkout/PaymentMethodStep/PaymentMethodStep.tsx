import { Alert } from 'antd';
import styles from './PaymentMethodStep.module.scss';

interface PaymentMethodStepProps {
    selectedPayment: string;
    setSelectedPayment: (method: string) => void;
}

export default function PaymentMethodStep({ selectedPayment, setSelectedPayment }: PaymentMethodStepProps) {
    return (
        <div className={styles.paymentSection}>
            <Alert
                message="Thanh toán an toàn"
                description="Tất cả thông tin thanh toán của bạn được bảo mật và mã hóa."
                type="info"
                showIcon
                style={{ marginBottom: 20 }}
            />

            <h5 className={styles.sectionTitle}>Chọn phương thức thanh toán</h5>

            <div className={styles.paymentMethods}>
                <div
                    className={`${styles.paymentMethod} ${selectedPayment === 'vnpay' ? styles.active : ''}`}
                    onClick={() => setSelectedPayment('vnpay')}
                >
                    <div className={styles.methodIcon}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="4" fill="#0057B8" />
                            <path d="M8 12H24V20H8V12Z" fill="white" />
                            <path d="M12 15.5L14 18.5L20 14" stroke="#0057B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <div className={styles.methodName}>VNPAY</div>
                        <div className={styles.methodDescription}>Thanh toán qua VNPAY (QR Code, thẻ ATM, Visa, Master)</div>
                    </div>
                </div>

                <div
                    className={`${styles.paymentMethod} ${selectedPayment === 'cod' ? styles.active : ''}`}
                    onClick={() => setSelectedPayment('cod')}
                >
                    <div className={styles.methodIcon}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="4" fill="#F9F9F9" />
                            <path d="M8 10H24V22H8V10Z" stroke="#666" strokeWidth="2" />
                            <path d="M12 16L16 18L20 16" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <div className={styles.methodName}>COD</div>
                        <div className={styles.methodDescription}>Thanh toán khi nhận hàng</div>
                    </div>
                </div>
            </div>
        </div>
    );
}