import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import ProductListPage from "./ProductListPage";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";
import Alert from "./Alert";
import CartProvider from "./Providers/CartProvider";
import UserProvider from "./Providers/UserProvider"; // Import the UserProvider
import AlertProvider from "./Providers/AlertProvider"; // Import the AlertProvider

function App() {
  console.log("App running...");

  return (
    <div className="flex flex-col gap-1">
      {/* Wrap the application in UserProvider */}
      <UserProvider>
        <CartProvider>
          <AlertProvider> {/* Wrap AlertProvider around the components */}
            <Navigation />
            <Alert /> {/* The Alert component can consume the context now */}

            <Routes>
              <Route path="/login" element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              } />
              <Route path="/moredetails/:id" element={
                  <ProductDetail />
              } />
              <Route path="/" element={
                <UserRoute>
                  <ProductListPage />
                </UserRoute>
              } />
              <Route path="/signup" element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              } />
              <Route path="/cart" element={
                <UserRoute>
                  <CartPage />
                </UserRoute>
              } />
            </Routes>
          </AlertProvider>
        </CartProvider>
      </UserProvider>

      <Footer />
    </div>
  );
}

export default App;
