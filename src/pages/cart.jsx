import React, { useState, useEffect, useContext } from 'react';
import { getCart, updateCartQuantity, removeFromCart, checkout } from '../api/cart.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../GlassUI.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.msg || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartQuantity(productId, quantity);
      fetchCart();
    } catch (err) {
      setError(err.msg || 'Failed to update quantity');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCart();
    } catch (err) {
      setError(err.msg || 'Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      alert('Checkout successful!');
      fetchCart();
      navigate('/products');
    } catch (err) {
      setError(err.msg || 'Failed to checkout');
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please log in to view your cart.</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty.</div>;

  const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cart.items.map(item => (
        <div key={item._id} className="cart-item">
          {item.product.image && <img src={item.product.image} alt={item.product.name} />}
          <div>
            <h3>{item.product.name}</h3>
            <p><strong>Price:</strong> ₹{item.product.price}</p>
            <div className="cart-quantity">
              <strong>Quantity:</strong>
              <button 
                className="glass-button" 
                onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
              >
                -
              </button>
              <span className="cart-quantity-number">{item.quantity}</span>
              <button 
                className="glass-button" 
                onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="glass-button red small" 
              onClick={() => handleRemoveFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <h2 className="cart-total">Total: ₹{totalAmount}</h2>
      <button className="glass-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
