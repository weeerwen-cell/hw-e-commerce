
import type { Cart, CartResponse } from "./cartType";

export const removeCartItemApi = async (
  cartId: number,
  productId: number
): Promise<Cart[]> => {
  const res = await fetch("https://dummyjson.com/carts/user/1");

  const data: CartResponse = await res.json();

  const updated = data.carts.map((cart) => {
    if (cart.id !== cartId) return cart;

    return {
      ...cart,
      products: cart.products.filter((p) => p.id !== productId),
    };
  });

  return updated;
};