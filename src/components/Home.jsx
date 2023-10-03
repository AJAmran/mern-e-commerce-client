import React from "react";
import AllProducts from "../pages/AllProducts";
import Banner from "./shared/Banner";
import useProduct from "../hook/useProduct";
import FlashSale from "../pages/FlashSale";
import CategoryCard from "../pages/CategoryCard";
// Import the Banner component

function Home() {
  const [products, loading, refetch] = useProduct();
  return (
    <div>
      {/* Include the Banner component here */}
      <section className="container px-4 py-8 mx-auto mt-10 md:px-6 lg:px-8">
        <Banner></Banner>
      </section>
      <section className="container px-4 py-8 mx-auto mt-10 md:px-6 lg:px-8">
      <FlashSale></FlashSale>
      </section>
      <section className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
      <CategoryCard></CategoryCard>
      </section>
      <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-semibold text-center text-blue-600 md:mb-0 md:text-left">
         Just For You
        </h2>
        <AllProducts></AllProducts>
      </div>
    </div>
  );
}

export default Home;
