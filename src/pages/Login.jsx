import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";

const LoginForm = () => {
  const { user, signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user_captcha_value =
      document.getElementById("user_captcha_input").value;

    if (validateCaptcha(user_captcha_value)) {
      try {
        const result = await signIn(formData.email, formData.password);
        const user = result.user;
        console.log(user);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      setCaptchaError("Captcha doesn't match");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-purple-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 shadow-md bg-gradient-to-r from-blue-200 to-purple-200"
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Password:
            </label>
            <div className="input-ico">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please Enter Your Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
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
            <p className="text-red-500">{captchaError}</p>
            <input
              id="user_captcha_input"
              type="text"
              placeholder="Enter Captcha"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
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
              className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-500"
            >
              Login
            </motion.button>
          </div>
          <div>
            {/* Google Login Button */}
            <button className="flex items-center justify-center w-full py-2 font-semibold text-white transition-colors bg-blue-500 rounded-lg btn-google hover:bg-blue-600">
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
            <Link to="/registration" className="font-semibold text-blue-900">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
