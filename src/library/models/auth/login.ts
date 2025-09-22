export interface LoginRequest {
    phone_number: string;
    password: string;
    remember?: boolean;
}