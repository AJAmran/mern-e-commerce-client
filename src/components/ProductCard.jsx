// ProductCard.js
import React from "react";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = async () => {
    onAddToCart(product._id);
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <div className="h-40 mb-4 overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
      <p className="mb-2 text-gray-700">${product.price}</p>
      <p className="mb-2 text-gray-700">Stock: {product.stock}</p>
      <div className="flex items-center justify-between">
        <Link
          to={`/ProductDetails/${product._id}`}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <FaEye className="mr-2" />
          View Details
        </Link>
        <button
          className="flex items-center text-green-500 hover:text-green-600"
          onClick={handleAddToCart}
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
