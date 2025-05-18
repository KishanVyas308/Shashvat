import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { productAtom } from "../Atoms/productsAtom";
import ProductCard from "./ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PopularProduct = ({ productId = null, category = null }) => {
  const allProducts = useRecoilValue(productAtom);

  // Filter popular products, optionally by category and exclude current product
  const popularProducts = allProducts?.filter((product) => {
    const productCategory = product?.details?.category || product?.category;
    const isSameCategory = category ? productCategory === category : true;
    const isNotCurrentProduct = productId ? product.id !== productId : true;
    return product.isPopular && isSameCategory && isNotCurrentProduct;
  }) || [];

  const [slidesToShow, setSlidesToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateSlidesToShow = () => {
    if (window.innerWidth <= 640) {
      setSlidesToShow(1); // Mobile
    } else if (window.innerWidth <= 1024) {
      setSlidesToShow(2); // Tablet
    } else {
      setSlidesToShow(4); // Desktop
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow, popularProducts.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, popularProducts.length - slidesToShow) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= Math.max(0, popularProducts.length - slidesToShow) ? 0 : prevIndex + 1
    );
  };

  // Don't show anything if no popular products matching filter
  if (!popularProducts.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center text-4xl font-bold mb-8">
        <span className="text-blue-600">Popular</span> Products
      </h2>
      <div className="container mx-auto px-4">
        <div className="relative w-full overflow-hidden">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 -ml-2"
            aria-label="Previous product"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 -mr-2"
            aria-label="Next product"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Product slider */}
          <div
            className="flex transition-transform duration-500 ease-in-out px-10"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
          >
            {popularProducts.map((product, index) => (
              <div
                key={product.id || index}
                className="flex-shrink-0"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="p-3">
                  <div className="transform transition-transform duration-300 hover:scale-105">
                    <ProductCard product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(popularProducts.length / slidesToShow) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full ${
                    Math.floor(currentIndex / slidesToShow) === index
                      ? "bg-blue-600 w-4"
                      : "bg-gray-300"
                  } transition-all duration-300`}
                  onClick={() => setCurrentIndex(index * slidesToShow)}
                  aria-label={`Go to page ${index + 1}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
