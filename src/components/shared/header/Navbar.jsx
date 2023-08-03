import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 py-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="text-white text-2xl font-bold">
            <Link to="/">E-Commerce</Link>
          </div>

          {/* Search Bar */}
          <div className={`w-2/3 md:w-1/3 hidden md:flex md:items-center md:space-x-4`}>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Menu and Cart */}
          <div className="md:w-1/3 md:flex items-center space-x-4">
            {/* Menu Links (Hidden on small screens) */}
            <div className={`md:flex items-center space-x-6 hidden ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
              <NavLink
                to="/"
                exact
                className="text-white text-lg hover:underline"
                activeClassName="underline"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="text-white text-lg hover:underline"
                activeClassName="underline"
              >
                Products
              </NavLink>
              <NavLink
                to="/categories"
                className="text-white text-lg hover:underline"
                activeClassName="underline"
              >
                Categories
              </NavLink>
              {/* Add other menu links as needed */}
            </div>

            {/* Cart Icon (Hidden on small screens) */}
            <div className={`md:flex items-center space-x-4 hidden ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
              {/* Add the cart icon with a Link to the cart page */}
              <NavLink
                to="/cart"
                className="text-white text-2xl hover:underline"
                activeClassName="underline"
              >
                <FaShoppingCart />
              </NavLink>
            </div>

            {/* Hamburger Menu (Visible on small screens) */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white">
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content (Hidden by default) */}
        {isMobileMenuOpen && (
          <div className="mt-2 w-full md:w-40 origin-top-right absolute right-0 z-50">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">

              {/* Search Bar */}
              <div className="w-full px-4 py-2 rounded-md  text-gray-800 focus:outline-none focus:ring focus:border-blue-300">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Mobile Menu Links */}
              <NavLink
                to="/"
                exact
                className="block px-4 py-2 text-gray-800 text-lg hover:bg-gray-100"
                activeClassName="underline"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="block px-4 py-2 text-gray-800 text-lg hover:bg-gray-100"
                activeClassName="underline"
                onClick={closeMobileMenu}
              >
                Products
              </NavLink>
              <NavLink
                to="/categories"
                className="block px-4 py-2 text-gray-800 text-lg hover:bg-gray-100"
                activeClassName="underline"
                onClick={closeMobileMenu}
              >
                Categories
              </NavLink>
              {/* Add other menu links as needed */}
              <div className="ml-4 pb-2">
              {/* Add the cart icon with a Link to the cart page */}
              <NavLink
                to="/cart"
                className="text-white text-2xl hover:underline"
                activeClassName="underline"
              >
                <FaShoppingCart />
              </NavLink>
            </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
