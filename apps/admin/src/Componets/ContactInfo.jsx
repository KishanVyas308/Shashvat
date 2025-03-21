import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdPhone, MdLocationOn } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { FaFileInvoice, FaWhatsapp } from 'react-icons/fa';

const ContactInfo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    sendCopy: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const contactItems = [
    { icon: <FaFileInvoice />, title: "GST NO", value: "24BHIPS7190F1Z1" },
    { icon: <MdPhone />, title: "Contact no", value: "+91 9825049059" },
    { icon: <IoMdMail />, title: "Email id", value: "shashvat2019@gmail.com" },
    { icon: <FaWhatsapp />, title: "Business WhatsApp no", value: "9099757588" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      setIsSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <h4 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h4>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <div className="text-red-600 mt-1">{errors.name}</div>}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <div className="text-red-600 mt-1">{errors.email}</div>}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.message && <div className="text-red-600 mt-1">{errors.message}</div>}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="sendCopy"
                    checked={formData.sendCopy}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-600">Send me a copy of this message</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          <div>
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="bg-blue-100 rounded-full p-3 mr-4 text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">{item.title}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14753.355199898504!2d70.0424243!3d22.4162705!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395714caf410c4a7%3A0x68ebc92a77861b0d!2sGIDC%20Phase%20III%2C%20GIDC%20Phase-2%2C%20Dared%2C%20Jamnagar%2C%20Gujarat%20361006!5e0!3m2!1sen!2sin!4v1718983223811!5m2!1sen!2sin"
                width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
