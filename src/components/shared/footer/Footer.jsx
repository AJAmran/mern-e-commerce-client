import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-10 py-8 bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between md:flex-row">
          {/* Footer Section 1 - Company Information */}
          <div className="mb-4 md:w-1/4">
            <h4 className="mb-4 text-lg font-semibold text-gray-800">
              Company
            </h4>
            <ul className="p-0 list-none">
              <li className="mb-2">
                <Link to="/about" className="text-gray-800 hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-gray-800 hover:text-blue-500">
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/terms-of-service"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer Section 2 - Categories */}
          <div className="mb-4 md:w-1/4">
            <h4 className="mb-4 text-lg font-semibold text-gray-800">
              Categories
            </h4>
            <ul className="p-0 list-none">
              <li className="mb-2">
                <Link
                  to="/electronics"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Electronics
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/fashion"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Fashion
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home-decor"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Home & Decor
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home-decor"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Beauty & Personal Care
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home-decor"
                  className="text-gray-800 hover:text-blue-500"
                >
                  Books, Movies & Music
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:w-1/4">
            <h4 className="mb-4 text-lg font-semibold text-gray-800">
              Newsletter
            </h4>
            <p className="text-gray-800">
              Subscribe to our newsletter for updates.
            </p>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-gray-800 rounded-lg rounded-800 bg-gray"
              />
              <button className="px-4 py-2 mt-2 rounded text-gray bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Section 4 - Social Media Links */}
          <div className="md:w-1/4">
            <h4 className="mb-4 text-lg font-semibold text-gray-800">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl text-gray-800 hover:text-blue-500" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl text-gray-800 hover:text-blue-500" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-gray-800 hover:text-blue-500" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaPinterest className="text-2xl text-gray-800 hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
