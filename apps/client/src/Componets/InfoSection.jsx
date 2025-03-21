'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBuilding, FaRocket, FaCogs } from 'react-icons/fa'

const infoData = [
  {
    icon: <FaBuilding className="text-4xl text-yellow-600" />,
    title: 'Infrastructure',
    description: 'We have a state-of-the-art infrastructure where all of our business activities including manufacturing, quality analysis, material handling, warehousing, and order fulfillment are managed by skilled employees. Our quality control experts conduct strict quality checks of our products.',
  },
  {
    icon: <FaRocket className="text-4xl text-yellow-600" />,
    title: 'Our Customer',
    description: 'Our expertise allows us to grow successfully, establishing a distinct place in the industry. We ensure to serve all of our customers across the nation with special attention to their needs.',
  },
  {
    icon: <FaCogs className="text-4xl text-yellow-600" />,
    title: 'Products',
    description: 'At Shashvat Brass Industries, we offer world-class brass flare fittings, anchors, inserts, pipe fittings, hardware fittings, and many more. We make it easy for customers to choose the right products for their needs.',
  },
]

const InfoCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out overflow-hidden"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6 flex-grow">
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-center text-gray-900 font-inter leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-gray-700 text-center font-light leading-relaxed tracking-wide">
          {description}
        </p>
      </div>
      <div className="p-4 bg-blue-50 text-blue-600 text-center font-medium">
        Learn More
      </div>
    </motion.div>
  )
}

const InfoSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 rounded-3xl">
      <div className="container mx-auto px-4 relative">
        <motion.h2
          className="text-center text-5xl font-extrabold mb-12 font-inter leading-tight tracking-tight text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Core <span className="text-blue-600">Competencies</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoData.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex"
            >
              <InfoCard
                icon={info.icon}
                title={info.title}
                description={info.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoSection
