import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css'; // For basic styling

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const { cartDispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found or failed to fetch.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      cartDispatch({
        type: 'ADD_ITEM',
        payload: {
          product: product,
          quantity: qty,
        },
      });
      alert(`${qty} x ${product.name} added to cart!`);
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-button">Go Back</Link>
      <div className="product-content">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p>
            <strong>Status:</strong>{' '}
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>
          {product.stock > 0 && (
            <div className="add-to-cart-section">
              <label htmlFor="qty">Qty:</label>
              <select id="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button onClick={addToCartHandler}>Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;