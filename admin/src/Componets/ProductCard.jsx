import React, { useState } from "react";
import { FiChevronRight, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = () => {
    navigate(`/productdetail/${product.id}`);
  };

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Status Badge (if needed) */}
      {product.status && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {product.status}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-all duration-500 ease-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {product.details && Object.values(product.details)[0]}
        </p>
        
        {/* Features Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.details && 
            Object.keys(product.details).slice(0, 3).map(key => (
              <span key={key} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                {key}
              </span>
            ))
          }
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); handleProductClick(); }}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors"
          >
            View Details 
            <FiChevronRight className={`ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
          
          <div className="rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors w-8 h-8 flex items-center justify-center text-white">
            <FiEye size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
