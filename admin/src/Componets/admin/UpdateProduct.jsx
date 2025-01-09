import React, { useState } from "react";
import {
  updateProduct,
  allProduct,
} from "../../backend/manageProduct";
import { storage } from "../../backend/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../../Atoms/productsAtom";
import { loadingAtom } from "../../Atoms/loadingAtom";

import Loading from "../Loading";

const UpdateProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [product, setProduct] = useState({
    id: "",
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
  const [products, setProducts] = useRecoilState(productAtom);

  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

  const getProductById = async (productId) => {
    let pro = null;
    await products.map((p) => {
      if (p.id === productId) {
        pro = p;
      }
    });
    return pro;
  };

  const handleProductSelect = async (e) => {
    setIsLoading(true);
    const productId = e.target.value;
    setSelectedProductId(productId);

    if (productId) {
      const selectedProduct = await getProductById(productId);
      if (selectedProduct !== null) {
        setProduct({
          ...selectedProduct,
          image: null, // Reset the image field as it will be handled separately
        });
      }
    }

    setIsLoading(false);
  };

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
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const requiredFields = ["name", "moq", "category", "size", "material"];
    for (let field of requiredFields) {
      if (!eval(`product.${field}`)) {
        alert(
          `Please fill all required fields (${field.replace("details.", "")})`
        );
        setIsLoading(false);
        return;
      }
    }

    // Handle image upload
    if (product.image) {
      const imageRef = await ref(storage, `products/${product.image.name}`);
      await uploadBytes(imageRef, product.image);
      //! remove this line
      console.log("firebase used");
      const imageUrl = await getDownloadURL(imageRef);
        //! remove this line
    console.log("firebase used");

      setProduct((prevProduct) => ({
        ...prevProduct,
        imageUrl,
      }));
    }
    await updateProduct(product);
    setProducts(await allProduct());
    setSelectedProductId(""); // Reset the form after submission
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? <Loading /> : <></>}
      <div className="mb-4">
        <label className="block text-gray-700">Select Product to Update</label>
        <select
          value={selectedProductId}
          onChange={handleProductSelect}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="" disabled>
            Select Product
          </option>
          {products &&
            products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
        </select>
      </div>

      {selectedProductId && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          {product.imageUrl && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Current Product Image
              </label>
              <img
                src={product.imageUrl}
                alt="Product"
                className=" h-64 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">MOQ</label>
            <input
              type="text"
              name="moq"
              value={product.moq}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="Sanitary part">Sanitary part</option>
              <option value="HardWare Parts">HardWare Parts</option>
              <option value="Components Parts">Components Parts</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Size</label>
            <input
              type="text"
              name="size"
              value={product.size}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Material</label>
            <input
              type="text"
              name="material"
              value={product.material}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Shape</label>
            <input
              type="text"
              name="shape"
              value={product.details.shape}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={product.details.color}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pattern</label>
            <input
              type="text"
              name="pattern"
              value={product.details.pattern}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Finish</label>
            <input
              type="text"
              name="finish"
              value={product.details.finish}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Popular</label>
            <input
              type="checkbox"
              name="isPopular"
              checked={product.isPopular}
              onChange={handleChange}
              className="mr-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Latest</label>
            <input
              type="checkbox"
              name="latest"
              checked={product.latest}
              onChange={handleChange}
              className="mr-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
