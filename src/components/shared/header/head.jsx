import React from "react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaHeadset,
  FaComments,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function Header() {
  return (
    <header className="bg-blue-400 text-white py-2 px-4 md:px-6 lg:px-8 fixed top-0 left-0 w-full flex justify-between items-center">
      {/* Left side links */}
      <div className="flex items-center space-x-6">
        <Link to="/faqs" className="hover:underline flex items-center">
          <FaQuestionCircle className="mr-1" />
          FAQs
        </Link>
        <Link to="/help" className="hover:underline flex items-center">
          <FaHeadset className="mr-1" />
          Help
        </Link>
        <Link to="/support" className="hover:underline flex items-center">
          <FaComments className="mr-1" />
          Support
        </Link>
      </div>

      {/* Right side social links */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-white hover:text-gray-300">
          <FaFacebook />
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <FaTwitter />
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <FaInstagram />
        </a>
      </div>
    </header>
  );
}

export default Header;
