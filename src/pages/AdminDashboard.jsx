import React, { useState, useEffect, useContext } from 'react';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../api/product.js';
import { AuthContext } from '../context/AuthContext.jsx';
import '../GlassUI.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        alert('Product updated successfully!');
        setEditingProduct(null);
      } else {
        await addProduct(formData);
        alert('Product added successfully!');
      }

      // ✅ Reset form inputs
      setFormData({ name: '', description: '', price: '', image: '', category: '' });
      e.target.reset();

      fetchProducts();
    } catch (error) {
      alert('Failed to save product.');
    }
  };

  const handleCancelEdit = (formEl) => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', image: '', category: '' });
    if (formEl) formEl.reset(); // ✅ reset form fields
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteProduct(id);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      alert('Failed to delete product.');
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>

      <div style={{ textAlign: 'center' }}>
        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} className="glass-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="glass-input"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="glass-textarea"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="glass-input"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="glass-input"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="glass-input"
            required
          />

          <div className="form-buttons">
            <button className="glass-button" type="submit">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                className="glass-button"
                type="button"
                onClick={(e) => handleCancelEdit(e.target.form)}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 style={{ marginTop: '2rem', textAlign: 'center' }}>All Products</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
        {products.map((product) => (
          <div key={product._id} className="glass-card-small">
            {product.image && <img src={product.image} alt={product.name} />}
            <h4>{product.name}</h4>
            <p>Price: ₹{product.price}</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button className="glass-button" onClick={() => handleEditClick(product)}>
                Edit
              </button>
              <button
                className="glass-button red small"
                onClick={() => handleDeleteClick(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
