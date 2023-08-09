import React, { useContext, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

const addToCartMutation = async ({ productId, quantity, userEmail }) => {
  try {
    const response = await axios.post("http://localhost:5000/carts", {
      productId,
      quantity,
      userEmail, // Include user's email
    });
    Swal.fire({
      icon: "success",
      title: "Item Added to Cart",
      text: "The item has been successfully added to your cart.",
    });

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to add item to cart. Please try again.",
    });

    throw error;
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery(["products"], fetchProducts);

  const [visibleProducts, setVisibleProducts] = useState(10);

  const handleSeeMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };
  const addToCart = useMutation(addToCartMutation);
  const handleAddToCart = (productId) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Please Login",
        text: "Please login to add products to your cart.",
      });
    } else {
      addToCart.mutate({
        productId,
        quantity: 1,
        userEmail: user.email, // Include user's email
      });
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner3 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        All Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.slice(0, visibleProducts).map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg p-6"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            <div className="h-40 mb-4 overflow-hidden rounded-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/ProductDetails/${product._id}`} // Redirect to the product details page
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <FaEye className="mr-2" />
                View Details
              </Link>
              <button
                className="flex items-center text-green-500 hover:text-green-600"
                onClick={() => handleAddToCart(product._id)} // Update this line
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSeeMore}
            className="px-4 py-2 text-gray-800 bg-gradient-to-r from-blue-300 to-purple-300 hover:bg-blue-600 border rounded focus:outline-none focus:ring focus:border-blue-600"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
