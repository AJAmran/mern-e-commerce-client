import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaHeadset,
  FaComments,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthProvider";

const Header =() =>{
  const { user, logOut } = useContext(AuthContext);

  const signOut = () => {
    logOut();
  };

  const renderAuthenticationButton = () => {
    if (user) {
      return (
        <button onClick={signOut} className="flex items-center hover:underline">
          <FaSignOutAlt className="mr-1" />
          Logout
        </button>
      );
    } else {
      return (
        <Link to="/login" className="flex items-center hover:underline">
          <FaSignInAlt className="mr-1" />
          Login
        </Link>
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-4 py-2 text-white bg-blue-400 md:px-6 lg:px-8">
      {/* Left side links */}
      <div className="flex items-center space-x-6">
        <Link to="/faqs" className="flex items-center hover:underline">
          <FaQuestionCircle className="mr-1" />
          FAQs
        </Link>
        <Link to="/help" className="flex items-center hover:underline">
          <FaHeadset className="mr-1" />
          Help
        </Link>
        <Link to="/support" className="flex items-center hover:underline">
          <FaComments className="mr-1" />
          Support
        </Link>
      </div>

      {/* Right side social links and authentication */}
      <div className="flex items-center ml-1 space-x-4">
        {renderAuthenticationButton()}
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
