import { CartItem } from "./cart-item";

export interface Cart {
    id : number ;
    cart_items : CartItem[] ;
}