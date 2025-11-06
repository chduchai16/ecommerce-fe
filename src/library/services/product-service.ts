import api from "@/configs/axios-config";
import { Product } from "../models/product/product";

export interface ProductSearchParams {
  name?: string;
  category_name?: string;
  brand?: string;
  color?: string;
  min_price?: number;
  max_price?: number;
  min_stock?: number;
  min_rating?: number;
  description?: string;
  min_views?: number;
  status?: number;
  page?: number;
  limit?: number;
}

export class ProductService {

  public async getProducts(params?: Record<string, unknown>) {
    // Chuyển đổi từ tên tham số frontend sang tên tham số backend
    if (params) {
      const apiParams: Record<string, unknown> = { ...params };

      // Chuyển đổi search thành name nếu có
      if (params.search) {
        apiParams.name = params.search;
        delete apiParams.search;
      }

      // Chuyển đổi category thành category_name nếu có
      if (params.category) {
        apiParams.category_name = params.category;
        delete apiParams.category;
      }

      const response = await api.get("/products", { params: apiParams });
      return response.data;
    } else {
      const response = await api.get("/products");
      return response.data;
    }
  }

  public async getProductsByIds(ids: number[]) {
    const response = await api.post("/products/batch", ids);
    return response.data;
  }

  public async getProductById(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  public async createProduct(data: Product) {
    const response = await api.post("/products", data);
    return response.data;
  }

  public async updateProduct(id: number, data: Product) {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }

  public async deleteProduct(id: number) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }

}