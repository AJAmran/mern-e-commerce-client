import { useContext, useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Registration = () => {
  const [error, setError] = useState("")
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "confirmPassword") {
      checkPasswordMatch(formData.password, value);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

 

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
    formData.password
  );
  

  const [registrationLoading, setRegistrationLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (passwordMismatch || !isPasswordValid) {
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
          fetch("https://e-commerce-backend-ajamran.vercel.app/users", {
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
                toast.success('Successfully account created!')
                navigate("/");
              }
              else{
                setRegistrationLoading(false);
              }
            });
        });
      })
      .catch((error) => {
        setRegistrationLoading(false);
        setError(error.message)
      });
      setError('');
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-purple-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 shadow-lg bg-gradient-to-r from-blue-200 to-purple-200"
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Username:
            </label>
            <div className="input-icon">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Your Username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Email:
            </label>
            <div className="input-icon">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
                required
              />
            </div>
          </div>
          <div className="relative">
  <label className="block mb-1 font-semibold text-gray-700">
    Password:
  </label>
  <div className="input-icon">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter Your Password"
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
  {formSubmitted && !isPasswordValid && formData.password.trim() !== "" && (
    <p className="text-sm text-red-500">
      Password must have at least 6 characters, 1 capital and small letter, one number, and one special character.
    </p>
  )}
</div>
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Confirm Password:
            </label>
            <div className="input-icon">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Your Password"
                className={`border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200 ${
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
            <label className="block mb-1 font-semibold text-gray-700">
              Photo URL:
            </label>
            <div className="input-icon">
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Enter Photo URL"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
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
              className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-500"
              disabled={registrationLoading} // Disable button during registration
            >
              {registrationLoading ? ( // Conditionally render spinner or text
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </motion.button>
          </div>
        </form>
        <div className="pt-3 pl-1">
          <p>Already Have an account <Link to="/login" className="font-semibold text-blue-900">LogIn</Link></p>
        </div>
        <div className="mt-2 text-sm text-red-500">{error}</div>
      </motion.div>
    </div>
  );
};

export default Registration;
