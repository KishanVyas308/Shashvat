'use client'

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { FiChevronRight, FiEye, FiSearch } from "react-icons/fi"
import { Box, Grid, Typography, Container, Divider } from "@mui/material"
import { userAtom } from "../Atoms/userAtom"
import { productAtom } from "../Atoms/productsAtom"

const ProductCard = ({ product, isAdmin, onDelete }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`)
  }

  return (
    <div
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Wrapper */}
      <div className="relative h-80 overflow-hidden bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        />
      </div>

      {/* Product Details with Hover Effect */}
      <div
        className={`absolute inset-0 bg-blue-800 bg-opacity-80 text-white flex flex-col items-center justify-center p-6 space-y-4 rounded-lg transition-transform duration-500 ease-in-out ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <ul className="space-y-2">
          {Object.entries(product.details || {}).map(([key, value]) => (
            <li key={key} className="text-md">
              <span className="font-medium capitalize">{key}:</span> {value}
            </li>
          ))}
        </ul>
        <button
          onClick={() => handleProductClick(product.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center space-x-2"
        >
          <FiEye size={20} />
          <span>View Details</span>
        </button>
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

      {/* Product Title */}
      <div className="absolute bottom-0 left-0 w-full bg-blue-500 text-white text-center py-2">
        <h2 className="text-xl font-bold">{product.name}</h2>
      </div>
    </div>
  )
}

const ProductType = ({ type, products }) => {
  const user = useRecoilValue(userAtom)
  const [showAll, setShowAll] = useState(false)

  const handleDeleteProduct = (productId) => {
    console.log(`Delete product with ID: ${productId}`)
  }

  const filteredProducts = products.filter((product) => product.category === type)
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8)

  return (
    <Box>
      <Typography variant="h4" style={{ marginBottom: "1em", fontWeight: "bold" }}>
        {type}
      </Typography>
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
      {filteredProducts.length > 6 && (
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
  const products = useRecoilValue(productAtom)
  const [searchTerm, setSearchTerm] = useState("")

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/050/680/704/small_2x/skilled-workers-performing-metal-fabrication-and-welding-in-a-modern-manufacturing-facility-photo.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-4">Premium Brass Solutions</h1>
          <p className="text-xl mb-8">Discover our high-quality brass components, hardware, and sanitary parts</p>
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
        <Box my="20px">
          <ProductType type={"Sanitary part"} products={filteredProducts} />
        </Box>
        <Divider />
        <Box my="20px">
          <ProductType type={"HardWare Parts"} products={filteredProducts} />
        </Box>
        <Divider />
        <Box my="20px">
          <ProductType type={"Components Parts"} products={filteredProducts} />
        </Box>
      </Container>
    </div>
  )
}

export default ProductsPage
