import { api } from "./Api";

export type CalculatorParams = {
  type: string;
  dob:string;
  tob:string;
  place:string;
};

export async function Calculator(params:CalculatorParams) {
  try {
    const {data} = await api.get<any>(`/api/calculator/calculate`,{
      params
    });
    if(!data.success){
      throw new Error(data.error||"Calculation failed");
    }
    return data.result;
  } 
  catch (error) {
    throw new Error("Calculation failed" + error);
  }
}