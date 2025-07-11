"use client";
import { featuredProducts } from "@/shared/data/MockData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { PAGES } from "@/config/pages-class.config";

export default function Products() {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Лучшие предложения</h2>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href={PAGES.CATALOG}
            className="px-4 py-2 rounded-full font-medium hover:bg-orange-700 hover:text-white bg-gray-200 text-gray-700"
          >
            Каталог
          </Link>
        </div>
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
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={200}
                height={200}
              />
              {index % 3 === 0 && (
                <div className="absolute top-2 right-2 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">
                В наличии: {product.quantity}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">{product.price}</span>
                <m.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-orange-700 cursor-pointer text-white px-4 py-1 rounded-full text-sm hover:bg-orange-700"
                >
                  Смотреть
                </m.button>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
}
