export interface IProductVariant {
  size: string | null;
  color: string;
  sku: string;
  price_adjustment: number;
  quantity: number;
  id: number;
  product_id: number;
  created_at: string;
  updated_at: string | null;
}
