import React, { useState, useEffect, useMemo } from "react";
import { getProductData } from "./api";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

function CartPage({ cart, updateCart }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempCart, setTempCart] = useState(cart);

  const productIds = Object.keys(cart);

  useEffect(() => {
    let isMounted = true;

    const fetchProductData = async () => {
      try {
        if (productIds.length === 0) {
          setLoading(false);
          return;
        }

        const products = await Promise.all(
          productIds.map((id) => getProductData(id))
        );

        if (isMounted) {
          setProductData(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchProductData();

    return () => {
      isMounted = false;
    };
  }, [productIds]);

  useEffect(() => {
    setTempCart(cart);
  }, [cart]);

  const handleDelete = (event) => {
    const itemToBeDeleted = event.currentTarget.getAttribute("data-productid");

    if (itemToBeDeleted && tempCart[itemToBeDeleted]) {
      const newCart = { ...tempCart };
      delete newCart[itemToBeDeleted];
      setTempCart(newCart);
    }
  };

  const handleQuantityChange = (event, id) => {
    const newQuantity = parseInt(event.target.value, 10);
    const newTempCart = { ...tempCart };
    if (newQuantity > 0) {
      newTempCart[id] = newQuantity;
    } else {
      delete newTempCart[id];
    }
    setTempCart(newTempCart);
  };

  const handleIncreaseQuantity = (id) => {
    const newTempCart = { ...tempCart };
    newTempCart[id] = (newTempCart[id] || 0) + 1;
    setTempCart(newTempCart);
  };

  const handleDecreaseQuantity = (id) => {
    const newTempCart = { ...tempCart };
    if (newTempCart[id] > 1) {
      newTempCart[id] -= 1;
    } else {
      delete newTempCart[id];
    }
    setTempCart(newTempCart);
  };

  const handleUpdateCart = () => {
    updateCart(tempCart);
  };

  if (loading) return <Loading />;

  if (Object.keys(tempCart).length === 0) return <EmptyCart />;

  const totalAmount = productData.reduce(
    (total, product) => total + product.price * (tempCart[product.id] || 0),
    0
  );

  return (
    <div className="flex flex-col w-4/5 min-h-screen p-6 mx-auto bg-white rounded-lg shadow-md">
      {productData.map((product) => (
        <div key={product.id} className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center space-x-4">
            <Link to={`/moredetails/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover w-20 h-20 rounded-md"
            />
            </Link>
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecreaseQuantity(product.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded-l-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={tempCart[product.id] || 0} // Ensure default value
                  onChange={(e) => handleQuantityChange(e, product.id)}
                  className="w-12 px-2 py-1 text-center border-t border-b focus:outline-none"
                />
                <button
                  onClick={() => handleIncreaseQuantity(product.id)}
                  className="px-2 py-1 text-white bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            data-productid={product.id}
            onClick={handleDelete}
            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="flex items-center justify-between w-full mb-6 space-x-4">
        <div className="flex pt-4 space-x-2">
          <input
            className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Coupon Code"
          />
          <button className="px-6 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Apply Code
          </button>
        </div>
        <button
          onClick={handleUpdateCart}
          className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Update Cart
        </button>
      </div>

      <div className="flex justify-end w-full">
        <div className="max-w-xs p-4 text-right rounded-lg shadow-md bg-gray-50">
          <div className="mb-2 text-lg font-semibold text-gray-800">
            Cart Totals
          </div>
          <div className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-bold text-gray-800">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <button className="px-4 py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
