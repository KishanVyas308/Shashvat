// ProductList.jsx

import React from 'react';
import ProductCard from './ProductCard';
import { useRecoilValue } from 'recoil';
import { productAtom } from '../Atoms/productsAtom';

const ProductList = () => {
  const allProducts = useRecoilValue(productAtom);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <span className="text-blue-600">Latest</span> Products
      </h1>
      <div className="flex flex-wrap justify-center gap-6 mx-4">
        {console.log(allProducts)
        }
        {allProducts !== null ? (
          allProducts
            .filter(product => product && product.imageUrl) // Filter out undefined or products without imageUrl
            .filter(product => product.latest === true)
            .map((product, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:h-1/5 px-2">
                <ProductCard product={product} />
              </div>
            ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
