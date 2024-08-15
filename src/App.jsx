import { useState, useEffect } from 'react'; 
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import ProductListPage from "./ProductListPage";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import Cart from './Cart';
import { getProductData } from './api';

function App() {
  const savedDataString = localStorage.getItem("cartItems") || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const myCart = { 1: 4, 2: 5, 6: 2 };
      const promises = Object.keys(myCart).map(productId => getProductData(productId));

      try {
        const response = await Promise.all(promises);
        setCartProducts(response);
        console.log("Bigger Promise Data:", response);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      }
    };

    fetchCartProducts();
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  const handleAddToCart = (productId, count) => {
    const id = Number(productId);
    const quantity = Number(count);
    let oldCart = cart[id] || 0;
    const newCart = { ...cart, [id]: oldCart + quantity };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("cartItems", cartString);
  };

  const totalCount = Object.keys(cart).reduce((previous, current) => {
    return previous + cart[Number(current)];
  }, 0);

  return (
    <div className="flex flex-col gap-1">
      <Navigation productCount={totalCount} />

      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/moredetails/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartProducts={cartProducts} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
