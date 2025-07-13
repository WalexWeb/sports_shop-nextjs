"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import Link from "next/link";
import { useCatalogData } from "../hooks/useCatalogData";

export default function Categories() {
  // Получаем данные категорий
  const { data: categories = [], isLoading, isError } = useCatalogData();

  // Получаем все категории первого уровня
  const getMainCategories = () => {
    return categories.filter((cat) => cat.parent_id === null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Категории</h2>
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
    </div>
  );
}
