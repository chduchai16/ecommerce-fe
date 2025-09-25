import api from "@/configs/axios-config";
import { Product } from "../models/product/product";

export class ProductService {

  static async getProducts(params?: Record<string, unknown>) {
    const response = await api.get("/products", { params });
    return response.data.page_content;
  }

  static async getProductById(id : number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  static async createProduct(data : Product) {
    const response = await api.post("/products", data);
    return response.data;
  }

  static async updateProduct(id : number, data : Product) {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }

  static async deleteProduct(id : number) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }

}