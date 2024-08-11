import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="spinner border-t-4 border-b-4 border-red-500 w-16 h-16 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
