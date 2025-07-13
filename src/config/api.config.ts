export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
  catalog: {
    categories: `${API_URL}/catalog/categories/hierarchy`,
    products: `${API_URL}/catalog/products`,
  },
};
