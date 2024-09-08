import { Link } from "react-router-dom";

function CartRow({ product, quantity = 0, onDelete, onUpdateQuantity }) {
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 0) { // Allow 0 to be set
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <Link to={`/moredetails/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-20 h-20 rounded-md"
          />
        </Link>
        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <button
              onClick={handleDecreaseQuantity}
              className="px-2 py-1 text-white bg-red-500 rounded-l-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              -
            </button>
            <input
              type="number"
              min="0" // Allow 0 value
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 px-2 py-1 text-center border-t border-b focus:outline-none"
            />
            <button
              onClick={handleIncreaseQuantity}
              className="px-2 py-1 text-white bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(product.id)}
        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </div>
  );
}

export default CartRow;
