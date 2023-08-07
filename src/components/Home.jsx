import React from 'react';
import Banner from '../components/shared/Banner';
import AllProducts from '../pages/AllProducts';
// Import the Banner component

function Home() {
  return (
    <div>
      {/* Include the Banner component here */}
      {/* <Banner /> */}

      {/* Add more sections or content for the Home page */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <AllProducts></AllProducts>
      </div>
    </div>
  );
}

export default Home;
