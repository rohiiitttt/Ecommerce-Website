import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import productnotfound from './productnotfound.jpg';

function NotFound() {
  console.log("notfound running...");
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-600 mb-6">Product Not Found</h1>
      <img className="w-full max-w-xs sm:max-w-md rounded-lg shadow-lg" src={productnotfound} alt="Product not found" />
      <p className="text-lg font-medium text-gray-500 mt-4 text-center">The product you are looking for does not exist or is unavailable.</p>
      <Link
        to="/"
        className="mt-6 bg-red-500 hover:bg-red-600 transition-colors duration-300 px-4 py-2 text-white rounded-md font-medium inline-block"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default memo(NotFound);
