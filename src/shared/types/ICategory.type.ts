import { IProduct } from "./IProduct.type";

export interface ICategory {
  name: string;
  description: string;
  is_active: boolean;
  parent_id: number | null;
  id: number;
  created_at: string;
  updated_at: string | null;
  products: IProduct[];
  subcategories: ICategory[];
  image_url: string | null;
}
