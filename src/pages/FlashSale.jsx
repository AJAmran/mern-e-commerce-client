import React from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import classNames from "classnames";
import useProduct from "../hook/useProduct";
import { ImSpinner3 } from "react-icons/im";
import { Link } from "react-router-dom";

const FlashSaleComponent = () => {
  const [products, loading] = useProduct();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner3 className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }
  if (products.length ===0) {
    return (
      <div className="flex justify-center">
        <h1>Failed to Fetch data ...</h1>
      </div>
    );
  }

  // Select 6 random products from the products list
  const randomProducts = Array.from({ length: 6 }).map(() => {
    return products[Math.floor(Math.random() * products.length)];
  });

  // Define discount percentages
  const discounts = [10, 15, 25];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border rounded shadow-md"
    >
      <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 text-2xl font-semibold text-center text-blue-600 md:mb-0 md:text-left"
        >
          Flash Sale!
        </motion.h2>
        <div className="text-gray-600">
          <div className="flex items-center space-x-2">
            <Countdown
              date={Date.now() + 86400000}
              daysInHours
              renderer={({ hours }) => (
                <span className="p-1 text-lg font-semibold text-blue-600 bg-white">
                  {hours}h
                </span>
              )}
            />
            <Countdown
              date={Date.now() + 86400000}
              daysInHours
              renderer={({ minutes }) => (
                <span className="p-1 text-lg font-semibold text-blue-600 bg-white">
                  {minutes}m
                </span>
              )}
            />
            <Countdown
              date={Date.now() + 86400000}
              daysInHours
              renderer={({ seconds }) => (
                <span className="p-1 text-lg font-semibold text-blue-600 bg-white">
                  {seconds}s
                </span>
              )}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {randomProducts.map((product, index) => {
          const randomDiscount =
            discounts[Math.floor(Math.random() * discounts.length)];
          const salePrice = product?.price * (1 - randomDiscount / 100);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 transition-transform transform bg-white border rounded shadow-md hover:scale-75"
            >
              <Link to={`ProductDetails/${product?._id}`}>
              <div className="relative mb-4 overflow-hidden h-52">
                <img
                  src={product?.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <h3 className="mb-1 text-xl font-semibold text-blue-600">
                {product.name}
              </h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={classNames("text-yellow-500", {
                      "ml-1": starIndex !== 0,
                    })}
                  />
                ))}
                <span className="ml-1 text-gray-600">(123)</span>
              </div>
              <div className="mt-2 text-2xl font-semibold text-green-500">
                ${salePrice.toFixed(2)}{" "}
                <span className="text-base text-gray-400 line-through">
                  ${product?.price.toFixed(2)}
                </span>
              </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FlashSaleComponent;
