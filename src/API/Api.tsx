import axios from "axios";
const BaseUrl:string =  import.meta.env.VITE_api_url;

export const api = axios.create({
  baseURL: BaseUrl,
  timeout: 10_000,
  // withCredentials: false, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tg_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});