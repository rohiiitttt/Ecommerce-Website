import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";

function Product({ category, title, price, id, thumbnail }) {
  return (
    <div className="w-80 p-4 bg-white rounded-md shadow-lg">
      <div className="w-full h-64 overflow-hidden rounded-t-md">
        <img className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" src={thumbnail} alt={title} />
      </div>
      <div className="mt-2 text-gray-500 text-xs uppercase">{category}</div>
      <div className="mt-1 text-black font-semibold text-lg">{title}</div>
      <div className="mt-1 text-gray-800 text-sm">${price}</div>
      <Link
        to={`/moredetails/${id}`}
        className="mt-4 inline-flex items-center text-center text-blue-500 font-medium py-2 px-4 rounded-md hover:bg-blue-100 transition-colors duration-300"
      >
        More details
        <FaExternalLinkAlt className="ml-2" />
      </Link>
    </div>
  );
}

export default Product;
