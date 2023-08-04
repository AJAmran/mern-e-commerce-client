import { useContext, useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    } else if (name === "confirmPassword") {
      checkPasswordMatch(formData.password, value);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = (password) => {
    if (password.length >= 8) {
      setPasswordStrength("Strong");
    } else if (password.length >= 6) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Weak");
    }
    checkPasswordMatch(formData.confirmPassword, password);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const [registrationLoading, setRegistrationLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordMismatch) {
      return;
    }
    setRegistrationLoading(true);
    createUser(formData.email, formData.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(formData.username, formData.photoUrl).then(() => {
          const newUser = {
            name: formData.username,
            email: formData.email,
            imges: formData.photoUrl,
            role: "user",
          };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                setRegistrationLoading(false);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                Navigate("/");
              }
            });
        });
      })
      .catch((error) => {
        setRegistrationLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-gradient-to-r from-blue-200 to-purple-200 shadow-lg"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              Username:
            </label>
            <div className="input-icon">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Your Username"
                className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200 pl-10"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              Email:
            </label>
            <div className="input-icon">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
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
                placeholder="Enter Your Password"
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
            {passwordStrength && (
              <p className="text-sm text-gray-600">{`Password Strength: ${passwordStrength}`}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm Password:
            </label>
            <div className="input-icon">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Your Password"
                className={`border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200 pl-10 ${
                  passwordMismatch ? "border-red-500" : ""
                }`}
                required
              />
              {passwordMismatch && (
                <FaLock className="absolute text-red-500 top-3 left-3" />
              )}
            </div>
            {passwordMismatch && (
              <p className="text-sm text-red-500">Passwords must match</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              Photo URL:
            </label>
            <div className="input-icon">
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Enter Photo URL"
                className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200 pl-10"
                required
              />
            </div>
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
              disabled={registrationLoading} // Disable button during registration
            >
              {registrationLoading ? ( // Conditionally render spinner or text
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Registration;
