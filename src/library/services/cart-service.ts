import api from "@/configs/axios-config";
import { CartItem } from "../models/cart/cart-item";
import { Cart } from "../models/cart/cart";

export class CartService {

  public async getCart() {
    const response = await api.get(`/carts`);
    return response.data;
  }

  public async updateCart(cart: Cart) {
    api.put(`/carts`, cart);
  }

  public async addToCart(cartItem : CartItem) {

  }

  public async updateCartItem(userId: string, productId: string, quantity: number) {

  }

  public async removeFromCart(userId: string, productId: string) {

  }

  public async clearCart(userId: string) {

  }
}