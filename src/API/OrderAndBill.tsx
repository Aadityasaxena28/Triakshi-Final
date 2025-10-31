<<<<<<< HEAD
=======
import { CheckoutItem } from "@/DataTypes/Checkout";
>>>>>>> a435d6096a0c60d88f4b37b3772addf1fbfb4875
import { api } from "./Api";

export async function getOrderByUser(phone:string){
  try {
    const response = await api.get('/api/payment/get-user-bills',{
      params: { phone }
    });
    if(!response.data.success){
      throw new Error('Failed to fetch orders');
    }

    return response.data.bills;
  } 
  catch (error) {
    throw new Error(error);

  }
<<<<<<< HEAD
}
=======
}


export async function getBill(id: string) {
  try {
    const { data } = await api.get(`/api/payment/get-bill/${id}`);
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.bill;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch bill with the given id";
    throw new Error(message);
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
>>>>>>> a435d6096a0c60d88f4b37b3772addf1fbfb4875
