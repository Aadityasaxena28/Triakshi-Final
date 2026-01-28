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
  const res = await axios.get<RelatedProductsResponse>(
    `${BASE_URL}/api/products/products/${productId}/related`,
    {
      params: { rangePercent, page, productCount },
    }
  );
  console.log(res.data.data);
  return res.data.data;
}
