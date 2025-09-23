export interface User {
  id: number;

  fullname: string;         
  phone_number: string;     
  email: string;
  address: string;

  date_of_birth: string;    
  gender: string;
  avatar: string;

  card_id: number;           
  role_name: string;        

  // Seller-specific
  shop_name?: string;
  shop_description?: string;
  shop_logo?: string;
  business_license?: string;
  tax_code?: string;
  seller_rating?: number;
  total_sales?: number;
  is_verified?: boolean;
}
