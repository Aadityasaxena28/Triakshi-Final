export interface Review {
  _id: string;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
  verified:boolean;
  //optional fields
  product_id?:string;
  user_id?:string;
}