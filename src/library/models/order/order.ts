// src/library/models/order/order.ts
import { OrderDetail } from "./order-detail";
import { ShippingAddress } from "./shipping-address";

export interface Order {
    // Basic order information
    id?: number;
    user_id?: number;
    order_number?: string; // Unique order identifier for display
    
    // Financial information
    subtotal?: number; // Sum of items before shipping, discounts, etc.
    shipping_fee?: number;
    discount?: number;
    total_price: number; // Called totalAmount in Java
    final_amount?: number; // Total after all adjustments
    
    // Order status and dates
    status?: number; // 0: Pending, 1: Confirmed, 2: Shipping, 3: Delivered, 4: Cancelled
    order_date?: string; // createdAt in Java
    delivered_date?: string; // For tracking delivery completion
    
    // Shipping information
    shipping_address?: string; // Simple string version of the address
    shipping_address_details?: ShippingAddress; // Structured address with components
    shipping_method?: string;
    tracking_number?: string | null;
    
    // Customer information
    customer_name: string;
    phone_number: string;
    email?: string | null;
    
    // Payment information
    payment_method?: string;
    payment_status?: number; // 0: Pending, 1: Completed, 2: Failed, 3: Refunded
    
    // Additional information
    notes?: string | null;
    coupon_code?: string | null;
    
    // Order items
    order_details?: OrderDetail[];
    order_detail_ids?: number[];
    
    // For frontend display
    items?: {
        id: number;
        productName: string;
        productImage: string;
        price: number;
        quantity: number;
    }[];
}