export interface LoginRequest {
    phone_number: string;
    password: string;
    role : number ;
    remember?: boolean;
}