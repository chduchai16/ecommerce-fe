import api from "@/configs/axios-config";
import { Product } from "../models/product/product";

export class ProductService {

  public async getProducts(params?: Record<string, unknown>) {
    const response = await api.get("/products", { params });
    return response.data.page_content;
  }

  public async getProductsByIds(ids: number[]) {
    const response = await api.post("/products/batch", ids);
    return response.data;
  }

  public async getProductById(id : number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  public async createProduct(data : Product) {
    const response = await api.post("/products", data);
    return response.data;
  }

  public async updateProduct(id : number, data : Product) {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }

  public async deleteProduct(id : number) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }

}