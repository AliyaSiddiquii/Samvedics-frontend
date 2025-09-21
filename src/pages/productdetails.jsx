import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addToCart } from '../api/product.js';
import '../GlassUI.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.msg || 'Failed to fetch product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      alert('Product added to cart!');
    } catch (err) {
      setError(err.msg || 'Failed to add product to cart');
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-image-box">
        {product.image && <img src={product.image} alt={product.name} />}
      </div>
      <div className="product-info-box">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <button className="glass-button" onClick={handleAddToCart}>Add to Cart</button>

      </div>
    </div>
  );
};

export default ProductDetails;
