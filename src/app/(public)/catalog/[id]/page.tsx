"use client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useProductData } from "@/app/components/hooks/useProductData";
import { IProductVariant } from "@/shared/types/IProductVariant.type";
import { PAGES } from "@/config/pages-class.config";

const ProductPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const { data: product, isLoading, isError } = useProductData(id);

  useMemo(() => {
    if (
      product?.variants &&
      product.variants.length > 0 &&
      selectedVariant === null
    ) {
      if (product.variants[0]?.id !== undefined) {
        setSelectedVariant(product.variants[0].id);
      }
    }
  }, [product, selectedVariant]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col w-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <m.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold mb-4"
          >
            Товар не найден
          </m.h1>
        </div>
      </div>
    );
  }

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0];

  const primaryImage =
    product.images.find((img) => img.is_primary) || product.images[0];
  const priceWithAdjustment =
    product.price + (currentVariant?.price_adjustment || 0);

  // Группируем варианты по цвету для выбора цвета
  const colorGroups = product.variants.reduce<
    Record<string, IProductVariant[]>
  >((acc, variant) => {
    if (!acc[variant.color]) {
      acc[variant.color] = [];
    }
    acc[variant.color].push(variant);
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Название */}
        <m.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold mb-4"
        >
          {product.name}
        </m.h1>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Блок с изображением */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl shadow-md relative overflow-hidden">
              <div className="relative h-96">
                <AnimatePresence mode="wait">
                  <m.img
                    key={primaryImage?.image_url}
                    src={primaryImage?.image_url}
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

            {/* Галерея изображений */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image) => (
                  <m.button
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`border rounded-lg overflow-hidden ${
                      primaryImage?.id === image.id
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt=""
                      className="w-full h-20 object-cover"
                    />
                  </m.button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Категория */}
            <div className="text-md text-gray-500">
              Категория:
              <p className="text-orange-600">{product.category.name}</p>
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
                  {priceWithAdjustment.toFixed(2)} ₽
                </span>
                {currentVariant?.price_adjustment !== 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.price.toFixed(2)} ₽
                  </span>
                )}
              </div>
              <p
                className={`text-md mt-1 ${
                  currentVariant?.quantity > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {currentVariant?.quantity > 0
                  ? `В наличии: ${currentVariant.quantity} шт.`
                  : "Нет в наличии"}
              </p>
            </m.div>

            {/* Варианты (цвета) */}
            {Object.keys(colorGroups).length > 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-md font-medium">Цвет:</span>
                <div className="flex space-x-2">
                  {Object.entries(colorGroups).map(([color, variants]) => {
                    const isSelected = variants.some(
                      (v) => v.id === selectedVariant
                    );
                    return (
                      <m.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (variants[0].id !== undefined) {
                            setSelectedVariant(variants[0].id);
                          }
                        }}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-orange-500 scale-110"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title={color}
                      >
                        {isSelected && (
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
                    );
                  })}
                </div>
              </m.div>
            )}

            {/* Размеры (если есть) */}
            {product.variants.some((v) => v.size) && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-md font-medium text-gray-900 mb-1">
                  Размер:
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from(
                    new Set(
                      product.variants
                        .filter((v) => v.size)
                        .map((v) => v.size)
                        .sort((a, b) => {
                          // Предположим, что размеры — это числа или строки вроде 'S', 'M', 'L'
                          const numA = parseFloat(a!);
                          const numB = parseFloat(b!);

                          // Если это числа — сортируем как числа
                          if (!isNaN(numA) && !isNaN(numB)) {
                            return numA - numB;
                          }

                          // Если это строки вроде S, M, L — задаём порядок вручную
                          const order: Record<string, number> = {
                            XS: 0,
                            S: 1,
                            M: 2,
                            L: 3,
                            XL: 4,
                            XXL: 5,
                            XXXL: 6,
                          };

                          return (order[a!] || 99) - (order[b!] || 99);
                        })
                    )
                  ).map((size) => (
                    <m.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const variant = product.variants.find(
                          (v) => v.size === size
                        );
                        if (variant && typeof variant.id === "number")
                          setSelectedVariant(variant.id);
                      }}
                      className={`py-2 border rounded-md text-center text-md font-medium transition-colors ${
                        currentVariant?.size === size
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {size}
                    </m.button>
                  ))}
                </div>
              </m.div>
            )}

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
                    <li className="flex text-md">
                      <span className="text-gray-500 w-32 flex-shrink-0">
                        Артикул:
                      </span>
                      <span className="text-gray-900">
                        {currentVariant?.sku}
                      </span>
                    </li>
                    <li className="flex text-md">
                      <span className="text-gray-500 w-32 flex-shrink-0">
                        Категория:
                      </span>
                      <span className="text-gray-900">
                        {product.category.name}
                      </span>
                    </li>
                    {currentVariant?.color && (
                      <li className="flex text-md">
                        <span className="text-gray-500 w-32 flex-shrink-0">
                          Цвет:
                        </span>
                        <span className="text-gray-900">
                          {currentVariant.color}
                        </span>
                      </li>
                    )}
                    {currentVariant?.size && (
                      <li className="flex text-md">
                        <span className="text-gray-500 w-32 flex-shrink-0">
                          Размер:
                        </span>
                        <span className="text-gray-900">
                          {currentVariant.size}
                        </span>
                      </li>
                    )}
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
