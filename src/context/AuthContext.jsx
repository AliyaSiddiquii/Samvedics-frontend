import React, { createContext, useState, useEffect } from 'react';
import { getStoredToken, setStoredToken, removeStoredToken } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const login = (token, role) => {
    setStoredToken(token);
    localStorage.setItem('role', role); // ✅ store role
    setUser({ token, role });
  };

  const logout = () => {
    removeStoredToken();
    localStorage.removeItem('role'); // ✅ clear role
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
