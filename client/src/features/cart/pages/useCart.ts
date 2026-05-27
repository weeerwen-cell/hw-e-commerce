
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

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/carts/1");
      const data = await res.json();
      return data 
    },
  });
};