import React from 'react'
import logo from '../img/image.png'
import { Link } from 'react-router-dom'

const Fotter = () => {
  return (
    <div>
      <footer className="text-gray-600 bg-blue-100 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-black">
              <img src={logo} className="mr-3" alt="Flowbite Logo" style={{ height: '7em', width: '10em' }} />
            </a>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-lg text-black tracking-widest text-sm mb-3">Import link</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to={'/'} className="text-gray-600 hover:text-orange-500 hover:transform hover:translate-x-1 transition-all duration-300">Shashvat</Link>
                </li>
                <li>
                  <Link to={'/'} className="text-gray-600 hover:text-orange-500 hover:transform hover:translate-x-1 transition-all duration-300">Home</Link>
                </li>
                <li>
                  <Link to={'/contact'} className="text-gray-600 hover:text-orange-500 hover:transform hover:translate-x-1 transition-all duration-300">Contact</Link>
                </li>
                <li>
                  <Link to={'/about'} className="text-gray-600 hover:text-orange-500 hover:transform hover:translate-x-1 transition-all duration-300">About Us</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">Product Part</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">Sanitary parts</Link>
                </li>
                <li>
                  <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">Hardware Parts</Link>
                </li>
                <li>
                  <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300" >Components parts</Link>
                </li>
               
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">Product link</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to={'/products'} className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">Angel Cock</Link>
                </li>
                <li>
                  <Link to={'/products'}  className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">Sanitary parts</Link>
                </li>
                <li>
                  <Link to={'/products'}  className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">Hardware</Link>
                </li>
                <li>
                  <Link to={'/products'}  className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">Brass</Link>
                </li>
              </nav>
            </div>
           
          </div>
        </div>

        <div className="bg-blue" style={{backgroundColor:'#eef9ff'}}>
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-black text-sm text-center sm:text-left">© KamleshBhai Sanghani
              <a href="/" rel="noopener noreferrer" className="text-black ml-1" target="_blank">@Shashvat</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-600 hover:text-sky-500 hover:transform hover:translate-x-1 transition-all duration-300">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-600 hover:text-pink-500 hover:transform hover:translate-x-1 transition-all duration-300">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-600 hover:text-black hover:transform hover:translate-x-1 transition-all duration-300">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Fotter
