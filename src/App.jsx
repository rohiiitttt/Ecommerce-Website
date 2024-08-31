import { useState, useEffect, useCallback, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import ProductListPage from "./ProductListPage";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";  // Corrected import name to match the component name.
import { getProductData } from "./api";
import LoginPage from './LoginPage';
import SignUp from './SignUp';

function App() {
  console.log("App running...");
  const savedDataString = localStorage.getItem("cartItems") || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const myCart = { 1: 4, 2: 5, 6: 2 };
      const promises = Object.keys(myCart).map((productId) => getProductData(productId));

      try {
        const response = await Promise.all(promises);
        setCartProducts(response);
        console.log("Fetched cart products:", response);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      }
    };

    fetchCartProducts();
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

  const handleAddToCart = useCallback((productId, count) => {
    const id = Number(productId);
    const quantity = Number(count);
    let oldCart = cart[id] || 0;
    const newCart = { ...cart, [id]: oldCart + quantity };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("cartItems", cartString);
  }, [cart]);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const totalCount = useMemo(() => {
    return Object.values(cart).reduce((previous, current) => previous + current, 0);
  }, [cart]);

  return (
    <div className="flex flex-col gap-1">
      <Navigation productCount={totalCount} />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/moredetails/:id" element={<ProductDetail onAddToCart={handleAddToCart}/>}/>
        <Route path="/" element={<ProductListPage />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/cart" element={<CartPage cart={cart} updateCart={updateCart}/>}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
