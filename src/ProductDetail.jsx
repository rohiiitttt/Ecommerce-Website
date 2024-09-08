import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductData } from './api';
import Loading from './Loading';
import NotFound from './NotFound';
import { cartcontext } from './Providers/CartProvider';
import WithCart from './WithCart';

function ProductDetails({ handleAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProductData(id)
      .then(response => {
        if (response) {
          setProduct(response);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleCountChange = useCallback((event) =>  {
    const value = parseInt(event.target.value, 10);
    setCount(value > 0 ? value : 1); // Ensure count is always at least 1
  },[]);

  const handleButtonClick = useCallback(() =>  {
    handleAddToCart(id, count);
  }, [id, count, handleAddToCart]);

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return <NotFound />;
  }

  const { title, price, thumbnail, description } = product;

  return (
    <div className="container p-4 mx-auto">
      <Link
        to="/"
        className="inline-block px-4 py-2 my-2 font-medium text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Back
      </Link>
      <div className="p-6 my-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          {parseInt(id) > 1 && (
            <Link
              to={`/moredetails/${parseInt(id) - 1}`}
              className="px-4 py-2 font-medium text-white transition-colors duration-300 bg-orange-600 rounded-md hover:bg-gray-600"
            >
              Previous
            </Link> 
          )}
          <Link
            to={`/moredetails/${parseInt(id) + 1}`}
            className="px-4 py-2 font-medium text-white transition-colors duration-300 bg-orange-600 rounded-md hover:bg-gray-600"
          >
            Next
          </Link>
        </div>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <img className="object-cover w-full rounded-lg lg:w-1/2" src={thumbnail} alt={title} />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">{title}</h1>
            <h2 className="text-xl font-semibold text-gray-600 sm:text-2xl lg:text-3xl">${price}</h2>
            <p className="text-lg font-medium leading-relaxed text-gray-600">{description}</p>
            <div className="flex items-center gap-4 pt-4">
              <input
                className="w-16 p-2 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                type="number"
                onChange={handleCountChange}
                value={count}
              />
              <button
                onClick={handleButtonClick}
                className="px-8 py-2 font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithCart(ProductDetails);
