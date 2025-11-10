import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css'; // For basic styling

function ProductCard({ product }) {
  const { cartDispatch } = useCart();

  const addToCartHandler = () => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        product: product,
        quantity: 1,
      },
    });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;