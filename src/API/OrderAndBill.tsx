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
