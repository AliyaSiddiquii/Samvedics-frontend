import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import '../LoginRegister.css'; // new styles

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(response.message);
    } catch (error) {
      setMessage('Registration failed: ' + error.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
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
  <button type="submit" className="glass-button">Register</button>
</div>

        </form>
        {message && <p style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
