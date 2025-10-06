import { Product } from "../product/product";

export interface OrderDetail {
    id?: number ;
    order_id?: number ;
    product?: Product;
    quantity : number ;
    total: number ;
}