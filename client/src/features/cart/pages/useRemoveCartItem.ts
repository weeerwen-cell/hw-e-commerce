
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Cart } from "./cartType";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartId,
      productId,
    }: {
      cartId: number;
      productId: number;
    }) => {
      return { cartId, productId };
    },

    onSuccess: ({ cartId, productId }) => {
      queryClient.setQueryData<Cart[]>(["cart"], (old) => {
        if (!old) return [];

        return old.map((cart) =>
          cart.id !== cartId
            ? cart
            : {
                ...cart,
                products: cart.products.filter(
                  (p) => p.id !== productId
                ),
              }
        );
      });
    },
  });
};