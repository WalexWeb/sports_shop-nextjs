"use client";
import { PAGES } from "@/config/pages-class.config";
import { useDebounce } from "@/app/components/hooks/useDebounce";
import { m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import type { ICategory } from "@/shared/types/ICategory.type";
import { IProduct } from "@/shared/types/IProduct.type";
import { useCatalogData } from "@/app/components/hooks/useCatalogData";

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 400);

  // Получаем данные категорий
  const { data: categories = [], isLoading, isError } = useCatalogData();

  // Получаем все продукты из всех категорий и подкатегорий
  const getAllProducts = (categories: ICategory[]): IProduct[] => {
    return categories.reduce<IProduct[]>((acc, category) => {
      const subProducts = category.subcategories
        ? getAllProducts(category.subcategories)
        : [];
      return [...acc, ...category.products, ...subProducts];
    }, []);
  };

  // Получаем все категории первого уровня
  const getMainCategories = () => {
    return categories.filter((cat) => cat.parent_id === null);
  };

  // Фильтрация продуктов по поисковому запросу
  const filteredProducts = debounceSearch
    ? getAllProducts(categories).filter((product) =>
        product.name.toLowerCase().includes(debounceSearch.toLowerCase())
      )
    : [];

  // Показывать ли обычные категории (скрываем при поиске)
  const shouldShowCategories = !debounceSearch;

  // Рендер продукта
  const renderProduct = (product: IProduct, index: number) => (
    <m.div
      key={product.id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <div className="h-48 bg-gray-200 relative">
        {product.images?.length > 0 && (
          <img
            src={
              product.images.find((img) => img.is_primary)?.image_url ||
              product.images[0].image_url
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
        {index % 3 === 0 && (
          <div className="absolute top-2 right-2 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded">
            {index % 2 === 0 ? "NEW" : "SALE"}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <Link href={PAGES.PRODUCT(product.id)} passHref>
            <m.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-orange-700 cursor-pointer text-white px-4 py-1 rounded-full text-sm hover:bg-orange-700 inline-block"
            >
              Смотреть
            </m.a>
          </Link>
        </div>
      </div>
    </m.div>
  );

  // Рендер категории с подкатегориями
  const renderCategoryWithSubcategories = (category: ICategory) => (
    <section
      key={category.id}
      id={`category-${category.id}`}
      className="mb-16 pt-8"
    >
      <m.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 flex items-center"
      >
        {category.name}
      </m.h2>

      {category.description && (
        <p className="text-gray-600 mb-6">{category.description}</p>
      )}

      {/* Продукты основной категории */}
      {category.products?.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.products.map((product, index) =>
              renderProduct(product, index)
            )}
          </div>
        </>
      )}

      {/* Подкатегории с их продуктами */}
      {category.subcategories &&
        category.subcategories.map((subcategory) => (
          <section
            key={subcategory.id}
            id={`subcategory-${subcategory.id}`}
            className="mt-12"
          >
            <m.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold mb-4 flex items-center"
            >
              {subcategory.name}
            </m.h3>

            {subcategory.description && (
              <p className="text-gray-600 mb-4">{subcategory.description}</p>
            )}

            {subcategory.products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subcategory.products.map((product, index) =>
                  renderProduct(product, index)
                )}
              </div>
            ) : (
              <p className="text-gray-500">No products in this subcategory</p>
            )}
          </section>
        ))}
    </section>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">
          Failed to load categories. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-screen mx-auto px-4 py-8">
        <div className="relative w-full md:w-64 mb-8">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-700"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Результаты поиска */}
        {debounceSearch && (
          <section id="search-results" className="mb-16">
            <m.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center mb-10"
            >
              Результаты поиска: "{debounceSearch}"
            </m.h2>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {filteredProducts.map((product, index) =>
                  renderProduct(product, index)
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No products found for "{debounceSearch}"
              </p>
            )}
          </section>
        )}

        {/* Основные категории (показываем только если не ведется поиск) */}
        {shouldShowCategories && (
          <>
            <section id="categories" className="mb-16">
              <m.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-10"
              >
                Категории
              </m.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getMainCategories().map((category, index) => (
                  <m.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-xl overflow-hidden shadow-lg bg-white"
                  >
                    <Link href={`#category-${category.id}`} passHref>
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl">📦</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-center">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-gray-600 text-sm text-center mt-2 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </m.div>
                ))}
              </div>
            </section>

            {/* Разделы по категориям */}
            {getMainCategories().map((category) =>
              renderCategoryWithSubcategories(category)
            )}
          </>
        )}
      </div>
    </div>
  );
}
