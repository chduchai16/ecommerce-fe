import api from "@/configs/axios-config";
import { Order } from "../models/order/order";
import { PageResponse } from "@/common/models/page-response";

export class OrderService {
    public async createOrder(order: Order) {
        const response = await api.post("/orders", order);
        return response.data;
    }

    public async getOrderById(orderId: string | number) {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    }

    public async getOrdersByUser(): Promise<PageResponse<Order>> {
        const response = await api.get("/orders/user");
        return response.data;
    }

    // Lấy đơn hàng của seller (có sản phẩm của seller)
    public async getSellerOrders(params?: Record<string, unknown>) {
        const response = await api.get("/orders/seller/my-orders", { params });
        return response.data;
    }

    // Cập nhật đơn hàng
    public async updateOrder(order: Partial<Order>) {
        const response = await api.put(`/orders`, order);
        return response.data;
    }

    // Hủy đơn hàng
    public async cancelOrder(id: number) {
        const response = await api.post(`/orders/${id}/cancel`);
        return response.data;
    }
}