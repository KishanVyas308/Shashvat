'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faBuilding, faStore, faArrowRight, faPlay, faPause,faIndustry } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import ProductsPage from '../pages/ProductPage'
const data = [
  { icon: faGlobe, title: 'Nature of Business', description: 'Manufacturers, Trader, Supplier' },
  { icon: faBuilding, title: 'Year of Establishment', description: '2019' },
  { icon: faStore, title: 'Market Covered', description: 'India' },
  { icon: faIndustry, title: 'Industries We Serve', description: 'Supplying high-quality brass components to electrical, plumbing, and automotive industries.' },
]

export default function Info() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef(null) // Using useRef instead of document.getElementById

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsVideoPlaying(true)
      } else {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      }
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="https://th.bing.com/th/id/OIP.Z5SuxbBI_-pYy_qjQjcuPAHaE7?w=273&h=182&c=7&r=0&o=5&dpr=2&pid=1.7"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Video Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <video
                ref={videoRef} // Using ref
                src="https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/videos%2Fshasvat-video-homepage.mp4?alt=media&token=2c654d01-8aaa-4856-b9cd-007d474d47e7"
                autoPlay
                loop
                muted
                className="w-full"
              />
              {/* Play/Pause Button */}
              <button
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 bg-white bg-opacity-75 hover:bg-opacity-100 text-blue-600 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                <FontAwesomeIcon icon={isVideoPlaying ? faPause : faPlay} className="w-6 h-6" />
              </button>
            </div>

            {/* View All Products Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {ProductsPage} /* Add navigation logic */}
            >
              View All Products
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </motion.button>
          </div>

          {/* Text & Info Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Shashvat</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
            Based in Jamnagar, Gujarat, Shashvat Enterprise has emerged as a trusted name in brass manufacturing and supply across India. Since its inception in 2019, the company has grown rapidly, delivering precision-engineered brass products that meet the highest industry standards. Our commitment to quality, innovation, and customer satisfaction sets us apart in the market.
            </p>

            {/* Company Glimpse Section */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              <span className="text-blue-600">Glimpse</span> of Our Company
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${index === activeIndex ? 'ring-2 ring-blue-400' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <FontAwesomeIcon icon={item.icon} className="text-2xl text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
