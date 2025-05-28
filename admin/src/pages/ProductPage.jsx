import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue, useRecoilState } from "recoil"
import { FiChevronRight, FiEye, FiSearch, FiTrash2 } from "react-icons/fi"
import { Box, Grid, Typography, Container, Divider, Breadcrumbs, Link } from "@mui/material"
import DeleteProductButton from "../Componets/admin/DeleteProductButton"
import { userAtom } from "../Atoms/userAtom"
import { productAtom } from "../Atoms/productsAtom"
import { allCategoriesAtom } from "../Atoms/categories"
import { allProduct } from "../backend/manageProduct";
import { fetchCategories } from "../backend/init";
import { backendUrl } from "../globle";
const ProductCard = ({ product, isAdmin, onDelete }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`)
  }

  return (
    <div
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleProductClick(product.id)}
    >
      {/* Image Wrapper */}
      <div className="relative h-80 overflow-hidden bg-white">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Product Details with Hover Effect */}
      <div
        className={`absolute inset-0 bg-blue-800 bg-opacity-80 text-white flex flex-col items-center justify-center p-6 space-y-4 rounded-lg transition-transform duration-500 ease-in-out ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <ul className="space-y-2">
           <li className="text-lg flex"><span className="font-medium capitalize mr-2">MOQ:</span><span className="text-blue-100">{product.moq}</span></li>
          <li className="text-lg flex"><span className="font-medium capitalize mr-2">Size:</span><span className="text-blue-100">{product.size}</span></li>
          {product.material && <li className="text-lg flex"><span className="font-medium capitalize mr-2">Material:</span><span className="text-blue-100">{product.material}</span></li>}
          {product.weight && <li className="text-lg flex"><span className="font-medium capitalize mr-2">Weight:</span><span className="text-blue-100">{product.weight}</span></li>}
        </ul>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleProductClick(product.id)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2"
        >
          <FiEye size={20} />
          <span>View Details</span>
        </button>
      </div>

      {/* Product Name Always Visible at Bottom, Moves Up on Hover */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-blue-700 bg-opacity-80 text-white text-center py-2 font-semibold text-lg sm:text-base md:text-lg transition-all duration-500 ${
          isHovered ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {product.name}
      </div>

      {/* Bottom Gradient & Icon */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
      <div
        className={`absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 transition-transform duration-300 ${
          isHovered ? "rotate-90" : "rotate-0"
        }`}
      >
        <FiChevronRight size={20} />
      </div>

      {/* Admin Delete Button */}
      {isAdmin && (
        <div className="absolute top-2 left-2 z-10" onClick={(e) => e.stopPropagation()}>
          <DeleteProductButton productId={product.id} />
        </div>
      )}
    </div>
  )
}

const ProductType = ({ type, products, showTitle = true }) => {
  const user = useRecoilValue(userAtom)
  const [showAll, setShowAll] = useState(false)

  const handleDeleteProduct = (productId) => {
    console.log(`Delete product with ID: ${productId}`)
  }




  console.log("type:", type);
  
  
const nameToSlug = (name) => name?.toLowerCase().replace(/\s+/g, '-')


  const filteredProducts = products.filter(product => nameToSlug(product.category) == nameToSlug(type) || nameToSlug(product.subCategory) == nameToSlug(type))
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8)

  if (filteredProducts.length === 0) {
    return null
  }

  return (
    <Box>
      {showTitle && (
        <Typography variant="h4" style={{ marginBottom: "1em", fontWeight: "bold" }}>
          {type}
        </Typography>
      )}
      <Grid container spacing={3}>
        {displayedProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard
              product={product}
              isAdmin={user && user.isAdmin === true}
              onDelete={handleDeleteProduct}
            />
          </Grid>
        ))}
      </Grid>
      {products.length > 8 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}
    </Box>
  )
}

const ProductsPage = () => {
 
  const allCategories = useRecoilValue(allCategoriesAtom)
  const [products, setProducts] = useRecoilState(productAtom);
    const [categories, setCategories] = useRecoilState(allCategoriesAtom)
  const [searchTerm, setSearchTerm] = useState("")
  const { category, subcategory } = useParams()
  const navigate = useNavigate()


  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
    async function setUp() {
      const p = await allProduct();
      setProducts(p);
     
    }
useEffect(() => {
    if (!categories || categories.length === 0) {
      const API_BASE = `${backendUrl}/categories`;
      fetchCategories(setCategories, API_BASE);
    }
    scrollToTop()
    setUp();
  }, []);
  // Helper: slug <-> name
  const slugToName = (slug) => slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const nameToSlug = (name) => name?.toLowerCase().replace(/\s+/g, '-')

  // Filtering logic
  const getFilteredProducts = () => {
    let filtered = (products || []).filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (category && !subcategory) {

      // Filter by category slug
      filtered = filtered.filter(product =>
       nameToSlug(product.category) == category
      )
    } else if (category && subcategory) {
      // Filter by subcategory slug (match either category or subcategory)
      filtered = filtered.filter(product =>
        nameToSlug(product.subCategory) == subcategory
      )
    }
    // else: show all products

    return filtered
  }

  const filteredProducts = getFilteredProducts()

  // Unique categories for grouping
  const getUniqueCategories = () => {
    const categories = [...new Set(filteredProducts.map(product => product.category))]
    return categories.filter(cat => cat)
  }
  const uniqueCategories = getUniqueCategories()
  
  // Find current category/subcategory objects for breadcrumbs
  const currentCategory = allCategories?.find(cat =>
    nameToSlug(cat.name) === category
  )

  const currentSubcategory = currentCategory?.subcategories?.find(subcat =>
    nameToSlug(subcat.name) === subcategory
  )

  // Page title/desc
  const getPageTitle = () => {

    console.log("Sub category:", subcategory)
    console.log("Current sub category:", currentSubcategory);
    
    if (subcategory && currentSubcategory) return currentSubcategory.name

    console.log("Category:", category);
    console.log("Current category:", currentCategory);
    
    if (category && currentCategory) return currentCategory.name

    return "All Products"
  }
  const getPageDescription = () => {
    if (subcategory && currentSubcategory) return `Browse our ${currentSubcategory.name} collection`
    if (category && currentCategory) return `Browse our ${currentCategory.name} products`
    return "Discover our high-quality brass components, hardware, and sanitary parts"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/050/680/704/small_2x/skilled-workers-performing-metal-fabrication-and-welding-in-a-modern-manufacturing-facility-photo.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-4">{getPageTitle()}</h1>
          <p className="text-xl mb-8">{getPageDescription()}</p>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pr-12 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          </div>
        </div>
      </div>

      <Container className="container mx-auto p-4">
        {/* Breadcrumbs */}
        <Box my={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</Link>
            <Link color="inherit" onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>Products</Link>
            {category && currentCategory && (
              <Link color="inherit" onClick={() => navigate(`/products/${category}`)} style={{ cursor: 'pointer' }}>
                {currentCategory.name}
              </Link>
            )}
            {subcategory && currentSubcategory && (
              <Typography color="text.primary">{currentSubcategory.name}</Typography>
            )}
          </Breadcrumbs>
        </Box>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" color="textSecondary">
              No products found
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={2}>
              {searchTerm ? `No products match "${searchTerm}"` : "No products available in this category"}
            </Typography>
          </Box>
        ) :  category ? (
          // Show products grouped by category for main category page
          <Box my="20px">
            {
              subcategory ? (
                <ProductType type={subcategory} products={filteredProducts} showTitle={true} />
              ) : (
                category && (
                  <ProductType type={category} products={filteredProducts} showTitle={true} />
                )
              )
            }

          </Box>
        ) : (
          // Show all products grouped by categories
          <>
            {uniqueCategories.map((categoryType, index) => (
              <React.Fragment key={categoryType}>
                <Box my="20px">
                  <ProductType type={categoryType} products={filteredProducts} />
                </Box>
                {index < uniqueCategories.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </>
        )}
      </Container>
    </div>
  )
}

export default ProductsPage