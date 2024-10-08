import { useContext, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import useProduct from "../hook/useProduct";
import useCart from "../hook/useCart";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetchCart] = useCart();
  const [products, isLoading] = useProduct();
  const [visibleProducts, setVisibleProducts] = useState(10);

  const handleSeeMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };

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
    <div className="flex justify-center">
      <h1 className="text-red-500">Failed to fetch data ...</h1>
    </div>)
  }


  return (
    <div className="container py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.slice(0, visibleProducts).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
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
