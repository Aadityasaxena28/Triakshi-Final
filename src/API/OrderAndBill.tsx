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
  
} 
