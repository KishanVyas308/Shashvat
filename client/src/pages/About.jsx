import React, { useEffect, useState } from 'react';
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import { SiReact } from "react-icons/si";
import { FaRegHandshake } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const About = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    scrollToTop()
  }, [])

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
      <br />

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>

            <div className="text-gray-700 text-lg leading-relaxed mb-6">
              <p>
                Located in Jamnagar (Gujarat), <strong>Shashvat Brass Industries</strong> is one of the top manufacturers and suppliers of brass products in India.
                The company started its operation in the year 1998 and now, it is working on a large scale supplying its products to every corner of the nation.
                We are in this industry for more than 2 decades and have mastered every single aspect of our business. We are capable of understanding the exact
                requirements of our customers and fulfilling them in the best way possible.
              </p>
              <p className="mt-4">
                At Shashvat Brass Industries, we offer world-class brass flare fittings, brass anchors, brass inserts, brass pipe fittings, brass hardware fittings,
                brass mixer grinders, and many more. With a wide assortment of brass products, we have made it easy for our customers to choose the suitable one as per their requirements.
                Shashvat Brass Industries is uniquely positioned to handle small projects as well as big projects with the same level of attention to client requirements,
                cost-effectiveness, and quality.
              </p>
              <p className="mt-4">
                We have a state-of-the-art infrastructure where all of our business activities including manufacturing, quality analysis, material handling, warehousing,
                order fulfillment, etc. are adroitly managed by our skilled and experienced employees. Our quality control experts conduct strict quality checks of our
                manufactured products. They work with utmost sincerity to bring products with zero manufacturing defects.
              </p>
              <p className="mt-4">
                Our company's guiding principles and our industry expertise allow us to grow successfully establishing a distinct place in the industry.
                We ensure to serve all of our customers across the nation with the special attention they deserve.
              </p>
            </div>
            <div className="overflow-x-auto mx-4 sm:mx-6 lg:mx-20">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
    <tbody>
      <tr className="bg-gray-100 hover:bg-gray-200 transition duration-200">
        <th className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200">
          Nature of Business
        </th>
        <td className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          Manufacturers, Wholesaler, Trader
        </td>
      </tr>
      <tr className="hover:bg-gray-200 transition duration-200">
        <th className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200">
          Number of Employees
        </th>
        <td className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          12
        </td>
      </tr>
      <tr className="bg-gray-100 hover:bg-gray-200 transition duration-200">
        <th className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200">
          Year of Establishment
        </th>
        <td className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          1989
        </td>
      </tr>
      <tr className="hover:bg-gray-200 transition duration-200">
        <th className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200">
          Market Covered
        </th>
        <td className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          India
        </td>
      </tr>
      <tr className="bg-gray-100 hover:bg-gray-200 transition duration-200">
        <th className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200">
          Name of Founder
        </th>
        <td className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          Mr. KamleshBhai Sanghani
        </td>
      </tr>
      <tr className="hover:bg-gray-200 transition duration-200">
        <th className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200">
          GST No
        </th>
        <td className="w-1/2 py-4 px-4 sm:px-6 text-left text-xs sm:text-sm text-gray-700 border-b border-gray-200">
          24BHIPS7I90FIZI
        </td>
      </tr>
    </tbody>
  </table>
</div>

          </div>
        </div>
      </section>

      <div className="h-full w-full pt-12 p-4" style={{ backgroundColor: '#eef9ff', borderRadius: '2em' }}>
        <div className="grid gap-14 md:grid-cols-3 md:gap-5">
          {/* Vision Card */}
          <div className={`rounded-xl bg-white p-6 text-center shadow-xl transform transition duration-300 ${hoveredValue === 'vision' ? 'hovered-card' : ''}`}
            onMouseEnter={() => setHoveredValue('vision')}
            onMouseLeave={() => setHoveredValue(null)}>
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
              <FaEye style={{ fontSize: '2em' }} />
            </div>
            <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Vision</h1>
            <p className="px-4 text-gray-500">
              At Shashvat Brass Industries, our vision is to be the leading global provider of high-quality brass products, recognized for our innovation, sustainability, and exceptional customer service. We aim to set industry standards through continuous improvement and technological advancements, contributing to a more efficient and sustainable future.
            </p>
          </div>

          {/* Mission Card */}
          <div className={`rounded-xl bg-white p-6 text-center shadow-xl transform transition duration-300 ${hoveredValue === 'mission' ? 'hovered-card' : ''}`}
            onMouseEnter={() => setHoveredValue('mission')}
            onMouseLeave={() => setHoveredValue(null)}>
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
              <FaRegHandshake style={{ fontSize: '2em' }} />
            </div>
            <h1 className="text-darken mb-3  text-xl font-medium lg:px-14">Mission</h1>
            <p className="px-4 text-gray-500">
              Our mission is to deliver superior brass products that meet the diverse needs of our customers while maintaining the highest standards of quality and craftsmanship. We are committed to fostering long-term relationships with our clients by providing reliable, sustainable, and innovative solutions. At Shashvat Brass Industries, we strive to create value for our stakeholders through ethical business practices and a dedication to excellence.
            </p>
          </div>

          {/* Core Values Card */}
          <div className={`rounded-xl bg-white p-6 text-center shadow-xl transform transition duration-300 ${hoveredValue === 'coreValues' ? 'hovered-card' : ''}`}
            onMouseEnter={() => setHoveredValue('coreValues')}
            onMouseLeave={() => setHoveredValue(null)}>
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-amber-400 shadow-lg shadow-amber-500/40">
              <SiReact style={{ fontSize: '2em' }} />
            </div>
            <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">Core Values</h1>
            <div className="text-left px-4">
              {coreValues.map((value, index) => (
                <div key={index} className={`${index !== 0 ? 'mt-4' : ''}`}>
                  <p className="text-gray-500 font-semibold cursor-pointer"
                    onMouseEnter={() => setHoveredValue(`coreValue${index}`)}
                    onMouseLeave={() => setHoveredValue(null)}>
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

      <section className="text-gray-700 body-font">
        <div className="flex justify-center mt-10 text-4xl font-regular">
          Why Shashvat?
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap text-center justify-center">
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp"
                    className="w-32 mb-3"
                    alt="Latest Milling Machinery"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Latest Milling Machinery</h2>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp"
                    className="w-32 mb-3"
                    alt="Reasonable Rates"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Reasonable Rates</h2>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp"
                    className="w-32 mb-3"
                    alt="Time Efficiency"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Time Efficiency</h2>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp"
                    className="w-32 mb-3"
                    alt="Expertise in Industry"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Expertise in Industry</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default About;

