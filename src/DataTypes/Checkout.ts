import { CartItemInfo } from './CartData';
export interface CheckoutItem {
  productId: string;
  name: string;
  qty: number;
  image?: string;
  images?:string[];
  unitPrice: number; 
  discount: number;  // %
  type?: string;     
}

export interface CheckoutDraft {
  items: CheckoutItem[];
  createdAt: number; 
  sessionId?: string; 
  expiresAt?: number; 
}

export function toCheckoutItem(params:CartItemInfo){
  return{
    name:params.name,
    qty:params.qty,
    image:params.image,
    unitPrice:params.unitPrice,
    discount:params.discount,
  }
}
