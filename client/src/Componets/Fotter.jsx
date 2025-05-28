import React from 'react';
import logo from '../img/image.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 bg-gradient-to-br from-[#f6f3e7] to-[#f0ebe0] body-font relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-sky-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200 rounded-full blur-lg"></div>
        </div>
        
        <div className="container px-5 py-12 mx-auto flex flex-wrap justify-between relative z-10">
          {/* Logo section with enhanced styling */}
          <div className="w-64 flex-shrink-0 mx-auto text-center md:text-left mb-8 md:mb-0">
            <a className="flex title-font font-medium items-center justify-center md:justify-start text-black group">
              <div className="relative p-2">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: '5em', width: '7em' }}
                />
              </div>
            </a>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs mx-auto md:mx-0">
              Quality precious, hardware and sanitary solutions for your needs.
            </p>
          </div>
          
          <div className="flex-grow flex flex-wrap justify-center md:pl-20 -mb-10 md:mt-0 mt-10 gap-8">
            {/* Import Links section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4 min-w-[180px]">
              <div className="relative">
                <h2 className="title-font font-bold text-black tracking-wide text-sm mb-6 relative">
                  Import Links
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
                </h2>
                <nav className="list-none mb-10 space-y-3">
                  <li>
                    <Link to={'/'} className="text-gray-600 hover:text-orange-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-orange-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Shashvat
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'} className="text-gray-600 hover:text-orange-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-orange-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={'/contact'} className="text-gray-600 hover:text-orange-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-orange-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to={'/about'} className="text-gray-600 hover:text-orange-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-orange-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      About Us
                    </Link>
                  </li>
                </nav>
              </div>
            </div>
            
            {/* Product Parts section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4 min-w-[180px]">
              <div className="relative">
                <h2 className="title-font font-bold text-black tracking-wide text-sm mb-6 relative">
                  Product Parts
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-500 to-sky-300 rounded-full"></div>
                </h2>
                <nav className="list-none mb-10 space-y-3">
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Sanitary Parts
                    </Link>
                  </li>
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Hardware Parts
                    </Link>
                  </li>
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Component Parts
                    </Link>
                  </li>
                </nav>
              </div>
            </div>
            
            {/* Product Links section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4 min-w-[180px]">
              <div className="relative">
                <h2 className="title-font font-bold text-black tracking-wide text-sm mb-6 relative">
                  Product Links
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-500 to-sky-300 rounded-full"></div>
                </h2>
                <nav className="list-none mb-10 space-y-3">
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Angel Cock
                    </Link>
                  </li>
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Sanitary Parts
                    </Link>
                  </li>
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Hardware
                    </Link>
                  </li>
                  <li>
                    <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-sky-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Brass
                    </Link>
                  </li>
                </nav>
              </div>
            </div>

            {/* Developers section - NEW */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4 min-w-[180px]">
              <div className="relative">
                <h2 className="title-font font-bold text-black tracking-wide text-sm mb-6 relative">
                  Developers
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"></div>
                </h2>
                <nav className="list-none mb-10 space-y-3">
                  <li>
                    <a href="https://nitportfolio.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Nit Sanghani
                    </a>
                  </li>
                  <li>
                    <a href="https://kishanvyas.tech/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-500 hover:translate-x-2 transition-all duration-300 flex items-center group text-sm font-medium">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                      Kishan Vyas
                    </a>
                  </li>
                  <li>
                    <div className="text-gray-500 text-xs font-medium mt-4 p-3 bg-white/30 rounded-lg backdrop-blur-sm border border-white/20">
                      <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>Created with ❤️</span>
                      </div>
                      <p className="text-xs leading-relaxed">
                        Crafted by passionate developers dedicated to modern web solutions
                      </p>
                    </div>
                  </li>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with glassmorphism effect */}
        <div className="bg-white/40 backdrop-blur-md border-t border-white/20 py-6">
          <div className="container mx-auto px-5">
            {/* Main copyright and social section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <p className="text-gray-700 text-sm text-center sm:text-left mb-4 sm:mb-0 font-medium">
                ©2025 Shashvat Enterprise
                <a href="/" className="text-gray-800 ml-1 hover:text-orange-500 transition-colors duration-300 font-semibold" target="_blank" rel="noopener noreferrer">@KamleshBhai Sanghani</a>
              </p>
              <div className="flex justify-center sm:justify-start space-x-4">
                <a className="text-gray-600 hover:text-sky-500 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-600 hover:text-sky-500 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-600 hover:text-pink-500 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="text-gray-600 hover:text-black hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Developer credits section */}
            <div className="border-t border-white/20 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                <div className="flex items-center mb-2 sm:mb-0">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  <span>Developed & Designed by</span>
                </div>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://nitportfolio.pages.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-500 transition-colors duration-300 font-medium"
                  >
                    Nit Sanghani
                  </a>
                  <span className="text-gray-400">•</span>
                  <a 
                    href="https://kishanvyas.tech/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-500 transition-colors duration-300 font-medium"
                  >
                    Kishan Vyas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;