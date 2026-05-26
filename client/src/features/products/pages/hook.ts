import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import { fetchProducts, fetchProduct } from "./api";
import type {ProductResponse} from './type'
// products with category filter
export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
    placeholderData: (previousData) => previousData,
  });
};

// single product
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

 //categories (derived from products)
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchProducts(),
   select: (data: ProductResponse) =>
      Array.from(new Set(data.products.map((p) => p.category))),
  });
};