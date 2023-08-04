import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 flex justify-between items-center py-4 px-6 lg:px-10 relative">
      {/* Left side (Categories) */}
      <div className="flex space-x-4 relative z-10">
        <div className="relative group">
          <button
            className="flex items-center hover:text-blue-500 transition-colors"
            onClick={toggleMobileMenu}
          >
            Categories <FaAngleDown className="ml-1 text-sm" />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute mt-2 bg-white text-gray-800 border rounded-md shadow-md z-20 w-64">
              {/* Nested Dropdown menu items */}
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                  <Link to="/categories/all" onClick={closeMobileMenu}>
                    All Categories
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 transition-colors relative">
                  <Link to="/categories/electronics" onClick={closeMobileMenu}>
                    Electronics
                  </Link>
                  <FaAngleDown className="absolute right-2 top-2 text-xs" />
                  <ul className="py-2 absolute left-64 top-0 bg-white text-gray-800 border-l border-t border-r border-gray-300">
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link
                        to="/categories/computers"
                        onClick={closeMobileMenu}
                      >
                        Computers & Laptops
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link
                        to="/categories/mobile-phones"
                        onClick={closeMobileMenu}
                      >
                        Mobile Phones & Accessories
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link to="/categories/cameras" onClick={closeMobileMenu}>
                        Cameras & Photography
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link to="/categories/audio" onClick={closeMobileMenu}>
                        Audio & Headphones
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link
                        to="/categories/wearable-tech"
                        onClick={closeMobileMenu}
                      >
                        Wearable Technology
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 transition-colors relative">
                  <Link to="/categories/fashion" onClick={closeMobileMenu}>
                    Fashion
                  </Link>
                  <FaAngleDown className="absolute right-2 top-2 text-xs" />
                  <ul className="py-2 absolute left-64 top-0 bg-white text-gray-800 border-l border-t border-r border-gray-300">
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link to="/categories/clothing" onClick={closeMobileMenu}>
                        Clothing
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link to="/categories/shoes" onClick={closeMobileMenu}>
                        Shoes
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link
                        to="/categories/accessories"
                        onClick={closeMobileMenu}
                      >
                        Accessories
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link to="/categories/jewelry" onClick={closeMobileMenu}>
                        Jewelry
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 transition-colors">
                      <Link to="/categories/watches" onClick={closeMobileMenu}>
                        Watches
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* Add more main categories here */}
                {/* Add other main categories and their subcategories similarly */}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Middle (Navigation) */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link
          to="/"
          className="hover:text-blue-500 transition-colors"
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="hover:text-blue-500 transition-colors"
          onClick={closeMobileMenu}
        >
          Shop
        </Link>
        <Link
          to="/add-product"
          className="hover:text-blue-500 transition-colors"
          onClick={closeMobileMenu}
        >
          Add Product
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-500 transition-colors"
          onClick={closeMobileMenu}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default MainNavbar;
