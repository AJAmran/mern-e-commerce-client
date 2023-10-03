import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hook/useProduct";
import { AuthContext } from "../context/AuthProvider";
import useCart from "../hook/useCart";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";

const CategoryProductPage = () => {
  const { categoryName } = useParams();
  const [products, isLoading] = useProduct();
  const { user } = useContext(AuthContext);
  const [cart, refetchCart] = useCart(); // get all product

  const categoryProduct = products.filter(
    (product) => product.category === categoryName
  );

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

  if(categoryProduct.length===0){
    return(<div className="container min-h-screen px-4 py-8 mx-auto md:px-6 lg:px-8">
        <p>No Product to show</p>
    </div>)
  }

  return (
    <div className="container min-h-screen px-4 py-8 mx-auto md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categoryProduct.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductPage;
