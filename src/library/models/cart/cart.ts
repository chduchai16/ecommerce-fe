import { CartItem } from "./cart-item";

export interface Cart {
    id : string ;
    cart_items : CartItem[] ;
    created_at : string ;
    updated_at : string ;
}