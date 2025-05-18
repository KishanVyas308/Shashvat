import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaUsers, FaGlobe, FaBox } from 'react-icons/fa';

const counterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const Counter = ({ icon, title, value, colorClass, startCounting, description }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (startCounting) {
      controls.start('visible');
      const end = parseInt(value, 10);
      const hasPlusSign = value.includes('+');
      const duration = 2000;
      const increment = end / (duration / 16);
      let currentCount = 0;

      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= end) {
          clearInterval(timer);
          setCount(end + (hasPlusSign ? '+' : ''));
        } else {
          setCount(Math.floor(currentCount));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, startCounting, controls]);

  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-2xl"
      variants={counterVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`p-6 text-center ${colorClass}`}>
        <motion.div
          className="text-5xl mb-4"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <motion.span 
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {count}
        </motion.span>
      </div>
      <motion.div 
        className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center p-6 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-700 text-center">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const CounterContainer = () => {
  const counters = [
    { icon: <FaUsers className="text-red-500" />, title: 'Happy Clients', value: '250+', colorClass: 'text-red-500', description: 'We have more than 250 satisfied clients across various industries.' },
    { icon: <FaGlobe className="text-orange-500" />, title: 'Different State Clients', value: '10+', colorClass: 'text-orange-500', description: 'Our products are trusted and used in more than 10 different states.' },
    { icon: <FaBox className="text-blue-500" />, title: 'Products Available', value: '50+', colorClass: 'text-blue-500', description: 'We manufacture and supply over 50 high-quality brass products to meet diverse needs.' },
  ];

  const [startCounting, setStartCounting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 rounded-3xl" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center text-4xl font-bold mb-12 font-sans"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Key <span className="text-blue-600">Achievements</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {counters.map((counter, index) => (
            <Counter
              key={index}
              icon={counter.icon}
              title={counter.title}
              value={counter.value}
              colorClass={counter.colorClass}
              startCounting={startCounting}
              description={counter.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterContainer;
