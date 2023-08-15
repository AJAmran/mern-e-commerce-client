import React from "react";
import { FaStar } from "react-icons/fa";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import classNames from "classnames";
import useProduct from "../hook/useProduct";
import { ImSpinner3 } from "react-icons/im";

const FlashSaleComponent = () => {
  const [products, loading] = useProduct();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
    <ImSpinner3 className="animate-spin text-4xl text-blue-500" />
  </div>
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
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold mb-2 md:mb-0"
        >
          Flash Sale!
        </motion.h2>
        <div className="text-gray-600">
          <div className="flex items-center space-x-2">
            <Countdown
              date={Date.now() + 86400000}
              daysInHours
              renderer={({ hours }) => (
                <span className="text-lg font-semibold bg-white p-1">{hours}h</span>
              )}
            />
            <Countdown
              date={Date.now() + 86400000}
              daysInHours
              renderer={({ minutes }) => (
                <span className="text-lg font-semibold bg-white p-1">{minutes}m</span>
              )}
            />
            <Countdown
              date={Date.now() + 86400000}
              daysInHours
              renderer={({ seconds }) => (
                <span className="text-lg font-semibold bg-white p-1">{seconds}s</span>
              )}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {randomProducts.map((product, index) => {
          const randomDiscount =
            discounts[Math.floor(Math.random() * discounts.length)];
          const salePrice = product.price * (1 - randomDiscount / 100);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded p-4 shadow-md bg-white"
            >
              <div className="relative mb-2 h-32 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={classNames("text-yellow-500", {
                      "ml-1": starIndex !== 0,
                    })}
                  />
                ))}
                <span className="text-gray-600 ml-1">(123)</span>
              </div>
              <div className="text-lg font-semibold text-green-500 mt-2">
                ${salePrice.toFixed(2)}{" "}
                <span className="text-base line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <button className="mt-4 text-white bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600 px-4 py-2 rounded">
                Add to Cart
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FlashSaleComponent;
