import React, { memo } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

function Navigation({ productCount }) {
  console.log("nav running...");

  return (
    <div className="bg-gray-500 flex justify-between items-center p-4">
      <img 
        className="ml-4 sm:ml-20 h-12" 
        src="https://static.vecteezy.com/system/resources/previews/019/766/240/original/amazon-logo-amazon-icon-transparent-free-png.png" 
        alt="Logo"
      />
      <div className='flex flex-row justify-between items-center gap-5'>
        <Link to="/cart">
          <button className="relative flex items-center border border-transparent bg-blue-600 rounded-lg p-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <div className="text-lg font-medium text-white px-3">
              Your Cart
            </div>
            <CiShoppingCart className="text-white cursor-pointer" size={32} />
            <span
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow-lg"
              aria-label={`Cart with ${productCount} items`}
            >
              {productCount}
            </span>
          </button>
        </Link>
        <Link to="/login">
          <FaUserCircle className="text-white text-3xl" />
        </Link>
      </div>
    </div>
  );
}

export default memo(Navigation);
