import { ENDPOINTS } from "@/config/api.config";
import { IProduct } from "@/shared/types/IProduct.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async (id: number): Promise<IProduct> => {
  const response = await axios.get<IProduct>(
    `${ENDPOINTS.products.get}/${id}`
  );
  return response.data;
};

export function useProductData(id: number) {
  return useQuery<IProduct>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });
}
