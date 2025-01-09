import React, { useState } from "react";
import { addProduct, allProduct } from "../../backend/manageProduct"; // Make sure this path is correct
import { storage } from "../../backend/firebase"; // Import your firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRecoilState } from "recoil";
import { productAtom } from "../../Atoms/productsAtom";
import { loadingAtom } from "../../Atoms/loadingAtom";
import Loading from "../Loading";

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

  const [Products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);

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

  const setAllProduct = async () => {
    setProducts(await allProduct());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validation
    const requiredFields = [
      "image",
      "name",
      "moq",
      "category",
      "size",
      "material",
    ];
    for (let field of requiredFields) {
      if (!eval(`product.${field}`)) {
        alert(
          `Please fill all required fields (${field.replace("details.", "")})`
        );
        setIsLoading(false);
        return;
      }
    }

    const imageRef =  ref(storage, `products/${product.image.name}`);
    //! remove this line
    console.log("firebase used")
    await uploadBytes(imageRef, product.image);
    //! remove this line
    console.log("firebase used")
    const imageUrl = await getDownloadURL(imageRef);
    //! remove this line
    console.log("firebase used")
    
      
    console.log(imageUrl);
    await addProduct(product, imageUrl);
    await setAllProduct();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      {isLoading ? <Loading /> : <></>}
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
        Confirm Add
      </button>
    </form>
  );
};

export default CreateProduct;
