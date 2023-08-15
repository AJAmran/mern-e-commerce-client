import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2 md:mb-0">Categories</h1>
      <div className="flex items-center justify-center">
        <div className="card bg-white rounded p-4 gap-4">
          <img src="" alt="" />
          <Link to="/categories/electronics">Electronics</Link>
        </div>
        <div className="card bg-white rounded p-4">
          {" "}
          <Link>Fashion</Link>
        </div>
        <div className="card bg-white rounded p-4">
          <Link>Home & Furniture</Link>
        </div>
        <div className="card bg-white rounded p-4">
          <Link>Beauty & Personal Care</Link>
        </div>
        <div className="card bg-white rounded p-4">
          <Link>Books</Link>
        </div>
        <div className="card bg-white rounded p-4">
          <Link>Movies & Music</Link>
        </div>
        <div className="card bg-white rounded p-4">
          <Link>Health & Wellness</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
