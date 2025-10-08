import { Product } from "../product/product";

export interface OrderDetail {
    id?: number ;
    order_id?: number ;
    product?: Product;
    product_id?: number ;
    quantity : number ;
    total: number ;
}