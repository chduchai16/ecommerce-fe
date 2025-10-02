import api from "@/configs/axios-config";
import { Cart } from "../models/cart/cart";
import { Product } from "../models/product/product";
import { CartItem } from "../models/cart/cart-item";

export class CartService {

  public async getCart() {
    const response = await api.get(`/carts`);
    const cart: Cart = response.data;
    return cart;
  }

  public async addItem (product : Product){
    const payload : CartItem = {
      product_id : product.id,
      quantity : 1
    } ; 
    const response = await api.post('/carts/items', payload) ;
    return response.data ;
  }

  public async updateCart(cart: Cart) {
    const response = await api.put(`/carts`, cart);
    return response;
  }

  public async getNumberOfItems() {
    const cart = await this.getCart();
    return cart.cart_items.length;
  }
}