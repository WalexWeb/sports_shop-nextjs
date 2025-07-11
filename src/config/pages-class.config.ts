export const PAGES = {
  HOME: "/",
  CATALOG: "/catalog",
  PRODUCT(id: number) {
    return `/catalog/${id}`;
  },
};
