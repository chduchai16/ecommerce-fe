import api from "@/configs/axios-config";

export class UserService {
    public async getProfile() {
        const response = await api.get("/users/me");
        return response.data;
    }
}