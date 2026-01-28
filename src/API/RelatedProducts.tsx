import axios from "axios";
import type { Product } from "@/DataTypes/product";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// example: https://saxena-backend.onrender.com

type RelatedProductsResponse = {
  data: Product[];
  meta: {
    totalMatches: number;
    page: number;
    productCount: number;
    rangePercent: number;
    minPrice: number;
    maxPrice: number;
  };
  isOkay: boolean;
};

export async function getRelatedProducts(
  productId: string,
  rangePercent: number = 0.2,
  page: number = 1,
  productCount: number = 8
): Promise<Product[]> {
  const res = await axios.get(
    `${BASE_URL}/api/products/products/${productId}/related`,
    {
      params: { rangePercent, page, productCount },
    }
  );

  /**
   * IMPORTANT:
   * If an axios response interceptor returns `response.data`,
   * then `res` IS ALREADY the backend JSON.
   * If no interceptor exists, `res.data` is the backend JSON.
   */

  const payload = (res)?.data ?? res;

  console.log("RELATED PRODUCTS PAYLOAD:", payload);

  return payload?.data ?? [];
}
