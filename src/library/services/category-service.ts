import api from "@/configs/axios-config";
import { Category } from "../models/category/category";

export class CategoryService {
    public async getAllCategories() {
        const response = await api.get("/categories");
        return response.data;
    }

    public async getCategoryById(id: number) {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    }

    public async createCategory(data: Category) {
        const response = await api.post("/categories", data);
        return response.data;
    }

    public async updateCategory(id: number, data: Category) {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    }

    public async deleteCategory(id: number) {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    }
}