import type { CategoryResponse, ProductResponse, Product } from "./type";

const BASE_URL = "https://dummyjson.com"

export const fetchProducts = async():Promise<ProductResponse>=>{

  const res = await fetch(`${BASE_URL}/products`);
  if(!res.ok){
    throw new Error("fail to fatch product")
  }      
  return res.json()
}

                    //tell promise resolve  is Product, type safe
export const fetchProduct = async (id: number): Promise<Product> => {

    const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};
// export const category =()=>{
//    const categories = data

// } 