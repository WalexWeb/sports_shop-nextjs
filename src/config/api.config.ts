export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
  categories: {
    get: `${API_URL}/catalog/categories/?skip=0&limit=100`,
    hierarchy: `${API_URL}/catalog/categories/hierarchy`,
    add: `${API_URL}/catalog/categories/`,
    delete: (id: number) => `${API_URL}/catalog/categories/${id}`,
  },
  products: {
    get: `${API_URL}/catalog/products`,
    add: `${API_URL}/catalog/products/`,
    delete: (id: number) => `${API_URL}/catalog/products/${id}`,
  },
  auth: {
    token: `${API_URL}/auth/token`,
    admin: `${API_URL}/auth/admin`,
  },
};
