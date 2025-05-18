import React, { useEffect } from 'react'
import { BiWorld } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import SEO from '../Componets/SEO';
import seoData from '../Componets/Seos';
import { LuFileBadge } from "react-icons/lu";

const Contact = () => {
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  useEffect(() => {
    scrollToTop()
  },[])
  const { title, description, keywords } = seoData.about;
  return (
    <div>
        <SEO title={title} description={description} keywords={keywords}  />
        <section className="relative bg-blue-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/007/067/602/small_2x/businessman-shows-outstretched-hand-with-social-icon-on-virtual-screen-contact-us-free-photo.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8">
            Discover our high-quality brass components, hardware, and sanitary
            parts.
          </p>
        </div>
      </section>  
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Shashvat EnterPrise</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <IoPersonCircleOutline style={{ width: '2em', height: '2em' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Contact Person</h3>
                    <p className="text-gray-600">Mr. KamleshBhai Sanghani</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CiLocationOn style={{ width: '2em', height: '2em' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">Plot No. 3016, G.I.D.C.-Phase III, Dared, Jamnagar, Gujarat-04, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaPhone style={{ width: '2em', height: '2em' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+91 98250 49059</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaPhone style={{ width: '2em', height: '2em' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+91 90997 57588</p>
                  </div>
                </div>
               

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    < MdEmail style={{ width: '2em', height: '2em' }} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">shashvat2019@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <BiWorld style={{ width: '2em', height: '2em' }} />

                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Web Address</h3>
                    <p className="text-gray-600">https://www.shashvatenterprise.com</p>
                  </div>
                </div>


              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Product / Service Looking for</h2>
                <form>
                  <div className="mb-4">
                    <input type="text" placeholder="Product / Service Looking for" className="w-full p-2 border border-gray-300 rounded" required />
                  </div>
                  <div className="mb-4">
                    <textarea placeholder="Describe your requirements" className="w-full p-2 border border-gray-300 rounded h-32" required></textarea>
                  </div>
                  <div className="mb-4">
                    <input type="text" placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded" required />
                  </div>
                  <div className="mb-4">
                    <input type="email" placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded" required />
                  </div>
                  <div className="mb-4">
                    <input type="tel" placeholder="Your Phone Number" className="w-full p-2 border border-gray-300 rounded" required />
                  </div>
                  <div className="flex justify-between items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Submit Inquiry
                    </button>
                    <button type="reset" className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative w-100 h-96 mx-5">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14753.355199898504!2d70.0424243!3d22.4162705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395714caf410c4a7%3A0x68ebc92a77861b0d!2sGIDC%20Phase%20III%2C%20GIDC%20Phase-2%2C%20Dared%2C%20Jamnagar%2C%20Gujarat%20361006!5e0!3m2!1sen!2sin!4v1718983223811!5m2!1sen!2sin" 
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
    </div>
  )
}

export default Contact
