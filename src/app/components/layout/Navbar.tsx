"use client";
import { FaInstagram, FaTelegram, FaVk, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiSearch } from "react-icons/fi";
import { m } from "framer-motion";
import Link from "next/link";
import { PAGES } from "@/config/pages-class.config";

function Navbar() {
  return (
    <div className="sticky top-0 z-100 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 border-b">
          <div className="flex items-center space-x-6 mb-3 md:mb-0">
            <div className="flex items-center text-blue-600">
              <FiPhone className="mr-2" />
              <span className="text-xl">+7 (123) 456-78-90</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <a
              href="#"
              className="p-2 text-blue-600 hover:text-orange-700 transition-colors"
              aria-label="Telegram"
            >
              <FaTelegram size={25} />
            </a>
            <a
              href="#"
              className="p-2 text-blue-600 hover:text-orange-700 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={25} />
            </a>
            <a
              href="#"
              className="p-2 text-blue-600 hover:text-orange-700 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={25} />
            </a>
            <a
              href="#"
              className="p-2 text-blue-600 hover:text-orange-700 transition-colors"
              aria-label="VKontakte"
            >
              <FaVk size={25} />
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col md:flex-row justify-between items-center py-4">
          <m.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-blue-600 mb-4 md:mb-0"
          >
            <Link href={PAGES.HOME}>Спортивный сектор</Link>
          </m.h1>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link
              href={PAGES.HOME}
              className="text-gray-700 hover:text-orange-700 font-medium"
            >
              Главная
            </Link>
            <Link
              href={PAGES.CATALOG}
              className="text-gray-700 hover:text-orange-700 font-medium"
            >
              Каталог
            </Link>
            <a
              href="#footer"
              className="text-gray-700 hover:text-orange-700 font-medium"
            >
              Контакты
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
