'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRocket, FaCogs, FaUsers } from 'react-icons/fa'

const infoData = [
  {
    icon: <FaRocket className="text-4xl text-yellow-600" />, 
    title: 'Our Customer',
    description: 'We focus on customer satisfaction and ensure we cater to their unique needs across the nation with premium service.',
  },
  {
    icon: <FaCogs className="text-4xl text-yellow-600" />, 
    title: 'Products',
    description: 'Offering world-class brass fittings, inserts, and hardware solutions to meet diverse industrial needs.',
  },
  {
    icon: <FaUsers className="text-4xl text-yellow-600" />, 
    title: 'Team & Expertise',
    description: 'Our experienced professionals drive innovation and ensure high-quality production standards in every product.',
  }
]

const InfoCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col bg-white rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out overflow-hidden p-6"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="mb-6 flex justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold mb-3 text-center text-gray-900 leading-tight">
        {title}
      </h3>
      <p className="text-gray-700 text-center leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

const InfoSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 px-6 rounded-3xl">
      <div className="container mx-auto relative max-w-6xl">
        <motion.h2
          className="text-center text-5xl font-extrabold mb-12 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Core <span className="text-blue-600">Competencies</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoData.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex justify-center"
            >
              <InfoCard {...info} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoSection
