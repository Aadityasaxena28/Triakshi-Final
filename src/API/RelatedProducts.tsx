import { api } from "./Api";
import type { Product } from "@/DataTypes/product";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getRelatedProducts(
  productId: string,
  rangePercent: number = 0.2,
  page: number = 1,
  productCount: number = 8
): Promise<Product[]> {

  console.log("FRONTEND PARAMS:", productId, page, rangePercent, productCount);

  const query = new URLSearchParams({
    rangePercent: String(rangePercent),
    page: String(page),
    productCount: String(productCount),
  });

  const url = `${BASE_URL}/api/products/products/${productId}/related?${query.toString()}`;

  console.log("CALLING URL:", url);

  const res = await api.get(url);

  // Axios interceptor may already return the JSON
  const payload = res?.data ?? res;

  console.log("RELATED PRODUCTS PAYLOAD:", payload);

  return payload?.data ?? [];
}
