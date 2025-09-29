import { Product } from "../product/product";

export interface CartItem {
    id?: number ;
    product? : Product ;
    quantity : number ; 
    product_id? : number ;
    cart_id? : number ;
}