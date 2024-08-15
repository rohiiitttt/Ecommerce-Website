import React from "react";

function Cart() {
  // Example cart items (you might get this data from state or props)
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      quantity: 2,
      subtotal: 59.98,
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      quantity: 1,
      subtotal: 49.99,
    },
  ];

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.subtotal, 0);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-white shadow-md rounded-lg w-4/5 mx-auto">
      {/* Cart Items Section */}
      <div className="flex-1 w-full mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md mb-4 shadow-sm">
            <div className="w-1/3 font-medium">{item.name}</div>
            <div className="w-1/6 text-center">${item.price.toFixed(2)}</div>
            <div className="w-1/6 text-center">{item.quantity}</div>
            <div className="w-1/6 text-center font-semibold">${item.subtotal.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Apply Code and Update Cart Section */}
      <div className="flex w-full justify-between items-center mb-6 space-x-4">
        <div className="flex space-x-2">
          <input
            className="border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Coupon Code"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Apply Code
          </button>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
          Update Cart
        </button>
      </div>

      {/* Flex container for Cart Totals */}
      <div className="flex w-full justify-end">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md max-w-xs text-right">
          <div className="text-lg font-semibold text-gray-800 mb-2">Cart Totals</div>
          <div className="text-sm text-gray-600">Total: <span className="font-bold text-gray-800">${totalAmount.toFixed(2)}</span></div>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
