import { useState, useEffect, useCallback, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import ProductListPage from "./ProductListPage";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import { getProductData } from "./api";
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import axios from "axios";
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";

function App() {
  console.log("App running...");
  const savedDataString = localStorage.getItem("cartItems") || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null); // Initialize as null
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          Authorization: token  , // Ensure proper Bearer token usage
        },
      }).then((response) => {
        setUser(response.data);
      }).catch(error => {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("token"); // Clear token if there's an error
        setUser(null); // Reset user state
      });
    }
  }, [token]);

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
    localStorage.setItem("cartItems", JSON.stringify(newCart));
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
      <Navigation productCount={totalCount} setUser={setUser}/>

      <Routes>
        <Route path="/login" element={
          <AuthRoute user={user}>
            <LoginPage user={user} setUser={setUser} />
          </AuthRoute>
        } />
        <Route path="/moredetails/:id" element={
          <UserRoute user={user}>
            <ProductDetail onAddToCart={handleAddToCart} />
          </UserRoute>
        } />
        <Route path="/" element={
          <UserRoute user={user}>
            <ProductListPage />
          </UserRoute>
        } />
        <Route path="/signup" element={
          <AuthRoute user={user}>
            <SignUp />
          </AuthRoute>
        } />
        <Route path="/cart" element={
          <UserRoute user={user}>
            <CartPage cart={cart} updateCart={updateCart} />
          </UserRoute>
        } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
