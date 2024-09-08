import { useEffect, useState, memo, useContext } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link, Navigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import WithUser from './WithUser';
import { cartcontext } from './Providers/CartProvider';
import WithCart from './WithCart';

function Navigation({totalCount,setUser}) {
  console.log("nav running...");
  console.log("product Count...",totalCount);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(undefined);
    setIsLoggedin(false);
    <Navigate to="/login" />
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-500">
      <Link to="/">
        <img 
          className="h-12 ml-4 sm:ml-20" 
          src="https://static.vecteezy.com/system/resources/previews/019/766/240/original/amazon-logo-amazon-icon-transparent-free-png.png" 
          alt="Logo"
        />
      </Link>
      <div className='flex flex-row items-center justify-between gap-5'>
        <Link to="/cart">
          <button className="relative flex items-center p-1 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <div className="px-3 text-lg font-medium text-white">
              Your Cart
            </div>
            <CiShoppingCart className="text-white cursor-pointer" size={32} />
            <span
              className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full shadow-lg"
              aria-label={`Cart with ${totalCount} items`}
            >
              {totalCount}
            </span>
          </button>
        </Link>
        <Link to="/login">
          <FaUserCircle className="text-3xl text-white" />
        </Link>
        {isLoggedin && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            <IoIosLogOut className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
}

export default WithCart(WithUser(memo(Navigation)));
