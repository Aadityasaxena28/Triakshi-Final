import { CartItem } from "@/DataTypes/CartData";
import { CheckoutItem } from "@/DataTypes/Checkout";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import { api } from "./Api";

export async function addToCart(params:CartItem) {
  try {
    // console.log(params)
    const {data} = await api.post<any>(`/api/cart/add`,{
      ...params
    });
    if(!data.success){
      throw new Error("Failed To Add Product To The Cart");
    }
    // console.log(data.success)
    return data.success;
  } catch (error) {
   throw new Error(error||"Failed To Add Product");
  }
}

export async function  getCartItems(){
  try {
    const {data} = await api.get<any>("/api/cart/cart-products");
    if(!data.success){
      throw new Error(data.error||"Failed To Fetch Cart Products");
    }
    console.log(data);
    return data
  } 
  catch (error) {
    throw new Error(error||"Failed To Fetch Cart Products")
  }
}


export async function updateCartItems(items: CartItem[]) {
  try {
    console.log(items)
    const { data } = await api.post("/api/cart/update", { items });
    if (!data?.success) {
      throw new Error(data?.error || "Failed to update cart");
    }
    toastSuccess(data.message);
    return 
  } catch (err: any) {
    toastError(err?.message || "Failed to update cart");
  }
}
export type Bill = {
  contact: {
    mobileNumber: string;
    email: string;
    receiveUpdates: boolean;
  };
  address: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  order: {
    items: CheckoutItem[];
    subTotal: number;
    discountTotal: number;
    shipping: number;
    tax: number;
    grandTotal: number;
  };
  meta: {
    source: "cart" | "buy-now";  
  };
};

export async function createBill(params: Bill) {
  try {
    const { data } = await api.post(`/api/payment/create-bill`, {
      bill: params
    });
    
    if (!data.success) {
      throw new Error(data.error || "Failed to create bill");
    }
    
    return data;
  } catch (error) {
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create bill");
  }
}