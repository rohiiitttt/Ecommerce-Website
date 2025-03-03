import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import ProductListPage from "./ProductListPage";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import Alert from "./Alert";
import CartProvider from "./Providers/CartProvider";
import UserProvider from "./Providers/UserProvider"; 
import AlertProvider from "./Providers/AlertProvider"; 

function App() {
  console.log("App running...");

  return (
    <div className="flex flex-col gap-1">
      <UserProvider>
        <CartProvider>
          <AlertProvider>
            <Navigation />
            <Alert />

            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/moredetails/:id" element={<ProductDetail />} />
              <Route path="/" element={<ProductListPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </AlertProvider>
        </CartProvider>
      </UserProvider>

      <Footer />
    </div>
  );
}

export default App;
