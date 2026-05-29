
import type { Cart  } from "./cartType";

export const removeCartItemApi = async (
  cartId: number,
  productId: number
): Promise<Cart> => {
  const res = await fetch(`https://dummyjson.com/carts/${cartId}`);
  const data: Cart = await res.json();

  const updated: Cart = {
    ...data,
    products: data.products.filter((p) => p.id !== productId),
  };

  return updated;
};


