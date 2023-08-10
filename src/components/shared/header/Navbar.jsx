import { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "axios";
import useCart from "../../../hook/useCart";

function Navbar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [cart] = useCart();

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/add-product", label: "Add Product" },
    { path: "/contract", label: "Contract" },
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Furniture",
    "Beauty & Personal Care",
    "Books, Movies & Music",
    "Health & Wellness",
  ];

  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-200 to-purple-200 z-10">
      <div className="container mx-auto">
        <nav className="text-gray-800 flex justify-between items-center py-4 px-6 lg:px-10 mt-10">
          <Link to='/' className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-semibold text-blue-500">
              TrendHaven
            </span>
          </Link>

          <div className="flex-grow mx-4 hidden lg:block xl:block max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex items-center space-x-2 relative group lg:hidden">
            <FaBars
              className="text-3xl text-gray-800 cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>

          {/* Regular navigation links for larger screens */}
          <div className="hidden lg:flex items-center space-x-2">
            {user && user.photoURL && (
              <Link to="/account" title={user.displayName}>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              </Link>
            )}
           <Link to="/cart" className="relative">
                <FaShoppingCart className="text-3xl text-purple-500 cursor-pointer hover:scale-110" />
                <div className="absolute -top-3 right-0 bg-blue-500 text-white rounded-full w-6 h-6 text-xs flex justify-center items-center">
                {cart.length > 0 && <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>}
                </div>
              </Link>
          </div>
        </nav>
        <div className="hidden lg:block xl:block">
          <div className="flex items-center justify-between py-4 pl-10 pr-8 gap-2">
            <div className="relative mb-2 w-1/3">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="cursor-pointer focus:outline-none"
              >
                Categories
              </button>
              {showCategories && (
                <div className="absolute mt-2 py-2 px-4 bg-gradient-to-r from-blue-300 to-purple-200 rounded shadow-md w-full">
                  {categories.map((category, index) => (
                    <Link
                      to={`/category/${category}`}
                      key={index}
                      className="block py-1 hover:text-purple-500"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path ? "text-purple-500" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 pt-2 px-4 shadow-md lg:hidden flex flex-col items-center justify-start">
            {/* Categories dropdown */}
            <div className="flex-grow mx-4 max-w-md mb-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="relative w-full mb-2">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="cursor-pointer focus:outline-none w-full mx-auto"
              >
                Categories
              </button>
              {showCategories && (
                <div className="absolute mt-2 py-2 px-4 bg-gradient-to-r from-blue-300 to-purple-200 rounded shadow-md">
                  {categories.map((category, index) => (
                    <Link
                      to={`/category/${category}`}
                      key={index}
                      className="block py-1 hover:text-purple-500"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation links */}
            <div className="flex flex-col items-center space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path ? "text-purple-500" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 items-center space-x-2 mt-2">
              {user && user.photoURL && (
                <Link to="/account" title={user.displayName}>
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 mb-2"
                  />
                </Link>
              )}
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-3xl text-purple-500 cursor-pointer hover:scale-110 mb-4" />
                <div className="absolute -top-3 right-0 bg-blue-500 text-white rounded-full w-6 h-6 text-xs flex justify-center items-center">
                {cart.length > 0 && <span className="cart-count"> {cart.reduce((total, item) => total + item.quantity, 0)}</span>}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
