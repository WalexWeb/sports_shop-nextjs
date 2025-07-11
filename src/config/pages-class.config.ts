class PagesConfig {
  PRODUCT(name: string) {
    return `/user/${name}`;
  }
}

export const PAGES = new PagesConfig();