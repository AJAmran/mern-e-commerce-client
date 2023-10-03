import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

// import axios from 'axios';

const AddProductForm =()=> {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    stock: 0,
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' || name === 'stock' ? parseInt(value) : value;

    setProductData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://e-commerce-backend-ajamran.vercel.app/products', productData); // Adjust the API endpoint
      console.log('Product added:', response.data);
      // Clear the form or show a success message
      setProductData({
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        imageUrl: '',
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Successfully Added",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      // Show an error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-2 bg-gradient-to-r from-blue-100 to-purple-100">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-200 to-purple-200"
    >
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Product Price"
              required
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="Product Category"
              required
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Brand:</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              placeholder="Product Brand"
              required
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Stock:</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Product Stock"
              required
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">
              Image URL:
            </label>
            <input
              type="url"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="w-full px-3 py-2 border rounded-lg input focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600"
            >
              <FaPlusCircle className="mr-2" />
              Add Product
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddProductForm;
