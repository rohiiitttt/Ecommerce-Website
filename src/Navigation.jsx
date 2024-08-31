import React, { memo } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

function Navigation({ productCount }) {
  console.log("nav running...");

  return (
    <div className="flex items-center justify-between p-4 bg-gray-500">
      <Link to="/">
      <img 
        className="h-12 ml-4 sm:ml-20" 
        src="https://static.vecteezy.com/system/resources/previews/019/766/240/original/amazon-logo-amazon-icon-transparent-free-png.png" 
        alt="Logo"
      />
      </Link>
      <div className='flex flex-row items-center justify-between gap-5'>
        <Link to="/cart">
          <button className="relative flex items-center p-1 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <div className="px-3 text-lg font-medium text-white">
              Your Cart
            </div>
            <CiShoppingCart className="text-white cursor-pointer" size={32} />
            <span
              className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full shadow-lg"
              aria-label={`Cart with ${productCount} items`}
            >
              {productCount}
            </span>
          </button>
        </Link>
        <Link to="/login">
          <FaUserCircle className="text-3xl text-white" />
        </Link>
      </div>
    </div>
  );
}

export default memo(Navigation);
