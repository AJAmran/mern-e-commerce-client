import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        Product Details
      </h2>
      {product ? (
        <div className="flex flex-col md:flex-row max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden items-center">
          <div className="w-full lg:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 lg:h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 lg:pl-8 lg:pr-6">
            <h3 className="text-xl lg:text-2xl font-semibold mb-2">
              {product.name}
            </h3>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
            <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded focus:outline-none focus:ring focus:border-blue-600 mb-4 md:mb-0 md:mt-2">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <a
                href="/"
                className="flex items-center text-gray-700 hover:text-blue-500 mt-2 md:mt-0"
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
