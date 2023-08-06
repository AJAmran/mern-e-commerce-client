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

function Header() {
  const { user, logOut } = useContext(AuthContext);

  const signOut = () => {
    logOut();
  };

  const renderAuthenticationButton = () => {
    if (user) {
      return (
        <button onClick={signOut} className="hover:underline flex items-center">
          <FaSignOutAlt className="mr-1" />
          Logout
        </button>
      );
    } else {
      return (
        <Link to="/login" className="hover:underline flex items-center">
          <FaSignInAlt className="mr-1" />
          Login
        </Link>
      );
    }
  };

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

      {/* Right side social links and authentication */}
      <div className="flex items-center space-x-4">
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
