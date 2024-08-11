import React from 'react';
import {Link} from 'react-router-dom';

function NoMatchFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-lg font-semibold text-gray-800 mb-2">Oops! Product Not Found</p>
      <p className="text-gray-600 mb-6">
        The product you are looking for does not exist or has been moved.
      </p>
    </div>
  );
}

export default NoMatchFound;