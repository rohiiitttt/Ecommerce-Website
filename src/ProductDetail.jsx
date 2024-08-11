import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductData } from './api';
import Loading from './Loading';
import NotFound from './NotFound';

function ProductDetails({ onAddToCart }) {
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
        if (response.data) {
          setProduct(response.data);
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

  function handleCountChange(event) {
    setCount(event.target.value);
  }

  function handleButtonClick() {
    onAddToCart(id, count);
  }

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return <NotFound />;
  }

  const { title, price, thumbnail, description } = product;

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-4 py-2 my-2 text-white rounded-md font-medium inline-block"
      >
        Back
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6 my-8">  
        <div className="flex justify-between items-center mb-6">
          {parseInt(id) > 1 && (
            <Link
              to={`/moredetails/${parseInt(id) - 1}`}
              className="bg-orange-600 hover:bg-gray-600 transition-colors duration-300 px-4 py-2 text-white rounded-md font-medium"
            >
              Previous
            </Link> 
          )}
          <Link
            to={`/moredetails/${parseInt(id) + 1}`}
            className="bg-orange-600 hover:bg-gray-600 transition-colors duration-300 px-4 py-2 text-white rounded-md font-medium"
          >
            Next
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <img className="w-full lg:w-1/2 rounded-lg object-cover" src={thumbnail} alt={title} />
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-800 text-3xl lg:text-4xl font-bold">{title}</h1>
            <h2 className="text-gray-600 text-2xl lg:text-3xl font-semibold">${price}</h2>
            <p className="text-lg font-medium text-gray-600 leading-relaxed">{description}</p>
            <div className="flex items-center gap-4 pt-4">
              <input
                className="border border-gray-300 text-gray-700 text-lg w-16 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                type="number"
                onChange={handleCountChange}
                value={count}
              />
              <button
                onClick={handleButtonClick}
                className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-8 py-2 text-white rounded-md font-semibold"
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

export default ProductDetails;
