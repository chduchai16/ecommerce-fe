export interface Order {
    id?: number ;
    user_id?: number ;
    total_price : number ;
    status?: number ;
    shipping_address?: string ;
    shipping_method?: string ;
    payment_method?: string ;
    
}