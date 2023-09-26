import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useProduct from "../hook/useProduct";
import { FaInfoCircle } from "react-icons/fa";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");

  const [products, isLoading] = useProduct();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
    setLoading(false);
  }, [searchQuery, products]);

  const handleViewDetails = (productId) => {
    console.log("View Details for Product ID:", productId);
  };

  return (
    <div className="container min-h-screen p-4 mx-auto">
      <h2 className="mt-4 mb-4 text-3xl font-semibold">
        Search Results for "{searchQuery}"
      </h2>
      <div className="flex justify-between mb-4"></div>
      {/* Display Search Results */}
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.length === 0 ? (
            <p className="text-center text-gray-600">No results found.</p>
          ) : (
            searchResults.map((product) => (
              <div key={product.id} className="p-6 rounded-lg shadow-md">
                <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full mb-4 rounded-md"
                />
                <p className="mb-4 text-gray-600">{product.description}</p>
                <p className="font-semibold text-purple-600">
                  Price: ${product.price}
                </p>
                <div className="mt-4">
                  <Link to={`/ProductDetails/${product._id}`}>
                    <button
                      className="flex items-center px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      <FaInfoCircle className="mr-2" />
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
