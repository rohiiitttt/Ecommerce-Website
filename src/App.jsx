import {useState} from 'react'; 
import {Routes , Route, } from "react-router-dom";
import Navigation from "./Navigation";
import ProductListPage from "./ProductListPage";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";



function App() {

  // const path = window.location.pathname;

  const savedDataString = localStorage.getItem("cartItems") || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart,setCart] = useState(savedData);

  const handleAddToCart = (productId, count) => {
    const id = Number(productId);
    const quantity = Number(count);
    let oldCart = cart[id] || 0;
    const newCart = { ...cart, [id]: oldCart + quantity };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("cartItems",cartString);
  };

  const totalCount = Object.keys(cart).reduce((previous, current) => {
    return previous + cart[Number(current)];
  }, 0);
  
  return (
    <>
      <div className = "flex flex-col gap-1">
        <Navigation productCount={totalCount}/>

        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/moredetails/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        </Routes>

        <Footer/>





       </div>
    </>
    );

}

export default App;