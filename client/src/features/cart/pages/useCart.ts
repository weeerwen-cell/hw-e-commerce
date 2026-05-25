// cart/useCart.ts

import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "./CartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
};