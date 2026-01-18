import { api } from "./Api";

export async function getProductReviews(id:string) {
  const query = new URLSearchParams();
  query.append("product_id",id);
  const resp = await api.get(`/api/reviews/?${query.toString()}`);
  const payload = resp.data;
  // if(!payload.success){
  //   return Promise.reject(payload.message);
  // }
  // console.log(payload);
  return payload.data;
}