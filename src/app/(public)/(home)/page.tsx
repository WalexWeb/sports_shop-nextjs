"use client";
import Slider from "@/app/components/Sections/Slider";
import Categories from "@/app/components/Sections/Categories";
import Products from "@/app/components/Sections/Products";
import { m } from "framer-motion";
import Link from "next/link";
import { PAGES } from "@/config/pages-class.config";

export default function Home() {
  return (
    <>
      <Slider />

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <m.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl cursor-pointer font-bold mb-6"
          >
            Спортивная форма для любых команд
          </m.h1>
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-700 text-white cursor-pointer px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-700"
          >
            <Link href={PAGES.CATALOG}>Смотреть коллекцию</Link>
          </m.button>
        </div>
      </m.div>

      <Categories />

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Оказываем полный спектр услуг
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Изготавливаем форму под каждого клиента. Современные технологии и
            индивидуальные решения.
          </p>
        </div>
      </m.div>

      <Products />

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <m.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6"
          >
            Готовы обновить свою спортивную форму?
          </m.h2>
          <m.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-700 cursor-pointer text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-700"
          >
            Связаться с нами
          </m.button>
        </div>
      </div>
    </>
  );
}
