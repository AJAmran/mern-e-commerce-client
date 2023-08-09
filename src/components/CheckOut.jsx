import React, { useContext, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";

const Checkout = ({ cartItems, totalPrice }) => {
    const {user} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  console.log(user)
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card Number is required";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    }
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., sending data to the server, completing the purchase)
      // You can add your logic here
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        Checkout
      </h2>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-lg border">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={user?.displayName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded mt-2 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={user?.email}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded mt-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded mt-2 ${
                  errors.address ? "border-red-500" : ""
                }`}
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded mt-2 ${
                  errors.cardNumber ? "border-red-500" : ""
                }`}
                required
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            <div className="flex justify-between mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-gray-600 font-semibold">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded mt-2 ${
                    errors.expiryDate ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-gray-600 font-semibold">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded mt-2 ${
                    errors.cvv ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600 py-2 px-4 rounded-lg text-white font-semibold w-full transition-colors"
            >
              Place Order
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
