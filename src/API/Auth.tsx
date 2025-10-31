import { LoginData, SignupData } from "@/DataTypes/Auth";
import { api } from "./Api";

export async function Signup(params: SignupData) {
  try {
    const response = await api.post("/api/users/signup", params);

    // Handle backend response
    if (response.data && response.data.success) {
      return response.data; // Return the API response for further handling
    } else {
      // Backend returned success: false
      throw response.data?.error || response.data?.message || "Signup failed";
    }
  } catch (error: any) {
    console.error("Signup API error:", error);
    
    // If it's an axios error with response data
    if (error.response?.data) {
      throw error.response.data.error || error.response.data.message || "Signup failed";
    }
    
    // If we already threw a string message
    if (typeof error === 'string') {
      throw error;
    }
    
    // Generic error
    throw error.message || "Signup failed";
  }
}

export async function Login(params: LoginData) {
  try {
    const response = await api.post("/api/users/signin", params);
    // console.log("Login response:", response.data);
    
    if (response.data && response.data.success) {
      return response.data; // Return the API response for further handling
    } else {
      // Backend returned success: false
      throw response.data?.error || response.data?.message || "Login failed";
    }
  } catch (error: any) {
    console.error("Login API error:", error);
    
    // If it's an axios error with response data
    if (error.response?.data) {
      throw error.response.data.error || error.response.data.message || "Login failed";
    }
    
    // If we already threw a string message
    if (typeof error === 'string') {
      throw error;
    }
    
    // Generic error
    throw error.message || "Login failed";
  }
}


export async function TokenValidation(token:string) {
  try {
    const {data} = await api.get("/api/users/validate")
    return data;
  } 
  catch (error) {
    throw new Error("Something went wrong while validating token")
  }
}