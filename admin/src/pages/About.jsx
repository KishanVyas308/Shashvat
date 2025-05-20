import React, { useEffect, useState, useRef } from 'react';
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import { SiReact } from "react-icons/si";
import { FaRegHandshake } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Lottie from 'lottie-react';
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import arrowAnimation from "../Animation - 1739605311778.json";
import { Link } from 'react-router-dom';
import { Award, Truck, CreditCard, CheckCircle } from 'lucide-react';
import PopularProduct from '../Componets/PopularProduct';
const About = () => {
  // Refs for scroll animations
  const aboutRef = useRef(null);
  const visionMissionRef = useRef(null);
  const whyUsRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const isVisionMissionInView = useInView(visionMissionRef, { once: true, amount: 0.1 });
  const isWhyUsInView = useInView(whyUsRef, { once: true, amount: 0.1 });

  // Parallax effect for the hero section
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  
  /**
   * Scrolls the window to the top of the page with a smooth animation.
   */
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  useEffect(() => {
    scrollToTop();
    
    // Initialize AOS library effect
    const timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({ 
          duration: 1000,
          once: true,
          mirror: false
        });
      }
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [activeValue, setActiveValue] = useState(null);

  const { title, description, keywords } = seoData.about;

  const coreValues = [
    {
      title: 'Quality',
      description: 'We are dedicated to manufacturing brass products that meet the highest standards of quality and performance. Our commitment to excellence ensures that our customers receive products they can trust.',
      icon: "https://cdn-icons-png.flaticon.com/128/1067/1067357.png"
    },
    {
      title: 'Innovation',
      description: 'We believe in continuous improvement and embrace technological advancements to enhance our manufacturing processes and product offerings. Innovation drives our growth and success in a competitive market.',
      icon: "https://cdn-icons-png.flaticon.com/128/3176/3176271.png"
    },
    {
      title: 'Sustainability',
      description: 'We prioritize sustainable practices in all aspects of our business. From sourcing raw materials to production and delivery, we aim to minimize our environmental impact and promote a greener future.',
      icon: "https://cdn-icons-png.flaticon.com/128/2912/2912006.png"
    },
    {
      title: 'Customer Satisfaction',
      description: 'Our customers are at the heart of everything we do. We strive to exceed their expectations by understanding their needs and delivering products and services that add value to their operations.',
      icon: "https://cdn-icons-png.flaticon.com/128/4697/4697972.png"
    },
    {
      title: 'Integrity',
      description: 'We conduct our business with the highest ethical standards, ensuring transparency, honesty, and fairness in all our dealings. Integrity guides our decisions and actions, building trust with our clients and partners.',
      icon: "https://cdn-icons-png.flaticon.com/128/3095/3095221.png"
    },
    {
      title: 'Teamwork',
      description: 'We believe in the power of collaboration and teamwork. Our diverse and talented workforce works together to achieve common goals, fostering a supportive and inclusive work environment.',
      icon: "https://cdn-icons-png.flaticon.com/128/7342/7342132.png"
    },
  ];

  // Toggle core value detail view
  const toggleCoreValue = (index) => {
    if (activeValue === `coreValue${index}`) {
      setActiveValue(null);
    } else {
      setActiveValue(`coreValue${index}`);
    }
  };

  return (
    <>
      <SEO title={title} description={description} keywords={keywords} />

      {/* Hero Section with Parallax Effect */}
      <motion.section 
        className="relative bg-blue-800 text-white overflow-hidden" 
        style={{ height: '45vh', opacity: heroOpacity }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/050/680/704/small_2x/skilled-workers-performing-metal-fabrication-and-welding-in-a-modern-manufacturing-facility-photo.jpg')",
            height: '45vh',
            y: heroY
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-24 flex flex-col justify-center h-full">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium Brass Solutions
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our high-quality brass components, hardware, and sanitary parts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section with Staggered Animations */}
      <div 
        ref={aboutRef}
        className="bg-gradient-to-r from-white to-gray-100 p-8 rounded-lg shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 relative">
            <span className="border-b-4 border-teal-500 inline-block">About Us</span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-teal-500 animate-expand"></span>
          </h1>
        </motion.div>
        
        <div className="text-gray-800 text-lg leading-8 space-y-6">
          {/* Paragraph 1 with highlight effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden text-gray-700 leading-relaxed tracking-wide"
          >
            Located in Jamnagar (Gujarat),{" "}
            <span className="relative inline-block text-teal-600 font-bold group">
              Shashvat Enterprise
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>{" "}
            is one of the <span className="font-medium">top manufacturers and suppliers</span> of brass products in
            India. Established in 2019, the company has grown into a large-scale
            operation, delivering products across the nation. With over two
            decades of experience, we have honed our expertise to meet and exceed
            customer expectations with precision and excellence.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-700 leading-relaxed tracking-wide"
          >
            At <span className="font-medium text-teal-600">Shashvat Enterprise</span>, we offer a wide range of high-quality
            products including <span className="italic">brass flare fittings, brass anchors, brass inserts,
            brass pipe fittings, brass hardware fittings, and brass mixer
            grinders</span>. Our diverse product catalog ensures that customers find the
            perfect solution tailored to their needs. Whether it's a small project
            or a large-scale endeavor, we bring the same commitment to quality,
            cost-effectiveness, and customer satisfaction.
          </motion.p>

          {/* Expandable Content with smoother animation */}
          <motion.div
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded ? '1.5rem' : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Paragraph 3 */}
            <p className="mb-6 text-gray-700 leading-relaxed tracking-wide">
              Our <span className="font-medium">state-of-the-art infrastructure</span> is designed to streamline every
              aspect of our operations, from manufacturing and quality assurance
              to material handling and order fulfillment. Skilled and experienced
              professionals manage these processes with precision, while our
              quality control team ensures that every product meets the highest
              standards of excellence.
            </p>

            {/* Paragraph 4 */}
            <p className="text-gray-700 leading-relaxed tracking-wide">
              Guided by <span className="font-medium">strong principles and industry expertise</span>, Shashvat Enterprise has established a unique position in the industry. We are
              dedicated to delivering unparalleled service and exceptional
              products to customers across the nation, fostering long-term
              relationships built on trust and reliability.
            </p>
          </motion.div>
        </div>
        
        {/* Improved read more toggle with pulse animation */}
        <div className="mt-10 flex flex-col items-center">
          <motion.div
            className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300"
            animate={{ 
              rotate: isExpanded ? 180 : 0,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 0.5 },
              scale: { repeat: Infinity, repeatType: "reverse", duration: 2 }
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Lottie animationData={arrowAnimation} loop className="w-12 h-12" />
          </motion.div>
          
          <p className="mt-2 text-sm text-gray-500">
            {isExpanded ? "Show Less" : "Read More About Us"}
          </p>
        </div>
      </div>

      {/* Vision, Mission, and Core Values Section with Improved Card Effects */}
      <div 
        ref={visionMissionRef}
        className="h-full w-full pt-16 p-4 bg-gradient-to-b from-blue-100"
      >
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {/* Vision Card with Improved Floating Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisionMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`rounded-xl bg-white p-6 text-center md:text-left shadow-xl transform transition duration-500 hover:shadow-2xl relative overflow-hidden group ${
              hoveredValue === 'vision' ? 'hover:shadow-teal-200' : ''
            }`}
            onMouseEnter={() => setHoveredValue('vision')}
            onMouseLeave={() => setHoveredValue(null)}
          >
            {/* Background Gradient Animation */}
            <div className="absolute -inset-full h-full w-full bg-gradient-to-r from-teal-100 to-blue-100 opacity-0 group-hover:opacity-40 group-hover:blur-xl transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div
                className="mx-auto md:mx-0 flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg shadow-teal-500/40 group-hover:shadow-teal-500/60"
                style={{
                  transition: 'transform 1s ease, box-shadow 0.5s ease',
                  transform: hoveredValue === 'vision' ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                }}
              >
                <FaEye className="text-white" style={{ fontSize: '2em' }} />
              </div>
              <h1 className="text-darken mb-3 text-2xl font-bold lg:px-14 text-gray-800 relative">
                Vision
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 md:left-14 w-0 h-0.5 bg-teal-500 group-hover:w-20 transition-all duration-300"></span>
              </h1>
              <p className="px-4 md:px-0 text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-base">
                At <span className="font-medium text-teal-700">Shashvat Enterprise</span>, our vision is to be the <span className="font-medium">leading global
                provider</span> of high-quality brass products, recognized for our innovation,
                sustainability, and exceptional customer service. We aim to set industry
                standards through continuous improvement and technological advancements,
                contributing to a more efficient and sustainable future.
              </p>
            </div>
          </motion.div>

          {/* Mission Card with Improved Floating Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisionMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`rounded-xl bg-white p-6 text-center md:text-left shadow-xl transform transition duration-500 hover:shadow-2xl relative overflow-hidden group ${
              hoveredValue === 'mission' ? 'hover:shadow-rose-200' : ''
            }`}
            onMouseEnter={() => setHoveredValue('mission')}
            onMouseLeave={() => setHoveredValue(null)}
          >
            {/* Background Gradient Animation */}
            <div className="absolute -inset-full h-full w-full bg-gradient-to-r from-rose-100 to-pink-100 opacity-0 group-hover:opacity-40 group-hover:blur-xl transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div
                className="mx-auto md:mx-0 flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-rose-600 shadow-lg shadow-rose-500/40 group-hover:shadow-rose-500/60"
                style={{
                  transition: 'transform 1s ease, box-shadow 0.5s ease',
                  transform: hoveredValue === 'mission' ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                }}
              >
                <FaRegHandshake className="text-white" style={{ fontSize: '2em' }} />
              </div>
              <h1 className="text-darken mb-3 text-2xl font-bold lg:px-14 text-gray-800 relative">
                Mission
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 md:left-14 w-0 h-0.5 bg-rose-500 group-hover:w-20 transition-all duration-300"></span>
              </h1>
              <p className="px-4 md:px-0 text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-base">
                Our mission is to deliver <span className="font-medium">superior brass products</span> that meet the diverse
                needs of our customers while maintaining the highest standards of quality
                and craftsmanship. We are committed to fostering long-term relationships
                with our clients by providing reliable, sustainable, and innovative
                solutions. At <span className="font-medium text-rose-600">Shashvat Enterprise</span>, we strive to create value for
                our stakeholders through ethical business practices and a dedication to
                excellence.
              </p>
            </div>
          </motion.div>

          {/* Core Values Card with Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisionMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`rounded-xl bg-white p-6 text-center md:text-left shadow-xl transform transition duration-500 hover:shadow-2xl relative overflow-hidden group ${
              hoveredValue === 'coreValues' ? 'hover:shadow-amber-200' : ''
            }`}
            onMouseEnter={() => setHoveredValue('coreValues')}
            onMouseLeave={() => setHoveredValue(null)}
          >
            {/* Background Gradient Animation */}
            <div className="absolute -inset-full h-full w-full bg-gradient-to-r from-amber-100 to-yellow-100 opacity-0 group-hover:opacity-40 group-hover:blur-xl transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div
                className="mx-auto md:mx-0 flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/40 group-hover:shadow-amber-500/60"
                style={{
                  transition: 'transform 2s ease, box-shadow 0.5s ease',
                  transform: hoveredValue === 'coreValues' ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                }}
              >
                <SiReact className="text-white" style={{ fontSize: '2em' }} />
              </div>
              <h1 className="text-darken mb-3 text-2xl font-bold lg:px-14 text-gray-800 relative">
                Core Values
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 md:left-14 w-0 h-0.5 bg-amber-500 group-hover:w-24 transition-all duration-300"></span>
              </h1>
              <div className="text-left px-4 md:px-0 space-y-3">
                {coreValues.map((value, index) => (
                  <div key={index}>
                    <motion.div
                      className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-amber-50 transition-all duration-300 ${activeValue === `coreValue${index}` ? 'bg-amber-50 shadow-md' : ''}`}
                      onClick={() => toggleCoreValue(index)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img 
                        src={value.icon} 
                        alt={value.title} 
                        className="w-8 h-8 mr-3"
                      />
                      <p className="text-gray-700 font-medium">
                        {value.title}
                      </p>
                      <svg 
                        className={`ml-auto w-5 h-5 text-amber-500 transform transition-transform duration-300 ${activeValue === `coreValue${index}` ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                    
                    {/* Expandable description */}
                    <motion.div
                      animate={{ 
                        height: activeValue === `coreValue${index}` ? 'auto' : 0,
                        opacity: activeValue === `coreValue${index}` ? 1 : 0,
                        marginTop: activeValue === `coreValue${index}` ? '0.5rem' : 0,
                        marginBottom: activeValue === `coreValue${index}` ? '0.5rem' : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pl-12 pr-2 text-sm text-gray-600 rounded-b-lg bg-amber-50/50"
                    >
                      <p className="py-3 text-gray-700 leading-relaxed tracking-wide">{value.description}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

     
      {/* Why Shashvat Section with Advanced Animations */}
     <section 
        ref={whyUsRef}
        className="bg-gradient-to-b from-white to-gray-50 py-24 px-4"
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isWhyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative inline-block tracking-tight">
            Why <span className="text-teal-600">Shashvat</span>
            <motion.span 
              className="absolute bottom-0 left-0 h-1 bg-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={isWhyUsInView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            ></motion.span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore what sets us apart in the industry and why businesses rely on our{' '}
            <span className="text-teal-600 font-medium">precision</span>,{' '}
            <span className="text-teal-600 font-medium">quality</span>, and{' '} 
            <span className="text-teal-600 font-medium">innovation</span>.
          </p>
        </motion.div>

        <div className="container mx-auto max-w-7.5xl mt-16">
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Precision Engineering",
                description: "State-of-the-art machinery ensures high accuracy and superior quality in all our products.",
                icon: <Award className="w-8 h-8 text-teal-500" />,
                image: "https://cdn-icons-png.flaticon.com/128/5439/5439335.png",
                gradient: "from-teal-400 to-blue-500"
              },
              {
                title: "Competitive Pricing",
                description: "Get the best value for your money with high-quality products at affordable rates.",
                icon: <CreditCard className="w-8 h-8 text-purple-500" />,
                image: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png",
                gradient: "from-pink-400 to-purple-500"
              },
              {
                title: "Quick Delivery",
                description: "Reliable logistics ensure your orders are delivered on time, every time.",
                icon: <Truck className="w-8 h-8 text-orange-500" />,
                image: "https://cdn-icons-png.flaticon.com/128/2331/2331970.png",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                title: "Certified Quality",
                description: "Every product undergoes strict quality checks to meet international industry standards.",
                icon: <CheckCircle className="w-8 h-8 text-green-500" />,
                image: "https://cdn-icons-png.flaticon.com/128/1176/1176189.png",
                gradient: "from-green-400 to-lime-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={isWhyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1), ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center mb-5">
                    <div className="mr-4 flex-shrink-0 p-2 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-white transition-colors duration-300">
                      <img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                      {feature.title}
                    </h2>
                  </div>
                  
                  {/* Animated Underline */}
                  <div className="w-12 h-0.5 bg-teal-500 mb-4 transform origin-left group-hover:w-24 transition-all duration-300"></div>
                  
                  <p className="text-gray-600 text-base mt-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Learn more link */}
                  <div className="mt-4 overflow-hidden">
                    <span className="inline-block text-sm font-medium text-teal-600 opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Learn more →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <PopularProduct />
      {/* Add a new testimonials or call-to-action section */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-16">
        <div className="container mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
              Join the countless businesses that trust <span className="text-teal-600 font-medium">Shashvat Enterprise</span> for high-quality brass components and exceptional service.
            </p>
            
            <motion.button 
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <Link to={'/contact'}> Contact Us Today</Link>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Add Typography Improvements */}
   
    </>
  );
};    

export default About;