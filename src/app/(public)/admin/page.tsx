"use client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiPlus,
  FiTrash2,
  FiEdit,
  FiUpload,
  FiImage,
  FiLock,
} from "react-icons/fi";
import { ICategory } from "@/shared/types/ICategory.type";
import { categoriesAtom, productsAtom } from "@/store/adminStore";
import { IProduct } from "@/shared/types/IProduct.type";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ENDPOINTS } from "@/config/api.config";
import { AuthData, TokenResponse } from "@/shared/types/IAdmin.type";

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [activeTab, setActiveTab] = useState<"categories" | "products">(
    "categories"
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Форма для авторизации
  const {
    register: registerAuth,
    handleSubmit: handleAuthSubmit,
    formState: { errors: authErrors },
  } = useForm<AuthData>();

  // Форма для категорий
  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    reset: resetCategory,
    setValue: setCategoryValue,
  } = useForm<Omit<ICategory, "id">>();

  // Форма для товаров
  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProduct,
    setValue: setProductValue,
    watch: watchProduct,
  } = useForm<Omit<IProduct, "id">>();

  // Проверка авторизации при загрузке
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      setIsAuthenticated(!!token);

      // Если есть токен, устанавливаем его в заголовки axios
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<ICategory[]>(ENDPOINTS.categories.get);
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  // Обработчик авторизации
  const onSubmitAuth = async (data: AuthData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await axios.post<TokenResponse>(
        ENDPOINTS.auth.token,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { access_token } = response.data;

      // Сохраняем токен
      localStorage.setItem("adminToken", access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      setAuthError("Неверные учетные данные");
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Данные ошибки:", error.response.data);
          setAuthError(error.response.data.detail || "Ошибка авторизации");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту категорию?")) return;

    try {
      await axios.delete(ENDPOINTS.categories.delete(categoryId));
      setCategories((cats) => cats.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error("Ошибка при удалении категории", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
      await axios.delete(ENDPOINTS.products.delete(productId));
      setProducts((prods) => prods.filter((prod) => prod.id !== productId));
    } catch (error) {
      console.error("Ошибка при удалении товара", error);
    }
  };

  // Если пользователь не авторизован, показываем форму входа
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <FiLock className="mx-auto text-3xl text-orange-600 mb-2" />
            <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
            <p className="text-gray-500">Введите учетные данные для доступа</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit(onSubmitAuth)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Логин</label>
              <input
                {...registerAuth("username", { required: "Обязательное поле" })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              {authErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {authErrors.username.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                {...registerAuth("password", { required: "Обязательное поле" })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              {authErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {authErrors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-200 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleEditCategory = (category: ICategory) => {
    setCategoryValue("name", category.name);
    setCategoryValue("description", category.description);
    setCategoryValue("parent_id", category.parent_id);
    if (category.image_url) setPreviewImage(category.image_url);
    setEditingId(category.id);
  };

  // Обработчик для категории
  const onSubmitCategory = async (data: Omit<ICategory, "id">) => {
    const payload = {
      ...data,
      is_active: true,
    };

    try {
      const response = await axios.post(ENDPOINTS.categories.add, payload);
      const newCategory = response.data;

      if (editingId) {
        setCategories((cats) =>
          cats.map((cat) => (cat.id === editingId ? { ...newCategory } : cat))
        );
      } else {
        setCategories((cats) => [...cats, newCategory]);
      }

      resetCategory();
      setEditingId(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Ошибка при сохранении категории", error);
      alert("Не удалось сохранить категорию");
    }
  };

  // Обработчик для товара
  const onSubmitProduct = async (data: Omit<IProduct, "id">) => {
    try {
      const payload = {
        ...data,
        is_active: true,
      };
      const response = await axios.post(ENDPOINTS.products.add, payload);
      const newProduct = response.data;

      if (editingId) {
        setProducts((prods) =>
          prods.map((prod) =>
            prod.id === editingId ? { ...newProduct, id: editingId } : prod
          )
        );
      } else {
        setProducts((prods) => [
          ...prods,
          { ...newProduct, id: newProduct.id },
        ]);
      }

      resetProduct();
      setEditingId(null);
    } catch (error) {
      console.error("Ошибка при сохранении товара", error);
      alert("Не удалось сохранить товар");
    }
  };

  const handleEditProduct = (product: IProduct) => {
    setProductValue("name", product.name);
    setProductValue("description", product.description);
    setProductValue("price", product.price);
    setProductValue("category_id", product.category_id);
    setEditingId(product.id);
  };

  // Загрузка изображения (имитация)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setCategoryValue("image_url", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

      {/* Навигация по табам */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "categories"
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Категории
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "products"
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Товары
        </button>
      </div>

      {activeTab === "categories" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма категории */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Редактировать категорию" : "Добавить категорию"}
            </h2>
            <form onSubmit={handleCategorySubmit(onSubmitCategory)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Название</label>
                <input
                  {...registerCategory("name", { required: true })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Описание</label>
                <textarea
                  {...registerCategory("description")}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Изображение</label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded flex items-center">
                    <FiUpload className="mr-2" />
                    Загрузить
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  {previewImage && (
                    <div className="w-16 h-16 border rounded overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  {editingId ? "Обновить" : "Добавить"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      resetCategory();
                      setEditingId(null);
                      setPreviewImage(null);
                    }}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Отмена
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Список категорий */}
          <div>
            <h2 className="text-xl font-bold mb-4">Список категорий</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    {category.parent_id && (
                      <p className="text-sm text-gray-500">
                        Подкатегория:{" "}
                        {
                          categories.find((c) => c.id === category.parent_id)
                            ?.name
                        }
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма товара */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Редактировать товар" : "Добавить товар"}
            </h2>
            <form onSubmit={handleProductSubmit(onSubmitProduct)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Название</label>
                <input
                  {...registerProduct("name", { required: true })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Описание</label>
                <textarea
                  {...registerProduct("description")}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Цена</label>
                <input
                  type="number"
                  step="0.01"
                  {...registerProduct("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Категория</label>
                <select
                  {...registerProduct("category_id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Варианты товара */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Варианты</label>
                <div className="space-y-2">
                  {watchProduct("variants")?.map((variant, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        placeholder="Размер"
                        className="px-2 py-1 border rounded flex-1"
                        value={variant.size || ""}
                        onChange={(e) => {
                          const variants = [...watchProduct("variants")];
                          variants[index].size = e.target.value;
                          setProductValue("variants", variants);
                        }}
                      />
                      <input
                        placeholder="Цвет"
                        className="px-2 py-1 border rounded flex-1"
                        value={variant.color}
                        onChange={(e) => {
                          const variants = [...watchProduct("variants")];
                          variants[index].color = e.target.value;
                          setProductValue("variants", variants);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const variants = [...watchProduct("variants")];
                          variants.splice(index, 1);
                          setProductValue("variants", variants);
                        }}
                        className="text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const variants = watchProduct("variants") || [];
                      setProductValue("variants", [
                        ...variants,
                        {
                          size: null,
                          color: "",
                          sku: "",
                          price_adjustment: 0,
                          quantity: 0,
                        },
                      ]);
                    }}
                    className="flex items-center text-sm text-blue-600"
                  >
                    <FiPlus className="mr-1" /> Добавить вариант
                  </button>
                </div>
              </div>

              {/* Изображения товара */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Изображения</label>
                <div className="space-y-2">
                  {watchProduct("images")?.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-16 h-16 border rounded overflow-hidden">
                        {image.image_url ? (
                          <img
                            src={image.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <FiImage className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        id={`product-image-${index}`}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const images = [...watchProduct("images")];
                              images[index].image_url = reader.result as string;
                              setProductValue("images", images);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label
                        htmlFor={`product-image-${index}`}
                        className="px-2 py-1 bg-gray-100 rounded text-sm cursor-pointer"
                      >
                        Заменить
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={image.is_primary}
                          onChange={(e) => {
                            const images = watchProduct("images").map(
                              (img, i) => ({
                                ...img,
                                is_primary:
                                  i === index ? e.target.checked : false,
                              })
                            );
                            setProductValue("images", images);
                          }}
                          className="mr-1"
                        />
                        <span className="text-sm">Главное</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const images = [...watchProduct("images")];
                          images.splice(index, 1);
                          setProductValue("images", images);
                        }}
                        className="text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const images = watchProduct("images") || [];
                      setProductValue("images", [
                        ...images,
                        { image_url: "", is_primary: images.length === 0 },
                      ]);
                    }}
                    className="flex items-center text-sm text-blue-600"
                  >
                    <FiPlus className="mr-1" /> Добавить изображение
                  </button>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  {editingId ? "Обновить" : "Добавить"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      resetProduct();
                      setEditingId(null);
                    }}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Отмена
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Список товаров */}
          <div>
            <h2 className="text-xl font-bold mb-4">Список товаров</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {
                          categories.find((c) => c.id === product.category_id)
                            ?.name
                        }
                      </p>
                      <p className="font-bold">{product.price} ₽</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  {product.images?.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                      {product.images.slice(0, 3).map((image, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 border rounded overflow-hidden"
                        >
                          <img
                            src={image.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
