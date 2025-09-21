import React, { useState, useEffect, useContext } from 'react';
import { getAllProducts, addToCart } from '../api/product.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import '../GlassUI.css';

const Products = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.msg || 'Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Please log in to add products to your cart.');
      return;
    }
    try {
      await addToCart(productId);
      alert('Product added to cart!');
    } catch (err) {
      setError(err.msg || 'Failed to add product to cart');
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="products-title">Products</h1>
      <div className="products-container">
        {products.map(product => (
          <div key={product._id} className="glass-card">
            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {product.image && <img src={product.image} alt={product.name} />}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>₹{product.price}</p>
              <button className="glass-button" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
