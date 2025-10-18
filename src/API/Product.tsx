import { Product, RawProduct, toProduct } from "@/DataTypes/product";
import { api } from "./Api";


type GetProductsParams = {
  page?:number;
  category?:string;
  productCount?:number; // to keep the track of the total product need to show over on single page
  type?:string;
};
export async function getProducts({page=0,category="gemstone",type="all", productCount=40}:GetProductsParams):Promise<Product[]>{

  try {
    // console.log("Fetching products with params:", {page, category, type, productCount});
    const { data } = await api.get<RawProduct[]>(`/api/products/products`,{
      params:{
        page,
        category,
        type,
        productCount
      }
    });
    if(!data.isOkay){
      throw new Error("Failed to fetch products");
    }
    // const products:RawProduct[]= data.products;
    // console.log(data.data);
    return data.data.map(toProduct);
  } catch (error) {
    throw new Error("Failed to fetch products" + error);
  }
}

export async function getProductById(id: string):Promise<Product> {
  try{ 
    console.log("Fetching product with ID:", id);
    const {data} = await api.get<RawProduct>(`/api/products/products/${id}`);
    if(!data.isOkay){
      throw new Error("Failed to fetch product by ID");
    }
    // console.log(data.data);
    return toProduct(data.data);
  } 
  catch (error) {
    throw new Error("Failed to fetch product by ID" + error);
  } 
}

export async function getAllCategories(){
  // Need to be implemented
};

export async function getLatestProducts({category="",type="",count=10}) {
  try {
    const {data} = await api("/api/products/latest",
      {
        params:{
        category,
        type,
        count
      }
    }
    );
    if(!data.success){
      throw new Error(data.error);
    }
    // console.log(data.data)
    return data.data.map(toProduct);

  } 
  catch (error) {
    throw new Error(error)
  }
}


export async function getDiscountedProducts({category="",type="",count=10, discount=10}){
  try {
    const {data} = await api("/api/products/discounted",{
      params:{
        category,
        type,
        count,
        discount
      }
    })
    if(!data.success){
      throw new Error(data.error||"Unable to load discounted products")
    }
    // console.log(data.data)
    return data.data.map(toProduct);
  } 
  catch (error) {
    throw new Error(error)
  }
}


