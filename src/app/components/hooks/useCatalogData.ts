import { ENDPOINTS } from "@/config/api.config";
import { ICategory } from "@/shared/types/ICategory.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await axios.get<ICategory[]>(ENDPOINTS.catalog.categories);
  return response.data;
};

export function useCatalogData() {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
