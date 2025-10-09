import { Product } from "../product/product";

export interface OrderDetail {
    id?: number ;
    order_id?: number ;
    product?: Product;
    product_id?: number ;
    number_of_products : number ;
    price : number ;
    total_money: number ;
}