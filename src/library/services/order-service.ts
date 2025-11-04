import api from "@/configs/axios-config";
import { Order } from "../models/order/order";
import { PageResponse } from "@/common/models/page-response";

export class OrderService {
    public async createOrder (order : Order){
        const response = await api.post("/orders", order);
        return response.data;
    }

    public async getOrderById (orderId : string){
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    }

    public async getOrdersByUser () : Promise<PageResponse<Order>> {
        const response = await api.get("/orders/user");
        return response.data;
    }
}