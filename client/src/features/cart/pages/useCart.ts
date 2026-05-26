
// import { useQuery } from "@tanstack/react-query";
// import type { Cart, CartResponse } from "./cartType";

// export const useCart = () => {
//   return useQuery<Cart[]>({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await fetch("https://dummyjson.com/carts/user/1");
//       const data: CartResponse = await res.json();
//       return data.carts; 
//     },
//   });
// };

import { useQuery } from "@tanstack/react-query";
import type { CartResponse, Cart } from "./cartType";

export const useCart = () => {
  return useQuery<Cart[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/carts/user/5");
      const data: CartResponse = await res.json();

      return data.carts; // ⭐ 关键：只返回 carts array
    },
  });
};