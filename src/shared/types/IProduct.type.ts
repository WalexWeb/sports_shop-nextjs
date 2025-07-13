interface ISize {
  size: string;
  chest: string;
  waist: string;
  hips: string;
}

export interface IProduct {
  id: number;
  name: string;
  quantity: string;
  price: string;
  image: string[];
  category: string;
  description: string;
  size: ISize[];
  color: string;
  brand: string;
  material: string;
}
