import { ICategory } from "./ICategory.type";
import { IProductImage } from "./IProductImage.type";
import { IProductVariant } from "./IProductVariant.type";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category_id: number;
  is_active: boolean;
  id: number;
  created_at: string;
  updated_at: string | null;
  images: IProductImage[];
  variants: IProductVariant[];
  category: ICategory;
}
