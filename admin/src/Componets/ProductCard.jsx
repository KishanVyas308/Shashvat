import React, { useState } from "react";
import { FiChevronRight, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  return (
    <div
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Wrapper */}
      <div className="relative h-80 overflow-hidden bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        />
      </div>

      {/* Product Details with Hover Effect */}
      <div
        className={`absolute inset-0 bg-blue-800 bg-opacity-80 text-white flex flex-col items-center justify-center p-6 space-y-4 rounded-lg transition-transform duration-500 ease-in-out ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <ul className="space-y-2">
          {Object.entries(product.details).map(([key, value]) => (
            <li key={key} className="text-smd">
              <span className="font-medium capitalize">{key}:</span> {value}
            </li>
          ))}
        </ul>
        <button
          onClick={() => handleProductClick(product.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2"
        >
          <FiEye size={20} />
          <span>View Details</span>
        </button>
      </div>

      {/* Bottom Gradient & Icon */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
      <div
        className={`absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 transition-transform duration-300 ${
          isHovered ? "rotate-90" : "rotate-0"
        }`}
      >
        <FiChevronRight size={20} />
      </div>
    </div>
  );
};

export default ProductCard;
