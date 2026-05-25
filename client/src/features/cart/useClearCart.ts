// cart/useClearCart.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "./pages/CartApi";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};