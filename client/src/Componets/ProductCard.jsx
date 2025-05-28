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
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
   onClick={(e) => { 
            e.stopPropagation();
            handleProductClick(product.id);
          }} >
      {/* Image Wrapper with improved animation */}
      <div className="relative h-80 overflow-hidden bg-white">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out transform hover:scale-110"
        />

        {/* Product Name (Initially Visible) */}
        <div
          className={`absolute bottom-0 w-full bg-blue-700 bg-opacity-85 text-white text-center py-2 font-semibold transition-all duration-500 ease-in-out ${
            isHovered ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
          }`}
        >
          {product.name}
        </div>
      </div>

      {/* Product Details with Improved Hover Effect */}
      <div
        className={`absolute inset-0 bg-blue-800 bg-opacity-80 text-white flex flex-col items-center justify-center p-6 space-y-4 rounded-lg transition-all duration-500 ease-in-out ${
          isHovered ? "opacity-95 translate-y-0" : "opacity-0 translate-y-full"
        }`}
      >
        <h2 className="text-xl font-bold">{product.name}</h2>
   <ul className="space-y-2">
  <li className="text-lg flex"><span className="font-medium capitalize mr-2">MOQ:</span><span className="text-blue-100">{product.moq}</span></li>
          <li className="text-lg flex"><span className="font-medium capitalize mr-2">Size:</span><span className="text-blue-100">{product.size}</span></li>
          {product.material && <li className="text-lg flex"><span className="font-medium capitalize mr-2">Material:</span><span className="text-blue-100">{product.material}</span></li>}
          {product.weight && <li className="text-lg flex"><span className="font-medium capitalize mr-2">Weight:</span><span className="text-blue-100">{product.weight}</span></li>}
</ul>

        <button
          onClick={(e) => { 
            e.stopPropagation();
            handleProductClick(product.id);
          }}
          className="mt-3 bg-white text-blue-700 hover:bg-blue-100 py-2 px-6 rounded-full flex items-center justify-center space-x-2 transition-colors duration-300"
        >
          <FiEye className="mr-1" size={18} />
          <span>View Details</span>
        </button>
      </div>

      {/* Enhanced Bottom Gradient & Icon */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
      <div
        className={`absolute top-3 right-3 bg-blue-600 text-white rounded-full p-2 shadow-md transition-all duration-300 ${
          isHovered ? "transform rotate-90" : "transform rotate-0"
        }`}
      >
        <FiChevronRight size={16} />
      </div>
    </div>
  );
};

export default ProductCard;