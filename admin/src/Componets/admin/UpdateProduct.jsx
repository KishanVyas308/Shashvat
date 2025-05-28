"use client"

import { useState, useEffect } from "react"
import { updateProduct, allProduct } from "../../backend/manageProduct"
import { useRecoilState } from "recoil"
import { productAtom } from "../../Atoms/productsAtom"
import { loadingAtom } from "../../Atoms/loadingAtom"
import { allCategoriesAtom } from "../../Atoms/categories"
import Loading from "../Loading"
import { Package, Upload, Check, X, ChevronDown } from "lucide-react"
import { toast } from "react-toastify"

const UpdateProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState("")
  const [product, setProduct] = useState({
    id: "",
    image: null,
    img: "",
    name: "",
    moq: "",
    category: "",
    subCategory: "",
    size: "",
    material: "",
    shape: "",
    color: "",
    pattern: "",
    finish: "",
    weight: "",
    isPopular: false,
    latest: false,
  })
  const [products, setProducts] = useRecoilState(productAtom)
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)
  const [previewUrl, setPreviewUrl] = useState("")

  const getProductById = async (productId) => {
    return products?.find((p) => p.id === productId) || null
  }

  const handleProductSelect = async (e) => {
    setIsLoading(true)
    const productId = e.target.value
    setSelectedProductId(productId)

    if (productId) {
      const selectedProduct = await getProductById(productId)
      console.log("Selected Product:", selectedProduct);
      
      if (selectedProduct !== null) {
        // Map the selected product to match your schema
        const productData = {
          id: selectedProduct.id || "",
          image: null, // For new image upload
          img: selectedProduct.img || "",
          name: selectedProduct.name || "",
          moq: selectedProduct.moq || "",
          category: selectedProduct.category || "",
          subCategory: selectedProduct.subCategory || "",
          size: selectedProduct.size || "",
          material: selectedProduct.material || "",
          shape: selectedProduct.shape || "",
          color: selectedProduct.color || "",
          pattern: selectedProduct.pattern || "",
          finish: selectedProduct.finish || "",
          weight: selectedProduct.weight || "",
          isPopular: selectedProduct.isPopular || false,
          latest: selectedProduct.latest || false,
        }
        setProduct(productData)
        setPreviewUrl(selectedProduct.img || "")
      }
    } else {
      // Reset product state when no product is selected
      setProduct({
        id: "",
        image: null,
        img: "",
        name: "",
        moq: "",
        category: "",
        subCategory: "",
        size: "",
        material: "",
        shape: "",
        color: "",
        pattern: "",
        finish: "",
        weight: "",
        isPopular: false,
        latest: false,
      })
      setPreviewUrl("")
    }

    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const requiredFields = ["name", "moq", "category", "size"]
    for (const field of requiredFields) {
      if (!product[field]) {
        toast.error(`Please fill all required fields (${field})`)
        setIsLoading(false)
        return
      }
    }

    try {
      const formData = new FormData()
      formData.append("id", product.id)
      formData.append("name", product.name)
      formData.append("moq", product.moq)
      formData.append("category", product.category)
      formData.append("subCategory", product.subCategory || "")
      formData.append("size", product.size)
      formData.append("material", product.material || "")
      formData.append("shape", product.shape || "")
      formData.append("color", product.color || "")
      formData.append("pattern", product.pattern || "")
      formData.append("finish", product.finish || "")
      formData.append("weight", product.weight || "")
      formData.append("isPopular", product.isPopular)
      formData.append("latest", product.latest)
      
      // Only append image if a new one was selected
      if (product.image) {
        formData.append("image", product.image)
      }
      
      console.log("Updating product with data:", product);

      await updateProduct(formData)
      const updatedProducts = await allProduct()
      setProducts(updatedProducts)
      setSelectedProductId("")
      setProduct({
        id: "",
        image: null,
        img: "",
        name: "",
        moq: "",
        category: "",
        subCategory: "",
        size: "",
        material: "",
        shape: "",
        color: "",
        pattern: "",
        finish: "",
        weight: "",
        isPopular: false,
        latest: false,
      })
      setPreviewUrl("")
      toast.success("Product updated successfully!")
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update product. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Update Product</h1>
        </div>
        <p className="text-gray-600">Select a product and update its details</p>
      </div>

      {isLoading && <Loading />}

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Product to Update</label>
        <div className="relative">
          <select
            value={selectedProductId}
            onChange={handleProductSelect}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="">
              Select Product
            </option>
            {products && Array.isArray(products) &&
              products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {selectedProductId && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Product preview"
                          className="mx-auto h-32 w-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("")
                            setProduct((prev) => ({ ...prev, image: null }))
                          }}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MOQ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="moq"
                  value={product.moq || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={product.category || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Sanitary part">Sanitary part</option>
                  <option value="HardWare Parts">HardWare Parts</option>
                  <option value="Components Parts">Components Parts</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                <input
                  type="text"
                  name="subCategory"
                  value={product.subCategory || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="size"
                  value={product.size || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <input
                  type="text"
                  name="material"
                  value={product.material || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={product.weight || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                <input
                  type="text"
                  name="shape"
                  value={product.shape || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={product.color || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
                <input
                  type="text"
                  name="pattern"
                  value={product.pattern || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Finish</label>
                <input
                  type="text"
                  name="finish"
                  value={product.finish || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Status</h2>

            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={product.isPopular || false}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Mark as Popular</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="latest"
                  checked={product.latest || false}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Mark as Latest</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="h-5 w-5 mr-2" />
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default UpdateProduct