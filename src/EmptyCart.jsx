import React from "react";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">No Items Added</h1>
        <p className="mt-2 text-gray-600">It looks like your cart is empty. Start adding items to your cart to see them here.</p>
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => window.location.href = '/'} // Redirect to homepage or any other page
        >
          Browse Products
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
