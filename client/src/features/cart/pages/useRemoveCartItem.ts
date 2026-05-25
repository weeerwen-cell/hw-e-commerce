// cart/useRemoveCartItem.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem } from "./CartApi";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};