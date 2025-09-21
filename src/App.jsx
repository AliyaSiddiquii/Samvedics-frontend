import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Products from './pages/products.jsx';
import ProductDetails from './pages/productdetails.jsx';
import Cart from './pages/cart.jsx';
import AdminDashboard from './pages/admindashboard.jsx'; 
import About from './pages/about.jsx'; 
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx'; // ✅ added import
import { AuthContext } from './context/AuthContext.jsx';
import './index.css';

const App = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // ✅ to check current path

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/cart" element={user ? <Cart /> : <Login />} />
          
          {/* ✅ Only admin can access this */}
          <Route 
            path="/admin" 
            element={user && user.role === "admin" ? <AdminDashboard /> : <Login />} 
          />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* ✅ Footer only on Login, Register, About */}
      {(location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/about") && <Footer />}
    </>
  );
};

export default App;
