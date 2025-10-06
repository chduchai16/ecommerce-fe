import { Form, Input, Row, Col, Typography, Divider, Select } from 'antd';
import { CurrencyHelper } from '@/library/helpers/CurrencyHelper';
import { useEffect } from 'react';
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

export interface DeliveryFormValues {
    customer_name: string;
    phone_number: string;
    email?: string;
    shipping_address: string;
    shipping_method: string;
    notes?: string;
}

interface DeliveryInfoStepProps {
    orderData: OrderData;
    onFormValuesChange: (values: DeliveryFormValues) => void;
    formValues: DeliveryFormValues;
}

export default function DeliveryInfoStep({ orderData, onFormValuesChange, formValues }: DeliveryInfoStepProps) {
    const [form] = Form.useForm();

    // Khởi tạo form với giá trị từ props
    useEffect(() => {
        form.setFieldsValue(formValues);
    }, [form, formValues]);

    // Xử lý khi giá trị form thay đổi
    const handleValuesChange = (_: unknown, allValues: DeliveryFormValues) => {
        onFormValuesChange(allValues);
    };

    return (
        <div className={styles.deliveryInfo}>
            <Form
                layout="vertical"
                form={form}
                initialValues={formValues}
                onValuesChange={handleValuesChange}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Họ tên người nhận"
                            name="customer_name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                        >
                            <Input placeholder="Nhập họ tên người nhận" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone_number"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                >
                    <Input placeholder="Nhập email (tùy chọn)" />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ giao hàng"
                    name="shipping_address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                    <Input.TextArea rows={3} placeholder="Nhập địa chỉ giao hàng" />
                </Form.Item>
                <Form.Item
                    label="Phương thức vận chuyển"
                    name="shipping_method"
                    rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển' }]}
                >
                    <Select placeholder="Chọn phương thức vận chuyển">
                        <Select.Option value="standard">Giao hàng tiêu chuẩn (2-3 ngày)</Select.Option>
                        <Select.Option value="express">Giao hàng nhanh (24h)</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ghi chú (tùy chọn)"
                    name="notes"
                >
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