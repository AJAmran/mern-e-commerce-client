import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../../assets/images/logo.png';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 flex justify-between items-center py-4 px-6 lg:px-10 shadow-md mt-10">
      {/* Left side (Logo and Website Name) */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="text-2xl font-semibold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          TrendHaven
        </span>
      </div>

      {/* Middle (Search Box) */}
      <div className="flex-grow mx-4 max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Right side (Cart Icon) */}
      <div className="flex items-center space-x-2 relative group">
        <FaShoppingCart className="text-3xl text-purple-500" />
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 text-xs flex justify-center items-center group-hover:block transition-all">
          {/* Show a cart badge, e.g., item count */}
          3
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
