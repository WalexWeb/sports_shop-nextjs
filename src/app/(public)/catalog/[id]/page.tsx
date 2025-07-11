"use client";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { m, AnimatePresence } from "framer-motion";
import { product } from "@/shared/data/MockData"; 

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState("BLACK");

  const currentColor = product.colors.find((c) => c.name === selectedColor);

  return (
    <div className="flex flex-col w-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {" "}
        {/* Хлебные крошки */}
        <m.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-600 mb-4 flex flex-wrap items-center"
        >
          {product.categoryPath.map((item, index) => (
            <div key={index} className="flex items-center">
              <a
                href={item.link}
                className="hover:text-orange-500 transition-colors"
              >
                {item.name}
              </a>
              {index < product.categoryPath.length - 1 && (
                <FiChevronRight className="mx-2 text-gray-400" />
              )}
            </div>
          ))}
        </m.nav>
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Блок с изображением */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl shadow-md relative overflow-hidden">
              {product.isHit && (
                <m.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-bold z-10"
                >
                  ХИТ
                </m.div>
              )}
              <div className="relative h-96">
                <AnimatePresence mode="wait">
                  <m.img
                    key={currentColor?.image}
                    src={currentColor?.image}
                    alt={product.name}
                    className="w-full h-full object-contain absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Выбор цвета */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
            >
              <span className="text-md font-medium">Цвет:</span>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
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
          </div>

          {/* Информация о товаре */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <m.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-gray-900"
              >
                {product.name}
              </m.h1>
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-md mt-1"
              >
                Артикул: {product.article}
              </m.p>
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
                  {product.price.toLocaleString()} ₽
                </span>
              </div>
              <p className="text-green-600 text-md mt-1">В наличии: много</p>
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
                {product.sizes.map((size) => (
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
                  <p className="text-gray-700 text-md">{product.description}</p>
                )}

                {activeTab === "specs" && (
                  <ul className="space-y-1">
                    {product.specs.map((spec, i) => (
                      <m.li
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex text-md"
                      >
                        <span className="text-gray-500 w-32 flex-shrink-0">
                          {spec.split(":")[0]}:
                        </span>{" "}
                        {/* Уменьшил ширину */}
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
        {/* Похожие товары */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Другие товары коллекции
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <m.a
                key={item}
                whileHover={{ y: -3 }}
                href="#"
                className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow block"
              >
                <div className="bg-gray-100 rounded-lg h-32 mb-2"></div>
                <h4 className="font-medium text-gray-900 text-sm mb-0.5">
                  Шорты спортивные SPORTIK
                </h4>
                <div className="text-orange-500 font-bold text-sm">1 890 ₽</div>
              </m.a>
            ))}
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default ProductPage;
