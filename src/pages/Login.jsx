import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha} from "react-simple-captcha";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const { user, loading, signIn, googleSignIn, logOut, updateUserProfile } =
  useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    let user_captcha_value =
      document.getElementById("user_captcha_input").value;

    if (validateCaptcha(user_captcha_value) == true) {
      alert("Captcha Matched");
    } else {
      alert("Captcha Does Not Match");
    }

    signIn(formData.email, formData.password)
    .then(result=>{
      const user = result.user;
      console.log(user);
      toast.success("Login Successful")
    })
    .catch((error)=>{
      console.log(error);
    })


  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-gradient-to-r from-blue-200 to-purple-200 shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              Email:
            </label>
            <div className="input-icon">
              <input
                type="email"
                name="email"
                value={formData.email}
                defaultValue={user?.email}
                onChange={handleChange}
                placeholder="Please Enter Your Email"
                className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200 pl-10"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              Password:
            </label>
            <div className="input-icon">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please Enter Your Password"
                className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200 pl-10"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute text-gray-500 top-10 right-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <LoadCanvasTemplate />
            <input
              id="user_captcha_input"
              type="text"
              placeholder="Enter Captcha"
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
              required
            />
          </div>
          <div>
            <motion.button
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #4A9FFD, #0066CC)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-500 py-2 px-4 rounded-lg text-white font-semibold w-full transition-colors"
            >
              Login
            </motion.button>
          </div>
          <div>
            {/* Attractive Google Login Button */}
            <button className="btn-google w-full py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center">
              <span className="mr-2">
                <FaGoogle size={20} />
              </span>
              Sign up with Google
            </button>
          </div>
        </form>
        <div className="pt-3 pl-1">
          <p>
            New to our platform{" "}
            <Link to="/registration" className="text-blue-900 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
