const BASE_URL = "https://dummyjson.com";


export const fetchProducts = async (category?: string) => {
  const url = category
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch products");

  return res.json();
};


export const fetchProduct = async (id: number) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
};


export const addCartApi = async (productId: number) => {
  const res = await fetch(`${BASE_URL}/carts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [{ id: productId, quantity: 1 }],
    }),
  });

  if (!res.ok) throw new Error("fail to add cart");

  return res.json();
};