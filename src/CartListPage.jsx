import { useState, useEffect } from "react";
import { getProductByIds } from "./api";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import WithCart from "./WithCart";

function CartListPage({ cart, updateCart }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempCart, setTempCart] = useState(cart);
  const [error, setError] = useState(null);

  const productIds = Object.keys(cart || {});

  useEffect(() => {
    if (productIds.length > 0) {
      setLoading(true);
      getProductByIds(productIds)
        .then((products) => {
          setProductData(products);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load product data. Please try again later.", err);
          setLoading(false);
        });
    } else {
      setProductData([]);
      setLoading(false);
    }
  }, [cart]);

  useEffect(() => {
    setTempCart(cart);
  }, [cart]);

  const handleDelete = (productId) => {
    const newCart = { ...tempCart };
    delete newCart[productId];
    setTempCart(newCart);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const newCart = { ...tempCart, [productId]: newQuantity };
    setTempCart(newCart);
  };

  const handleUpdateCart = () => {
    updateCart(tempCart);
  };

  const totalAmount = productData.reduce(
    (total, product) => total + product.price * (tempCart[product.id] || 0),
    0
  );

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (Object.keys(cart).length === 0) return <EmptyCart />;

  return (
    <div className="flex flex-col w-4/5 min-h-screen p-6 mx-auto bg-white rounded-lg shadow-md">
      <CartList
        products={productData}
        cart={tempCart}
        onDelete={handleDelete}
        onUpdateQuantity={handleUpdateQuantity}
      />

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
          <div className="mb-2 text-lg font-semibold text-gray-800">Cart Totals</div>
          <div className="text-sm text-gray-600">
            Total: <span className="font-bold text-gray-800">${totalAmount.toFixed(2)}</span>
          </div>
          <button
            className="px-4 py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={totalAmount === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithCart(CartListPage);
