

import { useQuery } from "@tanstack/react-query";
import type { Cart } from "./cartType";


export const useCart = () => {
  return useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/carts/1");
      const data = await res.json();
      return data 
    },
  });
};