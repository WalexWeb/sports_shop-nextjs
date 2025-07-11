import { PAGES } from "@/config/pages-class.config";
import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-neutral-600 mb-6">Страница не найдена</p>
      <Link href={PAGES.HOME} className="text-sm text-blue-500 hover:underline">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFound;
