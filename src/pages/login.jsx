import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth.js';
import { AuthContext } from '../context/AuthContext.jsx';
import '../LoginRegister.css'; // new styles

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      // ✅ save token + role in AuthContext
      login(response.token, response.user.role);

      setMessage('Login successful!');

      // ✅ redirect based on role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setMessage('Login failed: ' + (error.error || 'Please check your credentials.'));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <div className="auth-buttons">
            <button type="submit" className="glass-button">Login</button>
            <Link to="/register">
              <button type="button" className="glass-button">Register</button>
            </Link>
          </div>
        </form>
        {message && <p style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
