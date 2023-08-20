import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import c1 from "../assets/ProductsItems/c1.jpg"
import c2 from '../assets/ProductsItems/c2.jpg'
import c3 from '../assets/ProductsItems/c3.jpg'
import c4 from '../assets/ProductsItems/c4.jpg'
import c6 from '../assets/ProductsItems/c6.jpg'
import c7 from '../assets/ProductsItems/c7.png'

const CategoryCard = () => {

  const categories = [
    {
      name: "Electronics",
      image: c1,
    },
    {
      name: "Fashion",
      image: c2,
    },
    
  ];


  const categoryVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-2 text-xl font-semibold md:mb-4 lg:mb-2"
    >
      Categories
    </motion.h1>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          variants={categoryVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center p-4 transition-transform duration-300 transform bg-white rounded shadow-md card hover:scale-105"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-16 h-16 mb-2 rounded-full"
          />
          <Link className="text-blue-500">{category.name}</Link>
        </motion.div>
      ))}
    </div>
  </div>
  );
};

export default CategoryCard;
