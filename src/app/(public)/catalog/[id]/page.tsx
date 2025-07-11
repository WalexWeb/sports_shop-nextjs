"use client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  featuredProducts,
  extendedProducts,
  product as staticProduct,
} from "@/shared/data/MockData";

// Собираем все товары в один массив
const allProducts = [
  ...featuredProducts,
  ...extendedProducts.football,
  ...extendedProducts.basketball,
  ...extendedProducts.volleyball,
  ...extendedProducts.equipment,
  ...extendedProducts.kits,
];

const ProductPage = () => {
  const params = useParams();
  const id = Number(params.id);

  // Находим товар по id
  const currentProduct = useMemo(
    () => allProducts.find((p) => p.id === id),
    [id]
  );

  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState(
    staticProduct.colors[0].name
  );

  const currentColor = staticProduct.colors.find(
    (c) => c.name === selectedColor
  );

  return (
    <div className="flex flex-col w-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Название и хлебные крошки */}
        <m.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold mb-4"
        >
          {currentProduct.name}
        </m.h1>
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Блок с изображением */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl shadow-md relative overflow-hidden">
              <div className="relative h-96">
                <AnimatePresence mode="wait">
                  <m.img
                    key={currentColor?.image || currentProduct.image}
                    src={currentColor?.image || currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-full object-contain absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>
            </div>
            {/* Выбор цвета (если есть) */}
            {staticProduct.colors && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-md font-medium">Цвет:</span>
                <div className="flex space-x-2">
                  {staticProduct.colors.map((color) => (
                    <m.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === color.name
                          ? "border-orange-500 scale-110"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <m.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </m.svg>
                      )}
                    </m.button>
                  ))}
                </div>
              </m.div>
            )}
          </div>

          {/* Информация о товаре */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <m.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900"
              >
                {currentProduct.name}
              </m.h2>
            </div>
            {/* Цена */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex items-end space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {currentProduct.price}
                </span>
              </div>
              <p className="text-green-600 text-md mt-1">
                В наличии: {currentProduct.quantity}
              </p>
            </m.div>
            {/* Размеры */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-md font-medium text-gray-900 mb-1">
                Размер: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {staticProduct.sizes.map((size) => (
                  <m.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border rounded-md text-center text-md font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {size}
                  </m.button>
                ))}
              </div>
            </m.div>
            {/* Описание и характеристики */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <div className="border-b border-gray-200">
                <nav className="flex space-x-3">
                  <m.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab("description")}
                    className={`pb-1 font-medium text-md border-b-2 ${
                      activeTab === "description"
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Описание
                  </m.button>
                  <m.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab("specs")}
                    className={`pb-1 font-medium text-md border-b-2 ${
                      activeTab === "specs"
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Характеристики
                  </m.button>
                </nav>
              </div>
              <m.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="py-3"
              >
                {activeTab === "description" && (
                  <p className="text-gray-700 text-md">
                    {staticProduct.description}
                  </p>
                )}
                {activeTab === "specs" && (
                  <ul className="space-y-1">
                    {staticProduct.specs.map((spec, i) => (
                      <m.li
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex text-md"
                      >
                        <span className="text-gray-500 w-32 flex-shrink-0">
                          {spec.split(":")[0]}:
                        </span>
                        <span className="text-gray-900">
                          {spec.split(":")[1]}
                        </span>
                      </m.li>
                    ))}
                  </ul>
                )}
              </m.div>
            </m.div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
