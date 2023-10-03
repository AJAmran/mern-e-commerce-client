import React, { useState } from "react";
import useCart from "../hook/useCart";
import useProduct from "../hook/useProduct";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ImSpinner3 } from "react-icons/im";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetchCart] = useCart(); // Get the cart
  const [products, isLoading] = useProduct(); // Get all the products

  const [sortBy, setSortBy] = useState("name"); // Default sorting by name
  const [filterBy, setFilterBy] = useState("all"); // Default filter
  const [visibleProducts, setVisibleProducts] = useState(12); // Number of initially visible products

  const filteredProducts = products.filter((product) => {
    if (filterBy === "all") return true;
    return product.category === filterBy;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "priceLowToHigh") {
      return a.price - b.price;
    }
    if (sortBy === "priceHighToLow") {
      return b.price - a.price;
    }
    return 0;
  });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner3 className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  if(products.length === 0){
    return (
    <div className="flex items-center justify-center h-screen ">
      <h1 className="text-red-500">Failed to fetch data ...</h1>
    </div>)
  }

  return (
    <div className="container min-h-full px-4 py-8 mx-auto md:px-6 lg:px-8">
      <div className="mb-4 space-x-4">
        <label className="text-gray-700">Sort By:</label>
        <select
          className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
        <label className="text-gray-700">Filter By Category:</label>
        <select
          className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Furniture">Home & Furniture</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
          <option value="Books, Movies & Music">Books, Movies & Music</option>
          <option value="Health & Wellness">Health & Wellness</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.slice(0, visibleProducts).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {visibleProducts < sortedProducts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleProducts((prev) => prev + 12)}
            className="px-4 py-2 text-lg font-semibold text-white border rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
