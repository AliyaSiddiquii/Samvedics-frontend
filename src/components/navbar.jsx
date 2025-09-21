import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1rem 2rem', 
            backgroundColor: 'var(--background-color)', 
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
        }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
                <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Samvedics</Link>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flex: 2, justifyContent: 'center' }}>
                <Link to="/" style={{ fontWeight: "600" }}>Home</Link>
                <Link to="/products" style={{ fontWeight: "600" }}>Products</Link>
                <Link to="/about" style={{ fontWeight: "600" }}>About Us</Link>
                {user && user.role === "admin" && (
                    <Link to="/admin" style={{ fontWeight: "600" }}>Admin Dashboard</Link>
                )}
            </div>
            <div style={{ flex: 1, textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
                {user ? (
                    <>
                        <Link to="/cart">
                            <button className="cart-button">Cart</button>
                        </Link>
                        <button onClick={handleLogout} className="glass-button">Logout</button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="glass-button">Login</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
