"use client"

import { useState, useEffect } from "react"
import { addProduct, allProduct } from "../../backend/manageProduct"
import { useRecoilState, useRecoilValue } from "recoil"
import { productAtom } from "../../Atoms/productsAtom"
import { loadingAtom } from "../../Atoms/loadingAtom"
import { allCategoriesAtom } from "../../Atoms/categories" // Import the categories atom
import Loading from "../Loading"
import { Package, Upload, Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "react-toastify"

const CreateProduct = () => {
  const [product, setProduct] = useState({
    img: null, // file object
    name: "",
    moq: "",
    category: "",
    subCategory: "", // Added sub-category field
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

  const [previewUrl, setPreviewUrl] = useState("")
  const [Products, setProducts] = useRecoilState(productAtom)
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)
  const categories = useRecoilValue(allCategoriesAtom) // Get categories from atom
  const [dragActive, setDragActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [availableSubCategories, setAvailableSubCategories] = useState([])

  const steps = [
    { title: "Image Upload", component: ImageUploadStep },
    { title: "Basic Information", component: BasicInfoStep },
    { title: "Product Details", component: ProductDetailsStep },
    { title: "Product Status", component: ProductStatusStep },
  ]

  // Update sub-categories when category changes
  useEffect(() => {
    if (product.category && categories.length > 0) {
      const selectedCategory = categories.find(cat => 
        cat.name === product.category || 
        cat._id === product.category ||
        cat.id === product.category
      )
      
      if (selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0) {

        
        setAvailableSubCategories(selectedCategory.subcategories)
      } else {
        setAvailableSubCategories([])
      }
      
      // Reset sub-category when category changes
      setProduct(prev => ({ ...prev, subCategory: "" }))
    } else {
      setAvailableSubCategories([])
      setProduct(prev => ({ ...prev, subCategory: "" }))
    }
  }, [product.category, categories])

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
        img: file,
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: file,
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const setAllProduct = async () => {
    setProducts(await allProduct())
  }

  const resetForm = () => {
    setProduct({
      img: null,
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
    setCurrentStep(0)
    setAvailableSubCategories([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const requiredFields = ["img", "name", "moq", "category", "size"]
    for (const field of requiredFields) {
      if (!product[field]) {
        toast.error(`Please fill all required fields (${field})`)
        setIsLoading(false)
        return
      }
    }

    try {
      const formData = new FormData()
      formData.append("image", product.img)
      formData.append("name", product.name)
      formData.append("category", product.category)
      
      // Only append subcategory if it exists and has a value
      if (product.subCategory && product.subCategory.trim() !== "") {
        formData.append("subCategory", product.subCategory)
        console.log("Subcategory added:", product.subCategory);
        
      }
      
      formData.append("isPopular", product.isPopular)
      formData.append("latest", product.latest)
      formData.append("material", product.material)
      formData.append("moq", product.moq)
      formData.append("size", product.size)
      formData.append("shape", product.shape)
      formData.append("color", product.color)
      formData.append("pattern", product.pattern)
      formData.append("finish", product.finish)
      formData.append("weight", product.weight)

      await addProduct(formData)
      await setAllProduct()
      resetForm()
      toast.success("Product added successfully!")
    } catch (error) {
      toast.error("Failed to add product. Please try again.")
    }

    setIsLoading(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">ADD New Product</h1>
        </div>
        <p className="text-gray-600">Add a new product to your inventory with detailed specifications</p>
      </div>

      {isLoading && <Loading />}

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
                style={{ minWidth: "2rem" }}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm hidden sm:inline">{step.title}</span>
              {index < steps.length - 1 && (
                <div className="w-full h-1 bg-gray-200 mx-2">
                  <div
                    className={`h-full ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}`}
                    style={{ width: index < currentStep ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {steps[currentStep].component({
          product,
          handleChange,
          handleImageChange,
          handleDrag,
          handleDrop,
          previewUrl,
          setPreviewUrl,
          setProduct,
          dragActive,
          categories, // Pass categories to components
          availableSubCategories, // Pass available sub-categories
        })}

        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
            >
              <Check className="w-5 h-5 mr-2" />
              ADD Product
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const ImageUploadStep = ({ product, handleDrag, handleDrop, previewUrl, setPreviewUrl, setProduct, dragActive }) => (
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
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl("")
              setProduct((prev) => ({ ...prev, img: null }))
            }}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your product image here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
            Browse Files
            <input
              type="file"
              name="img"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    img: file,
                  }))
                  setPreviewUrl(URL.createObjectURL(file))
                }
              }}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      )}
    </div>
  </div>
)

const BasicInfoStep = ({ product, handleChange, categories, availableSubCategories }) => {
  // Check if subcategory field should be shown
  const shouldShowSubCategory = product.category && availableSubCategories && availableSubCategories.length > 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MOQ (Minimum Order Quantity) *
          </label>
          <input
            type="text"
            name="moq"
            value={product.moq}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., 100 pieces"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">-- Select Category --</option>
            {
              categories.map((category) => (
                <option key={category._id || category.id} value={category._id || category.name}>
                  {category.name}
                </option>
              ))
           }
          </select>
        </div>

        {/* Sub-Category Field - Only show if category is selected and has sub-categories */}
        {shouldShowSubCategory && (
          <div className="transition-all duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category
              <span className="text-xs text-blue-600 ml-1">
                ({availableSubCategories.length} available)
              </span>
            </label>
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">-- Select Sub Category --</option>
              {availableSubCategories.map((subCategory, index) => (
                <option 
                  key={index} 
                  value={subCategory.name || subCategory._id || subCategory}
                >
                  {subCategory.name || subCategory}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size *
          </label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., 10x5x2 cm"
            required
          />
        </div>
      </div>

      {/* Show a note about subcategory if category is selected but no subcategories available */}
      {product.category && (!availableSubCategories || availableSubCategories.length === 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-700">
            📝 No subcategories available for the selected category.
          </p>
        </div>
      )}
    </div>
  )
}

const ProductDetailsStep = ({ product, handleChange }) => (
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
          value={product.shape}
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
          value={product.color}
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
          value={product.pattern}
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
          value={product.finish}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Surface finish"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
        <input
          type="text"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Product weight"
        />
      </div>
    </div>
  </div>
)

const ProductStatusStep = ({ product, handleChange }) => (
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
)

export default CreateProduct