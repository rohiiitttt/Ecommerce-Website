import { createContext, useState, useCallback, useEffect, useMemo } from "react";
import { getProductByIds } from "../api"; // Ensure to only import what is needed

export const cartcontext = createContext();

function CartProvider({ children }) {
  console.log("cartprovider running..");

  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Fetch cart data from localStorage
  useEffect(() => {
    const savedDataString = localStorage.getItem("cartItems") || "{}";
    const savedData = JSON.parse(savedDataString);
    console.log("Fetched cart from localStorage:");
    setCart(savedData);
  }, []);

  console.log("cart", cart);

  const handleAddToCart = useCallback((productId, count) => {
    const id = Number(productId);
    const quantity = Number(count);
    let oldCart = cart[id] || 0;
    const newCart = { ...cart, [id]: oldCart + quantity };
    setCart(newCart);

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    console.log("Cart updated and saved to localStorage:");

  }, [cart]);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const totalCount = useMemo(() => {
    return Object.values(cart).reduce((previous, current) => previous + current, 0);
  }, [cart]);

  return (
    <cartcontext.Provider value={{ cart, cartProducts, handleAddToCart, updateCart, totalCount }}>
      {children}
    </cartcontext.Provider>
  );
}

export default CartProvider;
