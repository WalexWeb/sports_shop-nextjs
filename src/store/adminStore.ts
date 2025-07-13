import { ICategory } from '@/shared/types/ICategory.type';
import { IProduct } from '@/shared/types/IProduct.type';
import { atomWithStorage } from 'jotai/utils';

export const categoriesAtom = atomWithStorage<ICategory[]>('adminCategories', []);
export const productsAtom = atomWithStorage<IProduct[]>('adminProducts', []);