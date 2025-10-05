import api from "@/configs/axios-config";

export class CategoryService {
    public async getCategories() {
        const response = await api.get("/categories");
        return response.data;
    }
}