import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

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
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await axios.post('/products', productData); // Adjust the API endpoint
    //   console.log('Product added:', response.data);
    //   // Clear the form or show a success message
    //   setProductData({
    //     name: '',
    //     description: '',
    //     price: 0,
    //     category: '',
    //     brand: '',
    //     stock: 0,
    //     imageUrl: '',
    //   });
    // } catch (error) {
    //   console.error('Error adding product:', error);
    //   // Show an error message
    // }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Product Price"
              required
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="Product Category"
              required
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Brand:</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              placeholder="Product Brand"
              required
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">Stock:</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Product Stock"
              required
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-semibold">
              Image URL:
            </label>
            <input
              type="url"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="input border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-200"
            />
          </div>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600 py-2 px-4 rounded-lg text-white font-semibold w-full transition-colors"
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
