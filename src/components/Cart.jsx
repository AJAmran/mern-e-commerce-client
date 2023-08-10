import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import useCart from "../hook/useCart";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [carts, refetch] = useCart();

  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:5000/carts/${itemId}`, {
        quantity: newQuantity,
      });
      refetch(); // Refetch the cart data after updating
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/carts/${itemId}`);
      refetch(); // Refetch the cart data after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        Your Cart
      </h2>
      {carts.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-300">
            {carts.map((item) => (
              <motion.li
                key={item._id}
                className="p-4 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img
                      src={item.images} // Replace with the actual image URL
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">${item.price} x {item.quantity}</p>
                    <p className="text-gray-700">Stock: {item.stock}</p>
                    <p className="text-gray-700">User Email: {user.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
          <div className="p-4 text-right">
            <p className="text-gray-700 mb-3">Total Price: ${totalPrice.toFixed(2)}</p>
            <Link
              to="/checkout" // Replace with the checkout page route
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
