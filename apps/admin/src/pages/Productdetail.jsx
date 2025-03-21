import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { productAtom } from "../Atoms/productsAtom";
import { allProduct } from "../backend/manageProduct";
import { loadingAtom } from "../Atoms/loadingAtom";
import { userAtom } from "../Atoms/userAtom";
import PopularProduct from "../Componets/PopularProduct";
import DeleteProductButton from "../Componets/admin/DeleteProductButton";
import WhatsappContectButton from "../Componets/WhatsappContectButton";
import SendRequirementButton from "../Componets/SendRequirementButton";
import { Package, MapPin, Box, Truck, Info, Grid, ChevronRight } from "lucide-react";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [isZoomed, setIsZoomed] = useState(false);
  const params = useParams();
  const userAtm = useRecoilValue(userAtom);
  const [products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

  useEffect(() => {
    scrollToTop();
    setUp();
  }, [params, products]);

  const setUp = async () => {
    setIsLoading(true);
    if (products === null) {
      setProducts(await allProduct());
    }
    let prod = products?.find((p) => p.id == params.id);
    setProduct(prod);
    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 p-6">
            <div className="relative">
              <div
                className={`relative overflow-hidden rounded-lg ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={`w-full object-contain transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
                />
              </div>
              <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Made in India</span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:w-1/2 p-6 lg:p-8 bg-gray-50">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="text-sm text-blue-600 flex items-center space-x-2 mb-4">
              <Package className="w-5 h-5" />
              <span>{product.category}</span>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-gray-600" /> Key Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Box, label: "MOQ", value: `${product.moq} Piece` },
                    { icon: Grid, label: "Size", value: product.size },
                    { icon: Truck, label: "Material", value: product.material },
                  ].map(({ icon: Icon, label, value }, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">{label}</p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600 capitalize">{key}</p>
                        <p className="font-medium">{value || "----"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <WhatsappContectButton product={product} />
                <SendRequirementButton product={product} />
                {userAtm?.isAdmin && <DeleteProductButton productId={params.id} imgUrl={product.imgUrl} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4">Similar Products</h2>
        <PopularProduct productIdToSkip={params.id} />
      </div>
      {isLoading && <div className="text-center mt-4">Loading...</div>}
    </div>
  );
};

export default ProductDetail;
