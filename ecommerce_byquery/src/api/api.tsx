 

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

 
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: number;
}

const API_URL = "https://fakestoreapi.com/products";

 
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

 
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  if (category && category !== "All") {
    const response = await axios.get<Product[]>(`${API_URL}/category/${category}`);
    return response.data;
  }
  return fetchProducts();
};

 
export const addProduct = async (newProduct: Omit<Product, "id">): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, newProduct);
  return response.data;
};

 
export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  const response = await axios.put<Product>(
    `${API_URL}/${updatedProduct.id}`,
    updatedProduct
  );
  return response.data;
};

 
export const deleteProduct = async (productId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${productId}`);
};

 
export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, Product>({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });


}