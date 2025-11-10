import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css'; // For basic styling

function CartPage() {
  const { cartState, cartDispatch } = useCart();

  const removeFromCartHandler = (id) => {
    cartDispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantityHandler = (id, quantity) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity: Number(quantity) } });
  };

  const totalItems = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartState.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartState.items.length === 0 ? (
        <div className="empty-cart">
          Your cart is empty. <Link to="/">Go back to shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartState.items.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                <p>${item.product.price.toFixed(2)}</p>
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantityHandler(item.product._id, e.target.value)}
                >
                  {[...Array(item.product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button onClick={() => removeFromCartHandler(item.product._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Subtotal ({totalItems}) items</h2>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-button" disabled={cartState.items.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;