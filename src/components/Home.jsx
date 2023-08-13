import React from "react";
import AllProducts from "../pages/AllProducts";
import Banner from "./shared/Banner";
import useProduct from "../hook/useProduct";
import FlashSale from "../pages/FlashSale";
// Import the Banner component

function Home() {
  const [products, loading, refetch] = useProduct();
  console.log(products);
  return (
    <div>
      {/* Include the Banner component here */}
      <section className="container mx-auto">
        <Banner></Banner>
      </section>
      <section className="container mx-auto mt-6">
      <FlashSale></FlashSale>
      </section>
      {/* Add more sections or content for the Home page */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
         Just For You
        </h2>
        <AllProducts></AllProducts>
      </div>
    </div>
  );
}

export default Home;
