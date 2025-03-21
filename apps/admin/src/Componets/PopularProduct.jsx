import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { productAtom } from "../Atoms/productsAtom";
import ProductCard from "./ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PopularProduct = ({ productId = null }) => {
  const allProducts = useRecoilValue(productAtom);
  const popularProducts = allProducts?.filter((product) => product.isPopular) || [];

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
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? popularProducts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % (popularProducts.length + slidesToShow)
    );
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= popularProducts.length) {
      setCurrentIndex(0);
    }
  };

  const handleProductClick = (productId) => {

    window.location.href = `/productdetail/${productId}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <style>
        {`
          .slick-slide {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .slick-list {
            padding: 0 10px;
          }

          .slick-dots {
            bottom: -30px;
          }

          .slick-dots li button:before {
            color: #1f2937; 
          }

          .slick-dots li.slick-active button:before {
            color: #3b82f6;
          }

          .p-2 {
            padding: 10px; 
          }

          .product-card {
            position: relative;
            border-radius: 8px;
            transition: border 0.3s ease-in-out;
          }

          .product-card:hover {
            border: 2px solid #3b82f6;
            border-radius: 12px;
          }

          .product-card .arrow-button {
            display: none;
            position: absolute;
            bottom: 10px;
            right: 10px;
            background-color: #3b82f6; 
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .product-card:hover .arrow-button {
            display: flex;
          }
        `}
      </style>
      <h2 className="text-center text-4xl font-bold mt-6">
        <span className="text-blue-600">Popular</span> Products
      </h2>
      <div className="container mx-auto px-4 py-8">
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center justify-between absolute inset-0">
            <button onClick={handlePrev} className="p-2 bg-blue-600 opacity-50 hover:opacity-100 text-white rounded-full z-10">
              <FiChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className="p-2 bg-blue-600 opacity-50 hover:opacity-100 text-white rounded-full z-10">
              <FiChevronRight size={24} />
            </button>
          </div>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {popularProducts.concat(popularProducts.slice(0, slidesToShow)).map((product, index) => (
              <div key={index} className="flex-shrink-0 w-full" style={{ width: `${100 / slidesToShow}%` }}>
                <div className="p-2 ">
                  <ProductCard product={product} />
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
