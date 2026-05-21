import { useQuery } from "@tanstack/react-query"
import { fetchProducts, fetchProduct } from "./api"
import { id } from "zod/locales"


export const useProducts = ()=>{

    return useQuery({
        queryKey:["products"],
        queryFn: fetchProducts
    })

}


export const useProduct =(id:number)=>{

    return useQuery({
        queryKey:["products", id],
        queryFn: ()=> fetchProduct(id),
        enabled: !!id
    })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchProducts,
    select: (data) =>
      Array.from(new Set(data.products.map((p) => p.category))),
  });
};
