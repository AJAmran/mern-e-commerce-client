import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hook/useCart";
import { useMutation } from "@tanstack/react-query";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetchCart] = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-backend-ajamran.vercel.app/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCartMutation = ({ productId, quantity, userEmail }) =>
  axios.post("https://e-commerce-backend-ajamran.vercel.app/carts", {
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
  console.log("Adding product to cart with ID:", productId);
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

  return (
    <div className="container py-8 mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">
        Product Details
      </h2>
      {product ? (
        <div className="flex flex-col items-center max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
          <div className="w-full lg:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-64 lg:h-auto"
            />
          </div>
          <div className="w-full p-6 lg:w-1/2 lg:pl-8 lg:pr-6">
            <h3 className="mb-2 text-xl font-semibold lg:text-2xl">
              {product.name}
            </h3>
            <p className="mb-2 text-gray-700">${product.price}</p>
            <p className="mb-4 text-gray-700">{product.description}</p>
            <p className="mb-2 text-gray-700">Category: {product.category}</p>
            <p className="mb-2 text-gray-700">Brand: {product.brand}</p>
            <p className="mb-4 text-gray-700">Stock: {product.stock}</p>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="flex items-center justify-center w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded md:w-auto hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600 md:mb-0 md:mt-2"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <a
                href="/"
                className="flex items-center mt-2 text-gray-700 hover:text-blue-500 md:mt-0"
              >
                <FaArrowLeft className="mr-2" />
                Back to Products
              </a>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
