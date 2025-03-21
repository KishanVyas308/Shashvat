import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  return (
    <div
      className={`ring-blue-400 p-4    rounded-xl ${
        isHovered ? "ring-2" : "border-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`shadow-lg p-4 sm:p-1 rounded-xl bg-white transition-transform duration-300 relative 
      }`}
       
      >
        <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
          <img
            onClick={() => handleProductClick(product.id)}
            src={product.imageUrl} // Make sure product.imageUrl is properly defined in your data structure
            alt={product.name}
            className="w-full cursor-pointer h-full object-cover transform hover:scale-110 transition-transform duration-600"
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">
          {product.name}
        </h2>
        <ul className="mb-4 text-center">
          <li className="text-sm text-gray-700">
            Shape: {product.details.shape}
          </li>
          <li className="text-sm text-gray-700">
            Color: {product.details.color}
          </li>
          <li className="text-sm text-gray-700">
            Pattern: {product.details.pattern}
          </li>
          <li className="text-sm text-gray-700">
            Finish: {product.details.finish}
          </li>
        </ul>
        {isHovered && (
          <button
            onClick={() => handleProductClick(product.id)}
            className="absolute right-4 bottom-4 bg-blue-500 text-white rounded-full p-3   flex items-center justify-center"
          >
            <FiChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
