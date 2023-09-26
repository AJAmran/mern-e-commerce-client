import { useContext, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

import useProduct from "../hook/useProduct";
import useCart from "../hook/useCart";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const [refetchCart] = useCart();
  const [products, isLoading] = useProduct();

  const [visibleProducts, setVisibleProducts] = useState(10);

  const handleSeeMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };

  const addToCartMutation = ({ productId, quantity, userEmail }) =>
    axios.post("http://localhost:5000/carts", {
      productId,
      quantity,
      userEmail,
    });

  const addToCart = useMutation(addToCartMutation, {
    onSuccess: () => {
      refetchCart();
      Swal.fire({
        icon: "success",
        title: "Item Added to Cart",
        text: "The item has been successfully added to your cart.",
      });
    },
    onError: (error) => {
      console.error("Failed to add item to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add item to cart. Please try again.",
      });
    },
  });

  const handleAddToCart = async (productId) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Please Login",
        text: "Please login to add products to your cart.",
      });
    } else {
      await addToCart.mutateAsync({
        productId,
        quantity: 1,
        userEmail: user.email,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner3 className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="mt-8 text-center text-red-500">
  //       Error: {error.message}
  //     </div>
  //   );
  // }
  return (
    <div className="container py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, visibleProducts).map((product) => (
          <motion.div
            key={product.id}
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
                onClick={() => handleAddToCart(product._id)}
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
            className="px-4 py-2 text-lg font-semibold text-white border rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
