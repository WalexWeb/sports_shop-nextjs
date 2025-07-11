import { categories } from "@/shared/data/MockData";
import { FaInstagram, FaTelegram, FaVk, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer" className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Спортивный сектор</h3>
            <p className="text-blue-200">
              Лучшая спортивная форма для команд любого уровня
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Категории</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <a href="#" className="text-blue-200 hover:text-white">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <div className="space-y-2 text-blue-200">
              <p>г. , ул. , д. </p>
              <p>+7 (123) 456-78-90</p>
              <p>info@email.ru</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Мы в соцсетях</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram size={20} />
              </a>
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="VKontakte"
              >
                <FaVk size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
          <p>© 2025 Спортивный сектор. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
