import React, { useState, useEffect } from "react";
import useProduct from "../hook/useProduct";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [products, isLoading] = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (!isLoading) {
      setFilteredProducts(products);
    }
  }, [isLoading, products]);

  const addToCart = (product) => {
    // Implement your add to cart logic here
    console.log("Added to cart:", product);
  };

  const handleSeeMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    // Implement your sorting logic here
    let sortedProducts = [...filteredProducts];

    if (value === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container min-h-full px-4 py-8 mx-auto md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Shop</h1>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by Price:
          </label>
          <select
            id="sort"
            name="sort"
            className="px-2 py-1 border rounded"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            className="p-4 transition-transform transform bg-white border rounded shadow-lg hover:scale-105"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-40 mb-2 rounded-md"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
              className="flex items-center justify-center px-4 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-400 to-purple-400 hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart <FaShoppingCart className="ml-2" />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="block mt-2 text-center text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
