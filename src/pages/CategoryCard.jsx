import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import c1 from "../assets/ProductsItems/c1.jpg";
import c2 from "../assets/ProductsItems/c2.jpg";
import c3 from "../assets/ProductsItems/c3.jpg";
import c4 from "../assets/ProductsItems/c4.jpg";
import c6 from "../assets/ProductsItems/c6.jpg";
import c7 from "../assets/ProductsItems/c7.png";

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
    {
      name: "Home & Furniture",
      image: c3,
    },
    {
      name: "Beauty & Personal Care",
      image: c4,
    },
    {
      name: "Books, Movies & Music",
      image: c6,
    },
    {
      name: "Health & Wellness",
      image: c7,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-4 text-2xl font-semibold text-center text-blue-600 md:mb-0 md:text-left"
      >
        Categories!
      </motion.h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-105"
          >
            <Link to={`/category/${category.name}`}>
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full mb-4 rounded-lg h-36"
              />
              <Link
                to={`/category/${category.name}`}
                className="text-lg font-semibold text-blue-500 hover:underline"
              >
                {category.name}
              </Link>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryCard;
