import { Form, Input, Row, Col, Typography, Divider } from 'antd';
import { CurrencyHelper } from '@/library/helpers/CurrencyHelper';
import styles from './DeliveryInfoStep.module.scss';

const { Title, Text } = Typography;

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface OrderData {
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
}

interface DeliveryInfoStepProps {
    orderData: OrderData;
}

export default function DeliveryInfoStep({ orderData }: DeliveryInfoStepProps) {
    return (
        <div className={styles.deliveryInfo}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Họ tên người nhận" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                            <Input placeholder="Nhập họ tên người nhận" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Địa chỉ giao hàng" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                    <Input.TextArea rows={3} placeholder="Nhập địa chỉ giao hàng" />
                </Form.Item>
                <Form.Item label="Ghi chú (tùy chọn)" name="notes">
                    <Input.TextArea rows={2} placeholder="Nhập ghi chú về đơn hàng (nếu có)" />
                </Form.Item>
            </Form>

            <div className={styles.orderSummary}>
                <div className={styles.summaryHeader}>
                    <Title level={5}>Chi tiết đơn hàng</Title>
                </div>
                {orderData.items.map((item) => (
                    <div key={item.id} className={styles.summaryRow}>
                        <Text className={styles.label}>{item.name} x{item.quantity}</Text>
                        <Text className={styles.value}>{CurrencyHelper.formatVND(item.price * item.quantity)}</Text>
                    </div>
                ))}
                <Divider style={{ margin: '10px 0' }} />
                <div className={styles.summaryRow}>
                    <Text className={styles.label}>Tạm tính</Text>
                    <Text className={styles.value}>{CurrencyHelper.formatVND(orderData.subtotal)}</Text>
                </div>
                <div className={styles.summaryRow}>
                    <Text className={styles.label}>Phí vận chuyển</Text>
                    <Text className={styles.value}>{CurrencyHelper.formatVND(orderData.shippingFee)}</Text>
                </div>
                {orderData.discount > 0 && (
                    <div className={styles.summaryRow}>
                        <Text className={styles.label}>Giảm giá</Text>
                        <Text className={styles.value}>-{CurrencyHelper.formatVND(orderData.discount)}</Text>
                    </div>
                )}
                <div className={styles.totalRow}>
                    <Text>Tổng thanh toán</Text>
                    <Text type="danger">{CurrencyHelper.formatVND(orderData.total)}</Text>
                </div>
            </div>
        </div>
    );
}