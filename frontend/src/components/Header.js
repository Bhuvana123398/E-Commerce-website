import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css'; // For basic styling

function Header() {
  const { cartState } = useCart();
  const totalItems = cartState.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">E-Commerce</Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/cart">Cart ({totalItems})</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;