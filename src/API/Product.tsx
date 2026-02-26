import { Product, RawProduct, toProduct } from "@/DataTypes/product";
import { api } from "./Api";


type GetProductsParams = {
  page?:number;
  category?:string;
  productCount?:number; // to keep the track of the total product need to show over on single page
  type?:string;
  min_price?:number;
  max_price?:number;
};
export async function getProducts({page=1,category="all",type="all", productCount=40,min_price=0,max_price=0}:GetProductsParams):Promise<Product[]>{

  try {
    // console.log("Fetching products with params:", {page, category, type, productCount});
    const { data } = await api.get<RawProduct[]>(`/api/products/products`,{
      params:{
        page,
        category,
        type,
        productCount,
        min_price,
        max_price
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
    // console.log("Fetching product with ID:", id);
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


export const search = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/api/products/productsearch`, {
      params: { query }
    });

    // console.log(response.data);
    // Extract the results array from the response
    if (response.data.success && Array.isArray(response.data.results)) {
      return response.data.results;
    }

    // If the response format is unexpected, return empty array
    // console.warn('Unexpected API response format:', response.data);
    return [];
  } catch (error: any) {
    // Better error handling
    if (error.code === 'ECONNABORTED') {
      throw new Error('Search request timed out. Please try again.');
    }
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Server error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
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


