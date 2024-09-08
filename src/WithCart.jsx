import { useContext } from "react";
import { cartcontext } from "./Providers/CartProvider"; // Adjust the import path to your actual file

function WithCart(IncomingComponent) {
  function OutgoingComponent(props) {
    const { cart, cartProducts, handleAddToCart, updateCart, totalCount } = useContext(cartcontext);

    return (
      <IncomingComponent
        cart={cart}
        cartProducts={cartProducts}
        handleAddToCart={handleAddToCart}
        updateCart={updateCart}
        totalCount={totalCount}
        {...props}
      />
    );
  }

  return OutgoingComponent;
}

export default WithCart;
