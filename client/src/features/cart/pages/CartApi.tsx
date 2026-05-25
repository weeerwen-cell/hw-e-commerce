
// cart/cartApi.ts

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};


let mockCart: CartItem[] = [
  { id: 113, name: "Product #113", price: 3999.99, quantity: 3 },
  { id: 122, name: "Product #122", price: 299.99, quantity: 3 },
  { id: 138, name: "Product #138", price: 8.99, quantity: 2 },
  { id: 162, name: "Product #162", price: 8.99, quantity: 2 },
];

// GET CART
export const fetchCart = async (): Promise<CartItem[]> => {
  return mockCart;
};

// REMOVE ITEM
export const removeCartItem = async (id: number): Promise<CartItem[]> => {
  mockCart = mockCart.filter(item => item.id !== id);
  return mockCart;
};

// CLEAR CART
export const clearCart = async (): Promise<CartItem[]> => {
  mockCart = [];
  return mockCart;
};
