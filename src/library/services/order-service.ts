import api from "@/configs/axios-config";
import { Order } from "../models/order/order";

export class OrderService {
    public async createOrder (order : Order){
        const response = await api.post("/orders", order);
        return response.data;
    }
}