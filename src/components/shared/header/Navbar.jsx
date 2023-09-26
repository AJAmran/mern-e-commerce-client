import { useContext, useState } from "react";
import { FaShoppingCart, FaBars, FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../context/AuthProvider";
import useCart from "../../../hook/useCart";

function Navbar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [cart] = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

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
    <div className="z-10 bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between px-6 py-4 mt-10 text-gray-800 lg:px-10">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-semibold text-blue-500">
              TrendHaven
            </span>
          </Link>

          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-gray-800 bg-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-4 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              <FaSearch />
            </button>
          </div>

          <div className="relative flex items-center space-x-2 group lg:hidden">
            <FaBars
              className="text-3xl text-gray-800 cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>

          {/* Regular navigation links for larger screens */}
          <div className="items-center hidden space-x-2 lg:flex">
            {user && user.photoURL && (
              <Link to="/account" title={user.displayName}>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 transition-transform duration-300 rounded-full cursor-pointer hover:scale-110"
                />
              </Link>
            )}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-3xl text-purple-500 cursor-pointer hover:scale-110" />
              <div className="absolute right-0 flex items-center justify-center w-6 h-6 text-xs text-white bg-blue-500 rounded-full -top-3">
                {cart.length > 0 && (
                  <span className="cart-count">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </nav>
        <div className="hidden lg:block xl:block">
          <div className="flex items-center justify-between gap-2 py-4 pl-10 pr-8">
            <div className="relative w-1/3 mb-2">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="cursor-pointer focus:outline-none"
              >
                Categories
              </button>
              {showCategories && (
                <div className="absolute w-full px-4 py-2 mt-2 rounded shadow-md bg-gradient-to-r from-blue-300 to-purple-200">
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
          <div className="flex flex-col items-center justify-start px-4 pt-2 text-gray-800 shadow-md bg-gradient-to-r from-blue-200 to-purple-200 lg:hidden">
            {/* Categories dropdown */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 text-gray-800 bg-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                <FaSearch />
              </button>
            </div>
            <div className="relative w-full mb-2">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full mx-auto cursor-pointer focus:outline-none"
              >
                Categories
              </button>
              {showCategories && (
                <div className="absolute px-4 py-2 mt-2 rounded shadow-md bg-gradient-to-r from-blue-300 to-purple-200">
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
            <div className="flex flex-col items-center gap-2 mt-2 space-x-2">
              {user && user.photoURL && (
                <Link to="/account" title={user.displayName}>
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 mb-2 transition-transform duration-300 rounded-full cursor-pointer hover:scale-110"
                  />
                </Link>
              )}
              <Link to="/cart" className="relative">
                <FaShoppingCart className="mb-4 text-3xl text-purple-500 cursor-pointer hover:scale-110" />
                <div className="absolute right-0 flex items-center justify-center w-6 h-6 text-xs text-white bg-blue-500 rounded-full -top-3">
                  {cart.length > 0 && (
                    <span className="cart-count">
                      {" "}
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
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
