import { useContext } from "react";
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
      await axios.put(`https://e-commerce-backend-ajamran.vercel.app/carts/${itemId}`, {
        quantity: newQuantity,
      });
      refetch(); // Refetch the cart data after updating
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`https://e-commerce-backend-ajamran.vercel.app/carts/${itemId}`);
      refetch(); // Refetch the cart data after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">
        Your Cart
      </h2>
      {carts.length > 0 ? (
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-300">
            {carts.map((item) => (
              <motion.li
                key={item._id}
                className="flex items-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center w-full space-x-4">
                  <div className="w-24 h-24 overflow-hidden rounded-md">
                    <img
                      src={item.images} // Replace with the actual image URL
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="text-gray-700">Stock: {item.stock}</p>
                    <p className="text-gray-700">User Email: {user.email}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
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
            <p className="mb-3 text-gray-700">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <Link
              to="/checkout" // Replace with the checkout page route
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
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
