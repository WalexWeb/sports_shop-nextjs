// Mock data
export const categories = [
  { id: 1, name: "Готовые наборы", image: "/sport-kit.jpg" },
  { id: 2, name: "Футбол", image: "/football.jpg" },
  { id: 3, name: "Баскетбол", image: "/basketball.jpg" },
  { id: 4, name: "Волейбол", image: "/volleyball.jpg" },
  { id: 5, name: "Экипировка", image: "/equipment.jpg" },
];

export const featuredProducts = [
  {
    id: 1,
    name: "Футбольная форма",
    quantity: "10+",
    price: "4 999 ₽",
    image: "/football.jpg",
  },
  {
    id: 2,
    name: "Баскетбольные шорты",
    quantity: "15+",
    price: "2 499 ₽",
    image: "/football.jpg",
  },
  {
    id: 3,
    name: "Волейбольные кроссовки",
    quantity: "8+",
    price: "6 799 ₽",
    image: "/football.jpg",
  },
  {
    id: 4,
    name: "Тренировочный набор",
    quantity: "5+",
    price: "8 999 ₽",
    image: "/football.jpg",
  },
  {
    id: 5,
    name: "Спортивная сумка",
    quantity: "20+",
    price: "3 299 ₽",
    image: "/football.jpg",
  },
];

export const extendedProducts = {
  football: [
    {
      id: 101,
      name: "Футбольный мяч PRO",
      price: "3 499 ₽",
      quantity: "15+",
      image: "/football.jpg",
    },
    {
      id: 102,
      name: "Бутсы с шипами",
      price: "5 999 ₽",
      quantity: "8+",
      image: "/football.jpg",
    },
    {
      id: 103,
      name: "Гетры игровые",
      price: "899 ₽",
      quantity: "25+",
      image: "/football.jpg",
    },
    {
      id: 104,
      name: "Щитки защитные",
      price: "1 299 ₽",
      quantity: "12+",
      image: "/football.jpg",
    },
  ],
  basketball: [
    {
      id: 201,
      name: "Баскетбольный мяч",
      price: "2 999 ₽",
      quantity: "10+",
      image: "/basketball.jpg",
    },
    {
      id: 202,
      name: "Кроссовки для баскетбола",
      price: "7 499 ₽",
      quantity: "6+",
      image: "/basketball.jpg",
    },
    {
      id: 203,
      name: "Наколенники",
      price: "1 599 ₽",
      quantity: "18+",
      image: "/basketball.jpg",
    },
    {
      id: 204,
      name: "Компрессионные шорты",
      price: "2 199 ₽",
      quantity: "14+",
      image: "/basketball.jpg",
    },
  ],
  volleyball: [
    {
      id: 301,
      name: "Волейбольный мяч",
      price: "2 799 ₽",
      quantity: "9+",
      image: "/volleyball.jpg",
    },
    {
      id: 302,
      name: "Наколенники волейбольные",
      price: "1 899 ₽",
      quantity: "20+",
      image: "/volleyball.jpg",
    },
    {
      id: 303,
      name: "Форма для пляжного волейбола",
      price: "3 599 ₽",
      quantity: "7+",
      image: "/volleyball.jpg",
    },
    {
      id: 304,
      name: "Сумка для инвентаря",
      price: "1 999 ₽",
      quantity: "12+",
      image: "/volleyball.jpg",
    },
  ],
  equipment: [
    {
      id: 401,
      name: "Спортивная сумка",
      price: "2 499 ₽",
      quantity: "15+",
      image: "/football.jpg",
    },
    {
      id: 402,
      name: "Бутылка для воды",
      price: "799 ₽",
      quantity: "30+",
      image: "/football.jpg",
    },
  ],
  kits: [
    {
      id: 501,
      name: "Набор для футбола",
      price: "8 999 ₽",
      quantity: "4+",
      image: "/football.jpg",
    },
    {
      id: 502,
      name: "Набор для баскетбола",
      price: "9 499 ₽",
      quantity: "3+",
      image: "/basketball.jpg",
    },
    {
      id: 503,
      name: "Набор для волейбола",
      price: "7 899 ₽",
      quantity: "5+",
      image: "/volleyball.jpg",
    },
  ],
};

export const sliderImages = [
  "/slider1.jpg",
  "/slider2.jpg",
  "/slider3.jpg",
  "/slider4.jpg",
];

export const product = {
  name: "Футболка спортивная NIGGER RIGEL HERO SHIRT",
  article: "SPT-2023-001",
  price: 2270,
  description:
    "Профессиональная футболка для тренировок и соревнований. Технологичная ткань с влагоотведением обеспечивает комфорт при интенсивных нагрузках.",
  specs: [
    "Состав: 92% полиэстер, 8% спандекс",
    "Технология: Dry-Fit (быстрое испарение влаги)",
    "Вес: 180 г/м²",
    "Страна производства: Россия",
    "Бренд: SPORTIK",
    "Коллекция: RIGEL 2023",
    "Пол: Мужской",
    "Сезон: Круглогодичный",
  ],
  colors: [
    { name: "BLACK", image: "/slider2.jpg", hex: "#000000" },
    { name: "WHITE", image: "/slider5.jpg", hex: "#FFFFFF" },
    { name: "RED", image: "/slider3.jpg", hex: "#E53935" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  isHit: true,
  categoryPath: [
    { name: "Главная", link: "/" },
    { name: "Каталог", link: "/catalog" },
    { name: "ИГРОВАЯ ЭКИПИРОВКА", link: "/catalog/equipment" },
    { name: "ФУТБОЛ", link: "/catalog/football" },
    { name: "Мужская игровая форма", link: "/catalog/football/men" },
  ],
};
