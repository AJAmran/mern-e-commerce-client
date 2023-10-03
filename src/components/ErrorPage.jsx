import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ status = 404, message = "Page not found" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl text-red-500">
        <FaExclamationTriangle />
      </div>
      <h1 className="text-4xl font-semibold text-gray-800">
        {status} - {message}
      </h1>
      <p className="mt-2 text-lg text-gray-600">Oops! Something went wrong.</p>
      <Link
        to="/"
        className="px-4 py-2 mt-4 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
