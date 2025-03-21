'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faUsers, faBuilding, faStore, faArrowRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const data = [
  { icon: faGlobe, title: 'Nature of Business', description: 'Manufacturers, Wholesaler, Trader' },
  { icon: faUsers, title: 'Number of Employees', description: '12' },
  { icon: faBuilding, title: 'Year of Establishment', description: '2019' },
  { icon: faStore, title: 'Market Covered', description: 'India' },
]

export default function Info() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000)

    return () => clearInterval(interval)
  }, []);

  const toggleVideo = () => {
    const video = document.getElementById('company-video') ; 
    // <-- semicolon added here

    if (video) {  // Check if video element is not null
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  } else {
    console.error('Video element not found!');
  }
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img src="https://th.bing.com/th/id/OIP.Z5SuxbBI_-pYy_qjQjcuPAHaE7?w=273&h=182&c=7&r=0&o=5&dpr=2&pid=1.7" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <video
                id="company-video"
                src="https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/videos%2Fshasvat-video-homepage.mp4?alt=media&token=2c654d01-8aaa-4856-b9cd-007d474d47e7"
                autoPlay
                loop
                muted
                className="w-full"
              />
              <button
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 bg-white bg-opacity-75 hover:bg-opacity-100 text-blue-600 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              >
                <FontAwesomeIcon icon={isVideoPlaying ? faPause : faPlay} className="w-6 h-6" />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {/* Navigate to products page */}}
            >
              View All Products
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </motion.button>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Shashvat</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Located in Jamnagar (Gujarat), Shashvat Brass Industries is one of the top manufacturers and suppliers of brass products in India.
              The company started its operation in the year 2019 and now, it is working on a large scale supplying its products to every corner of the nation.
              We are in this industry for more than 2 decades and have mastered every single aspect of our business.
            </p>
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
