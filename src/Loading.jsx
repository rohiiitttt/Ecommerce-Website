import React, { memo } from 'react';

function Loading() {
  console.log("loading running...");
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="text-center">
        <div className="spinner border-t-4 border-b-4 border-red-500 w-16 h-16 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default memo(Loading);
