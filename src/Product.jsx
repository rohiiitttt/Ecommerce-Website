import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";

function Product({ category, title, price, id, thumbnail }) {
  console.log("thumbnail",thumbnail)

  console.log("product running...");
  return (
    <div className="w-full p-4 bg-white rounded-md shadow-lg sm:w-80">
      <div className="w-full h-64 overflow-hidden rounded-t-md">
        <img className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105" src={thumbnail} alt={title} />
      </div>
      <div className="mt-2 text-xs text-gray-500 uppercase">{category}</div>
      <div className="mt-1 text-lg font-semibold text-black">{title}</div>
      <div className="mt-1 text-sm text-gray-800">${price}</div>
      <Link
        to={`/moredetails/${id}`}
        className="inline-flex items-center px-4 py-2 mt-4 font-medium text-center text-blue-500 transition-colors duration-300 rounded-md hover:bg-blue-100"
      >
        More details
        <FaExternalLinkAlt className="ml-2" />
      </Link>
    </div>
  );
}

export default memo(Product);
