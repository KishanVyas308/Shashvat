import React from 'react';
import ProductCard from './ProductCard';
import { useRecoilValue } from 'recoil';
import { productAtom } from '../Atoms/productsAtom';

const ProductList = () => {
  const allProducts = useRecoilValue(productAtom);

  // Keep same functionality but improve visual presentation
  const latestProducts = allProducts !== null 
    ? allProducts
        .filter(product => product.latest === true)
    : [];

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Enhanced Header */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        <span className="text-gray-800">Our </span>
        <span className="text-blue-600 relative inline-block">
          Latest
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></span>
        </span>
        <span className="text-gray-800"> Products</span>
      </h1>

      {/* Product Grid with improved layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts !== null ? (
          latestProducts.length > 0 ? (
            latestProducts.map((product, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-300 hover:-translate-y-1"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No latest products available at the moment.
            </div>
          )
        ) : (
          // Loading state with animation
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-blue-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-200 rounded"></div>
                  <div className="h-4 bg-blue-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

