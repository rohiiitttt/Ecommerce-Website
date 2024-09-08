import CartRow from "./CartRow";

function CartList({ products, cart, onDelete, onUpdateQuantity }) {
  return (
    <>
      {products.map((product) => (
        <CartRow
          key={product.id}
          product={product}
          quantity={cart[product.id] || 0} // Ensure default quantity is 0
          onDelete={onDelete}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </>
  );
}

export default CartList;
