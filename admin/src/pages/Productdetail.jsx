import React, { useEffect, useState, useRef } from "react";
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
import { Package, MapPin, Box, Truck, Info, Grid, ChevronRight, ArrowLeft, Camera } from "lucide-react";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  
  const params = useParams();
  const userAtm = useRecoilValue(userAtom);
  const [products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

  const ZOOM_LEVEL = 5; // Magnification factor
  const MAGNIFIER_SIZE = 400; // Size of magnifier in pixels

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

  const handleMouseMove = (e) => {
    if (!imageRef.current || !containerRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate relative position within the image (0 to 1)
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    
    // Calculate magnifier position in pixels relative to container
    const x = e.clientX - containerRect.left - MAGNIFIER_SIZE / 2;
    const y = e.clientY - containerRect.top - MAGNIFIER_SIZE / 2;
    
    // Set background position percentage (for the zoomed background image)
    const backgroundX = relativeX * 100;
    const backgroundY = relativeY * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(containerRect.width - MAGNIFIER_SIZE, x)),
      y: Math.max(0, Math.min(containerRect.height - MAGNIFIER_SIZE, y)),
      backgroundX,
      backgroundY
    });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.history.back(); }} 
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to products
        </a>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/5 p-8">
              <div 
                ref={containerRef}
                className="relative h-[500px] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center group"
              >
                <div className="absolute top-4 right-4 z-10 bg-white/90 px-3 py-1 rounded-full shadow-md flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Made in India</span>
                </div>
                
                <div className="absolute bottom-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full shadow-md flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">
                    {isZoomed ? "Click to exit zoom" : "Click to zoom"}
                  </span>
                </div>
                
                <div 
                  className={`w-full h-full flex items-center justify-center ${isZoomed ? "cursor-crosshair" : "cursor-zoom-in"}`}
                  onClick={toggleZoom}
                  onMouseMove={isZoomed ? handleMouseMove : null}
                  onMouseLeave={() => isZoomed && setIsZoomed(false)}
                >
                  <img
                    ref={imageRef}
                    src={product.imageUrl}
                    alt={product.name}
                    className={`max-h-full max-w-full object-contain transition-all duration-300 ${isZoomed ? "opacity-95" : ""}`}
                  />
                  
                  {isZoomed && (
                    <div 
                      className="absolute pointer-events-none rounded-lg shadow-xl border-2 border-white overflow-hidden z-20 transition-all duration-75"
                      style={{
                        width: `${MAGNIFIER_SIZE}px`,
                        height: `${MAGNIFIER_SIZE}px`,
                        top: `${zoomPosition.y}px`,
                        left: `${zoomPosition.x}px`,
                        backgroundImage: `url(${product.imageUrl})`,
                        backgroundPosition: `${zoomPosition.backgroundX}% ${zoomPosition.backgroundY}%`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${ZOOM_LEVEL * 100}%`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="sticky top-8">
                <div className="flex items-center space-x-2 text-sm text-blue-600 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="font-medium">{product.category}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h1>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                      <Info className="w-5 h-5 mr-2 text-blue-500" /> Key Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Box, label: "MOQ", value: `${product.moq} Piece`, color: "bg-blue-50 text-blue-600" },
                        { icon: Grid, label: "Size", value: product.size, color: "bg-purple-50 text-purple-600" },
                        { icon: Truck, label: "Material", value: product.material, color: "bg-green-50 text-green-600" },
                      ].map(({ icon: Icon, label, value, color }, idx) => (
                        <div key={idx} className={`flex items-center space-x-3 p-4 rounded-lg ${color} hover:shadow-sm transition-all`}>
                          <Icon className="w-5 h-5" />
                          <div>
                            <p className="text-xs opacity-80">{label}</p>
                            <p className="font-semibold">{value || "N/A"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.details).map(([key, value]) => (
                        <div key={key} className="flex items-start p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                          <div className="ml-2">
                            <p className="text-xs text-gray-600 capitalize">{key}</p>
                            <p className="font-medium text-gray-900">{value || "----"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-8">
                    <WhatsappContectButton product={product} />
                    <SendRequirementButton product={product} />
                    {userAtm?.isAdmin && <DeleteProductButton productId={params.id} imgUrl={product.imgUrl} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Similar Products
            </span>
          </h2>
          <PopularProduct productIdToSkip={params.id} />
        </div>
        
        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
