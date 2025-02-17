import React, { useEffect, useState } from 'react';
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import { SiReact } from "react-icons/si";
import { FaRegHandshake } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Lottie from 'lottie-react';
import { motion } from "framer-motion";
import arrowAnimation from "../Animation - 1739605311778.json"; 
const About = () => {
  /**
   * Scrolls the window to the top of the page with a smooth animation.
   */
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    scrollToTop()
  }, [])
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const { title, description, keywords } = seoData.about;

  const [hoveredValue, setHoveredValue] = useState(null);

  const coreValues = [
    {
      title: 'Quality',
      description: 'We are dedicated to manufacturing brass products that meet the highest standards of quality and performance. Our commitment to excellence ensures that our customers receive products they can trust.',
    },
    {
      title: 'Innovation',
      description: 'We believe in continuous improvement and embrace technological advancements to enhance our manufacturing processes and product offerings. Innovation drives our growth and success in a competitive market.',
    },
    {
      title: 'Sustainability',
      description: 'We prioritize sustainable practices in all aspects of our business. From sourcing raw materials to production and delivery, we aim to minimize our environmental impact and promote a greener future.',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Our customers are at the heart of everything we do. We strive to exceed their expectations by understanding their needs and delivering products and services that add value to their operations.',
    },
    {
      title: 'Integrity',
      description: 'We conduct our business with the highest ethical standards, ensuring transparency, honesty, and fairness in all our dealings. Integrity guides our decisions and actions, building trust with our clients and partners.',
    },
    {
      title: 'Teamwork',
      description: 'We believe in the power of collaboration and teamwork. Our diverse and talented workforce works together to achieve common goals, fostering a supportive and inclusive work environment.',
    },
  ];

  return (
    <>
      <SEO title={title} description={description} keywords={keywords} />


      <section className="relative bg-blue-800 text-white" style={{height:'45vh'}}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/050/680/704/small_2x/skilled-workers-performing-metal-fabrication-and-welding-in-a-modern-manufacturing-facility-photo.jpg')",
              height:'45vh'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-4">Premium Brass Solutions</h1>
          <p className="text-xl mb-8">
            Discover our high-quality brass components, hardware, and sanitary
            parts.
          </p>
        </div>
      </section>

      <div className="bg-gradient-to-r from-white to-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-teal-500 inline-block">
          About Us
        </h1>
        <div className="text-gray-800 text-lg leading-8 space-y-6">
          {/* Paragraph 1 */}
          <p>
            Located in Jamnagar (Gujarat),{" "}
            <strong className="text-teal-600">Shashvat Brass Industries</strong>{" "}
            is one of the top manufacturers and suppliers of brass products in
            India. Established in 2019, the company has grown into a large-scale
            operation, delivering products across the nation. With over two
            decades of experience, we have honed our expertise to meet and exceed
            customer expectations with precision and excellence.
          </p>

          {/* Paragraph 2 */}
          <p>
            At Shashvat Brass Industries, we offer a wide range of high-quality
            products including brass flare fittings, brass anchors, brass inserts,
            brass pipe fittings, brass hardware fittings, and brass mixer
            grinders. Our diverse product catalog ensures that customers find the
            perfect solution tailored to their needs. Whether it’s a small project
            or a large-scale endeavor, we bring the same commitment to quality,
            cost-effectiveness, and customer satisfaction.
          </p>

          {/* Expandable Content */}
          <div
            className={`transition-all duration-500 overflow-hidden ${isExpanded ? "max-h-screen" : "max-h-0"
              }`}
          >
            {/* Paragraph 3 */}
            <p>
              Our state-of-the-art infrastructure is designed to streamline every
              aspect of our operations, from manufacturing and quality assurance
              to material handling and order fulfillment. Skilled and experienced
              professionals manage these processes with precision, while our
              quality control team ensures that every product meets the highest
              standards of excellence.
            </p>

            {/* Paragraph 4 */}
            <p>
              Guided by strong principles and industry expertise, Shashvat Brass
              Industries has established a unique position in the industry. We are
              dedicated to delivering unparalleled service and exceptional
              products to customers across the nation, fostering long-term
              relationships built on trust and reliability.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center">
      {/* Clickable Circular Lottie Icon */}
      <motion.div
        className="cursor-pointer flex items-center justify-center w-15 h-15 rounded-full bg-gray-200 shadow-lg hover:bg-gray-300 transition-all duration-300"
        animate={{ rotate: isExpanded ? 180 : 0 }} // Rotate animation
        transition={{ duration: 0.5 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Lottie animationData={arrowAnimation} loop className="w-12 h-12" />
      </motion.div>

      {/* Expanding Content */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} // Hidden state
        animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }} // Fade & slide animation
        transition={{ duration: 0.5 }}
        className={`overflow-hidden transition-all ${
          isExpanded ? "max-h-96" : "max-h-0"
        } w-full`}
      >
      
      </motion.div>
    </div>

      </div>

      <div className="h-full w-full pt-12 p-4 bg-gradient-to-b from-blue-100">
  <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
    {/* Vision Card */}
    <div
      className={`rounded-xl bg-white p-6 text-center md:text-left shadow-xl transform transition duration-300 ${
        hoveredValue === 'vision' ? 'hovered-card' : ''
      }`}
      onMouseEnter={() => setHoveredValue('vision')}
      onMouseLeave={() => setHoveredValue(null)}
    >
      <div
        className="mx-auto md:mx-0 flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40"
        style={{
          transition: 'transform 1s ease',
          transform: hoveredValue === 'vision' ? 'rotate(360deg)' : 'rotate(0deg)',
        }}
      >
        <FaEye style={{ fontSize: '2em' }} />
      </div>
      <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Vision</h1>
      <p className="px-4 md:px-0 text-gray-500">
        At Shashvat Brass Industries, our vision is to be the leading global
        provider of high-quality brass products, recognized for our innovation,
        sustainability, and exceptional customer service. We aim to set industry
        standards through continuous improvement and technological advancements,
        contributing to a more efficient and sustainable future.
      </p>
    </div>

    {/* Mission Card */}
    <div
      className={`rounded-xl bg-white p-6 text-center md:text-left shadow-xl transform transition duration-300 ${
        hoveredValue === 'mission' ? 'hovered-card' : ''
      }`}
      onMouseEnter={() => setHoveredValue('mission')}
      onMouseLeave={() => setHoveredValue(null)}
    >
      <div
        className="mx-auto md:mx-0 flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40"
        style={{
          transition: 'transform 1s ease',
          transform: hoveredValue === 'mission' ? 'rotate(360deg)' : 'rotate(0deg)',
        }}
      >
        <FaRegHandshake style={{ fontSize: '2em' }} />
      </div>
      <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Mission</h1>
      <p className="px-4 md:px-0 text-gray-500">
        Our mission is to deliver superior brass products that meet the diverse
        needs of our customers while maintaining the highest standards of quality
        and craftsmanship. We are committed to fostering long-term relationships
        with our clients by providing reliable, sustainable, and innovative
        solutions. At Shashvat Brass Industries, we strive to create value for
        our stakeholders through ethical business practices and a dedication to
        excellence.
      </p>
    </div>

    {/* Core Values Card */}
    <div
      className={`rounded-xl bg-white p-6 text-center md:text-left shadow-xl transform transition duration-300 ${
        hoveredValue === 'coreValues' ? 'hovered-card' : ''
      }`}
      onMouseEnter={() => setHoveredValue('coreValues')}
      onMouseLeave={() => setHoveredValue(null)}
    >
      <div
        className="mx-auto md:mx-0 flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-amber-400 shadow-lg shadow-amber-500/40"
        style={{
          transition: 'transform 2s ease',
          transform: hoveredValue === 'coreValues' ? 'rotate(360deg)' : 'rotate(0deg)',
        }}
      >
        <SiReact style={{ fontSize: '2em' }} />
      </div>
      <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Core Values</h1>
      <div className="text-left px-4 md:px-0">
        {coreValues.map((value, index) => (
          <div key={index} className={`${index !== 0 ? 'mt-4' : ''}`}>
            <p
              className="text-gray-500 font-semibold cursor-pointer"
              onMouseEnter={() => setHoveredValue(`coreValue${index}`)}
              onMouseLeave={() => setHoveredValue(null)}
            >
              {index + 1}) {value.title}
            </p>
            {hoveredValue === `coreValue${index}` && (
              <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-left max-w-md mt-2">
                <h2 className="font-bold">{value.title}</h2>
                <p className="text-gray-600 mt-2">{value.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
      <section className="bg-gradient-to-b from-white to-gray-100 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            Why <span className="text-teal-500">Shashvat?</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes us stand out in the industry and why our customers trust us for excellence and reliability.
          </p>
        </div>

        <div className="container mx-auto px-6 mt-12">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group relative text-center transform transition duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-20 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <img
                  src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp"
                  alt="Latest Milling Machinery"
                  className="w-21 h-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  Latest Milling Machinery
                </h2>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative text-center transform transition duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-20 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <img
                  src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp"
                  alt="Reasonable Rates"
                  className="w-21 h-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">Reasonable Rates</h2>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative text-center transform transition duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <img
                  src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp"
                  alt="Time Efficiency"
                  className="w-21 h-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">Time Efficiency</h2>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative text-center transform transition duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-lime-500 opacity-20 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <img
                  src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp"
                  alt="Expertise in Industry"
                  className="w-21 h-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">Expertise in Industry</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default About;

