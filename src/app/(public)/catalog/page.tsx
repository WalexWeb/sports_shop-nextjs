"use client";
import { PAGES } from "@/config/pages-class.config";
import {
  categories,
  extendedProducts,
  featuredProducts,
} from "@/shared/data/MockData";
import { useDebounce } from "@/app/components/hooks/useDebounce";
import { m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const debounceSearch = useDebounce(searchTerm, 400);

  // Получаем товары для категории
  const getCategoryProducts = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "футбол":
        return extendedProducts.football;
      case "баскетбол":
        return extendedProducts.basketball;
      case "волейбол":
        return extendedProducts.volleyball;
      case "экипировка":
        return extendedProducts.equipment;
      case "готовые наборы":
        return extendedProducts.kits;
      default:
        return featuredProducts.slice(0, 4);
    }
  };

  const getAllProducts = () => {
    return [
      ...extendedProducts.football,
      ...extendedProducts.basketball,
      ...extendedProducts.volleyball,
      ...extendedProducts.equipment,
      ...extendedProducts.kits,
    ];
  };

  const filteredProducts = getAllProducts().filter((p) =>
    p.name.toLowerCase().includes(debounceSearch.toLowerCase())
  );

  const shouldShowCategories = !debounceSearch;

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
                {filteredProducts.map((product, index) => (
                  <m.div
                    key={`search-${product.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {index % 3 === 0 && (
                        <div className="absolute top-2 right-2 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded">
                          {index % 2 === 0 ? "NEW" : "TOP"}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 mb-2">
                        В наличии: {product.quantity}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">
                          {product.price}
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
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Товары по запросу "{debounceSearch}" не найдены
              </p>
            )}
          </section>
        )}

        {/* Категории товаров (показываем только если не ведется поиск) */}
        {shouldShowCategories && (
          <>
            <section id="categories" className="mb-16">
              <m.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-10"
              >
                Категории товаров
              </m.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {categories.map((category, index) => (
                  <m.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-xl overflow-hidden shadow-lg bg-white"
                  >
                    <a
                      href={`#${category.name.toLowerCase().replace(" ", "-")}`}
                      className="block"
                    >
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-center">
                          {category.name}
                        </h3>
                      </div>
                    </a>
                  </m.div>
                ))}
              </div>
            </section>

            {/* Лучшие предложения */}
            <section id="best-offers" className="py-16">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <m.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold"
                >
                  Лучшие предложения
                </m.h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {featuredProducts.map((product, index) => (
                  <m.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {index % 3 === 0 && (
                        <div className="absolute top-2 right-2 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded">
                          {index % 2 === 0 ? "NEW" : "TOP"}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 mb-2">
                        В наличии: {product.quantity}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">
                          {product.price}
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
                ))}
              </div>
            </section>

            {/* Разделы по категориям */}
            {categories.map((category) => (
              <section
                key={category.id}
                id={category.name.toLowerCase().replace(" ", "-")}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getCategoryProducts(category.name).map((product, index) => (
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
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {index % 3 === 0 && (
                          <div className="absolute top-2 right-2 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded">
                            {index % 2 === 0 ? "NEW" : "SALE"}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          В наличии: {product.quantity}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-600">
                            {product.price}
                          </span>
                          <Link href={PAGES.PRODUCT(product.id)} passHref>
                            <m.a
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-orange-700 cursor-pointer text-white px-4 py-1 rounded-full text-sm"
                            >
                              Смотреть
                            </m.a>
                          </Link>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
