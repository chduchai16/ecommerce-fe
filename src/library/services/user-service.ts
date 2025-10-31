import api from "@/configs/axios-config";
import { User } from "../models/user/user";

export class UserService {
    public async getProfile() {
        const response = await api.get("/users/me");
        return response.data;
    }

    public async updateProfile(user: User) {
        const response = await api.put('/users', user);
        return response.data;
    }

    public async uploadAvatar(file: Blob) {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await api.post('/users/user', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }

    public async changePassword(dto: { oldPassword: string; newPassword: string; confirmNewPassword: string }) {
        const payload = {
            old_password: dto.oldPassword,
            new_password: dto.newPassword,
            confirm_new_password: dto.confirmNewPassword
        }
        const response = await api.put('/users/change-password', payload);
        return response.data;
    }
}