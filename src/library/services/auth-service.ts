import { LoginRequest } from "../models/auth/login";
import api from "../../configs/axios-config";

export class AuthService {

    async signIn(username: string, password: string, role : number ,remember?: boolean){
        const payload: LoginRequest = {
            phone_number: username,
            password: password,
            role : role,
            remember: remember
        }
        const response = await api.post('/auth/sign-in', payload);
        return response.data ; 
    }

    async getUserByToken(token : string ) {
        const response = await api.get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }

    async signUp(){

    }

    async setToken(token: string): Promise<void> {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
        }
    }
    async getToken(): Promise<string | null> {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token");
        }
        return null;
    }
    async clearToken(): Promise<void> {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
    }
}