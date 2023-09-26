import React from "react";
import AllProducts from "../pages/AllProducts";
import Banner from "./shared/Banner";
import useProduct from "../hook/useProduct";
import FlashSale from "../pages/FlashSale";
import CategoryCard from "../pages/CategoryCard";
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
      <section className="container mx-auto mt-10">
      <FlashSale></FlashSale>
      </section>
      <section className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
      <CategoryCard></CategoryCard>
      </section>
      <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold">Featured Products</h2>
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">
         Just For You
        </h2>
        <AllProducts></AllProducts>
      </div>
    </div>
  );
}

export default Home;
