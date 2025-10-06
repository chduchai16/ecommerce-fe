import { OrderDetail } from "./order-detail";

export interface Order {
    id?: number ;
    user_id?: number ;
    total_price : number ;
    status?: number ;
    shipping_address?: string ;
    shipping_method?: string ;
    payment_method?: string ;
    customer_name: string ;
    phone_number : string ;
    email?: string | null ;
    notes?: string | null ;
    coupon_code?: string | null ;
    order_details ?: OrderDetail[] ;
    order_detail_ids ?: number[] ;
}