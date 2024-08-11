import React from 'react';
import { CiShoppingCart } from "react-icons/ci";

function Navigation({ productCount }) {
  return (
    <div className="bg-gray-500 flex justify-between items-center p-4">
      <img 
        className="ml-4 sm:ml-20 h-12" 
        src="https://static.vecteezy.com/system/resources/previews/019/766/240/original/amazon-logo-amazon-icon-transparent-free-png.png" 
        alt="Logo"
      />
      <div className="relative mr-4 sm:mr-10">
        <CiShoppingCart className="text-white" size={38} />
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
          {productCount}
        </span>
      </div>
    </div>
  );
}

export default Navigation;
