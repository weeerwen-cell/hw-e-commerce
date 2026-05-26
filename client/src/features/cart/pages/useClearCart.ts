// cart/useClearCart.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => true,
    onSuccess: () => {
      queryClient.setQueryData(["cart"], []);
    },
  });
};