import React, { useState } from "react";
import { addProduct, allProduct } from "../../backend/manageProduct";
import { storage } from "../../backend/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRecoilState } from "recoil";
import { productAtom } from "../../Atoms/productsAtom";
import { loadingAtom } from "../../Atoms/loadingAtom";
import Loading from "../Loading";
import { Package, Upload, Check, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    image: null,
    imageUrl: "",
    name: "",
    moq: "",
    category: "",
    size: "",
    material: "",
    isPopular: false,
    latest: false,
    details: {
      shape: "",
      color: "",
      pattern: "",
      finish: "",
    },
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [Products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in product.details) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        details: {
          ...prevProduct.details,
          [name]: value,
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const setAllProduct = async () => {
    setProducts(await allProduct());
  };

  const resetForm = () => {
    setProduct({
      image: null,
      imageUrl: "",
      name: "",
      moq: "",
      category: "",
      size: "",
      material: "",
      isPopular: false,
      latest: false,
      details: {
        shape: "",
        color: "",
        pattern: "",
        finish: "",
      },
    });
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const requiredFields = ["image", "name", "moq", "category", "size", "material"];

    for (let field of requiredFields) {
      if (!eval(`product.${field}`)) {
        toast.error(`Please fill all required fields (${field.replace("details.", "")})`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const imageRef = ref(storage, `products/${product.image.name}`);
      await uploadBytes(imageRef, product.image);
      const imageUrl = await getDownloadURL(imageRef);

      await addProduct(product, imageUrl);
      await setAllProduct();
      resetForm();
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">ADD New Product</h1>
        </div>
        <p className="text-gray-600">
          Add a new product to your inventory with detailed specifications
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {isLoading && <Loading />}

        <div className="relative">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl("");
                    setProduct((prev) => ({ ...prev, image: null }));
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your product image here
                </p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                  Browse Files
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MOQ</label>
              <input
                type="text"
                name="moq"
                value={product.moq}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Minimum order quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Sanitary part">Sanitary part</option>
                <option value="HardWare Parts">HardWare Parts</option>
                <option value="Components Parts">Components Parts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product size"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <input
                type="text"
                name="material"
                value={product.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Material type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
              <input
                type="text"
                name="shape"
                value={product.details.shape}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product shape"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={product.details.color}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product color"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
              <input
                type="text"
                name="pattern"
                value={product.details.pattern}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pattern design"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Finish</label>
              <input
                type="text"
                name="finish"
                value={product.details.finish}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Surface finish"
              />
            </div>
          </div>
        </div>

        {/* Product Status */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Status</h2>
          
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPopular"
                checked={product.isPopular}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Mark as Popular</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="latest"
                checked={product.latest}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Mark as Latest</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Check className="w-5 h-5 mr-2" />
            ADD Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
