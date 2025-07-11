"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { sliderImages } from "@/shared/data/MockData";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const pathname = usePathname();

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-96 overflow-hidden">
      {sliderImages.map((img, index) => (
        <m.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 10 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-contain"
            width={1200}
            height={400}
            priority={index === currentSlide}
          />
        </m.div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
      >
        <FiChevronLeft size={24} className="text-blue-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
      >
        <FiChevronRight size={24} className="text-blue-600" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide
                ? "bg-orange-700"
                : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
