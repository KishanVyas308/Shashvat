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
  const [activeImage, setActiveImage] = useState(0);
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

    let prod = null;
    if (products !== null) {
      products.forEach((p) => {
        if (p.id == params.id) {
          prod = p;
        }
      });
      setProduct(prod);
    }
    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white  rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 p-6 max-h-[400]">
              <div className="relative " >
                <div
                  className={`relative overflow-hidden rounded-lg ${
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    if (isZoomed) {
                      setIsZoomed(false);
                    }
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`w-full max-h-[300px] object-contain transition-transform duration-200 ${
                      isZoomed ? "scale-150" : "scale-100"
                    }`}
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-md">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Made in India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-1/2 p-6 lg:p-8 bg-gray-50">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">{product.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h1>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-gray-600" />
                    Key Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Box className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">MOQ</p>
                        <p className="font-semibold">{product.moq} Piece</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Grid className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Size</p>
                        <p className="font-semibold">{product.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Truck className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Material</p>
                        <p className="font-semibold">{product.material}</p>
                      </div>
                    </div>
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

                <div className="flex items-center space-x-4">
                  <WhatsappContectButton product={product} />
                  <SendRequirementButton product={product} />
                  {userAtm?.isAdmin && (
                    <DeleteProductButton
                      productId={params.id}
                      imgUrl={product.imgUrl}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Similar Products</h2>
            <p className="mt-2 text-gray-600">You might also be interested in these products</p>
          </div>
          <PopularProduct productIdToSkip={params.id} />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default ProductDetail;
